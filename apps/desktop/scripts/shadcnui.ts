import { spawn } from "child_process"

import path from "path"
import { fileURLToPath } from "url"

import fs from "fs"

import chalk from "chalk"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const componentsBase = path.resolve(__dirname, "..", "src", "components", "ui")
const indexFilePath = path.resolve(componentsBase, "index.ts")

const hooksBase = path.resolve(__dirname, "..", "src", "hooks")
const libBase = path.resolve(__dirname, "..", "src", "lib")

async function shadcnui() {
  const componentName = process.argv[2]
  if (!componentName) {
    console.error(chalk.red("Please provide a component name"))
    process.exit(1)
  }

  try {
    console.log(chalk.blue("Starting component creation\n"))
    await createComponent(componentName)

    console.log(chalk.blue("Renaming components"))
    await renameExistingFiles(componentsBase, pascalCaseRenamer)

    console.log(chalk.blue("\nRenaming hooks"))
    if ((await fs.promises.readdir(hooksBase)).length > 0) {
      await renameExistingFiles(hooksBase, camelCaseRenamer)
    } else {
      console.log(chalk.gray("No files found in hooks folder"))
    }

    console.log(chalk.blue("\nRenaming lib"))
    if ((await fs.promises.readdir(libBase)).length > 0) {
      await renameExistingFiles(libBase, camelCaseRenamer)
    } else {
      console.log(chalk.gray("No files found in lib folder"))
    }

    console.log(chalk.blue("\nUpdating imports\n"))
    await updateImports([componentsBase, hooksBase, libBase])

    console.log(chalk.blue("Updating index.ts\n"))
    await updateIndexFile()

    console.log(chalk.blue("Running prettier\n"))
    await runPrettier()

    console.log(chalk.green("\nAll tasks completed successfully"))
  } catch (error) {
    console.error(chalk.red(`\nError: ${error}\n`))
    process.exit(1)
  }
}

async function runCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(command, {
      shell: true,
      stdio: "inherit"
    })

    process.on("error", (error) => {
      reject(`Error executing command: ${error.message}`)
    })

    process.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}

async function createComponent(componentName: string) {
  const command = `npx shadcn@latest add ${componentName}`
  console.log(chalk.yellow(`Executing: ${command}`))
  await runCommand(command)
}

async function renameExistingFiles(basePath: string, renamer: (name: string) => string) {
  const files = await fs.promises.readdir(basePath)

  for (const file of files) {
    const filePath = path.resolve(basePath, file)
    const fileExt = path.extname(file)

    if (fileExt === ".tsx" || (fileExt === ".ts" && file.replace(fileExt, "") !== "index")) {
      const fileNameWithoutExt = file.replace(fileExt, "")
      const newFileName = renamer(fileNameWithoutExt)
      const newFilePath = path.resolve(basePath, `${newFileName}${fileExt}`)

      if (filePath !== newFilePath) {
        console.log(chalk.gray(`Renaming file: ${file} -> ${newFileName}${fileExt}`))

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
  const pascalCase = pascalCaseRenamer(name)
  return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1)
}

async function updateImports(paths: string[]) {
  for (const basePath of paths) {
    const files = await fs.promises.readdir(basePath)

    for (const file of files) {
      const filePath = path.resolve(basePath, file)
      const fileExt = path.extname(file)

      if (fileExt === ".tsx" || fileExt === ".ts") {
        let data = await fs.promises.readFile(filePath, "utf-8")

        const aliasRegex = /import\s+([^'"]+)\s+from\s+['"]@\/([^'"]+)['"]/g
        data = data.replace(aliasRegex, (_, imports, path) => {
          return `import ${imports} from '@${path}'`
        })

        const componentImportRegex =
          /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@components\/ui\/([^'"]+)['"]/g
        data = data.replace(componentImportRegex, (_, importName, componentPath) => {
          const pascalCasePath = pascalCaseRenamer(componentPath)
          return `import { ${importName} } from '@components/ui/${pascalCasePath}'`
        })

        const hooksImportRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"]@hooks\/([^'"]+)['"]/g
        data = data.replace(hooksImportRegex, (_, importName, hooksPath) => {
          const camelCasePath = camelCaseRenamer(hooksPath)
          return `import { ${importName} } from '@hooks/${camelCasePath}'`
        })

        await fs.promises.writeFile(filePath, data, "utf-8")
      }
    }
  }
}

async function updateIndexFile() {
  const files = await fs.promises.readdir(componentsBase)
  const tsxFiles = files.filter((file) => path.extname(file) === ".tsx")
  const folders = files.filter(
    (file) => !path.extname(file) && fs.lstatSync(path.resolve(componentsBase, file)).isDirectory()
  )

  if (tsxFiles.length === 0 && folders.length === 0) {
    console.log(chalk.red("No components or folders found to update index.ts"))
    return
  }

  let exportStatements = ""

  tsxFiles.forEach((file) => {
    const componentName = pascalCaseRenamer(file.replace(path.extname(file), ""))
    exportStatements += `export * from "./${componentName}"\n`
  })

  folders.forEach((folder) => {
    exportStatements += `export * from "./${folder}"\n`
  })

  await fs.promises.writeFile(indexFilePath, exportStatements, "utf-8")
}

async function runPrettier() {
  const command = `npx prettier --write "src/components/ui" "src/lib" "src/hooks"`
  console.log(chalk.yellow(`Executing: ${command}`))
  await runCommand(command)
}

shadcnui()
