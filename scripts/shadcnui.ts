import { spawn } from "child_process"

import fs from "fs"
import path from "path"

import chalk from "chalk"

async function shadcnui() {
  const basePathArg = process.argv[2]
  const componentName = process.argv[3]

  if (!basePathArg || !componentName) {
    console.error(chalk.red("Usage: tsx ./scripts/shadcnui.ts <basePath> <componentName>"))
    process.exit(1)
  }

  const basePath = path.resolve(process.cwd(), basePathArg)

  const componentsBase = path.resolve(basePath, "components", "ui")
  const hooksBase = path.resolve(basePath, "hooks")
  const libBase = path.resolve(basePath, "lib")
  const indexFilePath = path.resolve(componentsBase, "index.ts")

  try {
    console.log(chalk.blue("Starting component creation\n"))
    await createComponent(componentName)

    console.log(chalk.blue("Renaming components"))
    await renameExistingFiles(componentsBase, pascalCaseRenamer)

    console.log(chalk.blue("\nRenaming hooks"))
    if (await directoryExistsAndHasFiles(hooksBase)) {
      await renameExistingFiles(hooksBase, camelCaseRenamer)
    } else {
      console.log(chalk.gray("Hooks folder doesn't exist or is empty, skipping"))
    }

    console.log(chalk.blue("\nRenaming lib"))
    if (await directoryExistsAndHasFiles(libBase)) {
      await renameExistingFiles(libBase, camelCaseRenamer)
    } else {
      console.log(chalk.gray("Lib folder doesn't exist or is empty, skipping"))
    }

    console.log(chalk.blue("\nUpdating imports\n"))
    await updateImports([componentsBase, hooksBase, libBase])

    console.log(chalk.blue("Updating index.ts\n"))
    await updateIndexFile(componentsBase, indexFilePath)

    console.log(chalk.blue("Running prettier\n"))
    await runPrettier(basePath)

    console.log(chalk.green("\nAll tasks completed successfully"))
  } catch (error) {
    console.error(chalk.red(`\nError: ${error}\n`))
    process.exit(1)
  }
}

async function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, { shell: true, stdio: "inherit" })

    process.on("error", (error) => {
      reject(`Error executing command: ${error.message}`)
    })

    process.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Process exited with code ${code}`))
    })
  })
}

async function createComponent(componentName: string) {
  const command = `npx shadcn@latest add ${componentName}`
  console.log(chalk.yellow(`Executing: ${command}`))
  await runCommand(command)
}

async function directoryExistsAndHasFiles(dirPath: string): Promise<boolean> {
  try {
    await fs.promises.access(dirPath)
    const files = await fs.promises.readdir(dirPath)
    return files.length > 0
  } catch {
    return false
  }
}

async function renameExistingFiles(basePath: string, renamer: (name: string) => string) {
  const files = await fs.promises.readdir(basePath)

  for (const file of files) {
    const filePath = path.resolve(basePath, file)
    const fileExt = path.extname(file)

    if (fileExt === ".tsx" || (fileExt === ".ts" && file !== "index.ts")) {
      const baseName = path.basename(file, fileExt)
      const newFileName = renamer(baseName) + fileExt
      const newFilePath = path.resolve(basePath, newFileName)

      if (filePath !== newFilePath) {
        console.log(chalk.gray(`Renaming file: ${file} -> ${newFileName}`))
        const content = await fs.promises.readFile(filePath, "utf-8")
        await fs.promises.unlink(filePath)
        await fs.promises.writeFile(newFilePath, content, "utf-8")
      }
    }
  }
}

function pascalCaseRenamer(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

function camelCaseRenamer(name: string) {
  const pascal = pascalCaseRenamer(name)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

async function updateImports(paths: string[]) {
  for (const basePath of paths) {
    if (!fs.existsSync(basePath)) continue

    const files = await fs.promises.readdir(basePath)

    for (const file of files) {
      const filePath = path.resolve(basePath, file)
      const fileExt = path.extname(file)

      if (fileExt === ".tsx" || fileExt === ".ts") {
        let data = await fs.promises.readFile(filePath, "utf-8")

        const aliasRegex = /import\s+([^'"]+)\s+from\s+['"]@\/([^'"]+)['"]/g
        data = data.replace(aliasRegex, (_, imports, aliasPath) => {
          return `import ${imports} from '@${aliasPath}'`
        })

        const componentImportRegex =
          /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@components\/ui\/([^'"]+)['"]/g
        data = data.replace(componentImportRegex, (_, importName, componentPath) => {
          return `import { ${importName} } from '@components/ui/${pascalCaseRenamer(componentPath)}'`
        })

        const hooksImportRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@hooks\/([^'"]+)['"]/g
        data = data.replace(hooksImportRegex, (_, importName, hookPath) => {
          return `import { ${importName} } from '@hooks/${camelCaseRenamer(hookPath)}'`
        })

        await fs.promises.writeFile(filePath, data, "utf-8")
      }
    }
  }
}

async function updateIndexFile(componentsBase: string, indexFilePath: string) {
  const files = await fs.promises.readdir(componentsBase)

  const tsxFiles = files.filter((f) => path.extname(f) === ".tsx")
  const folders = files.filter((f) => {
    const full = path.resolve(componentsBase, f)
    return fs.existsSync(full) && fs.lstatSync(full).isDirectory()
  })

  if (tsxFiles.length === 0 && folders.length === 0) {
    console.log(chalk.red("No components or folders found to update index.ts"))
    return
  }

  let exportStatements = ""

  tsxFiles.forEach((file) => {
    const name = pascalCaseRenamer(file.replace(path.extname(file), ""))
    exportStatements += `export * from "./${name}"\n`
  })

  folders.forEach((folder) => {
    exportStatements += `export * from "./${folder}"\n`
  })

  await fs.promises.writeFile(indexFilePath, exportStatements, "utf-8")
}

async function runPrettier(basePath: string) {
  try {
    const dirsToFormat: string[] = []

    const componentsPath = path.resolve(basePath, "components", "ui")
    const hooksPath = path.resolve(basePath, "hooks")
    const libPath = path.resolve(basePath, "lib")

    if (await directoryExistsAndHasFiles(componentsPath)) {
      dirsToFormat.push(componentsPath)
    }

    if (await directoryExistsAndHasFiles(libPath)) {
      dirsToFormat.push(libPath)
    }

    if (await directoryExistsAndHasFiles(hooksPath)) {
      dirsToFormat.push(hooksPath)
    }

    if (dirsToFormat.length === 0) {
      console.log(chalk.yellow("No directories to format"))
      return
    }

    const command = `npx prettier --write ${dirsToFormat.map((d) => `"${d}"`).join(" ")}`
    console.log(chalk.yellow(`Executing: ${command}`))
    await runCommand(command)
  } catch (error) {
    console.error(chalk.yellow(`Error running prettier: ${error}`))
  }
}

shadcnui()
