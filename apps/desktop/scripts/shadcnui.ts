import { spawn } from "child_process"
import { rename } from "fs/promises"
import { dirname, resolve, extname } from "path"
import { fileURLToPath } from "url"
import fs from "fs"

import chalk from "chalk"

const __dirname = dirname(fileURLToPath(import.meta.url))
const base = resolve(__dirname, "..", "src", "components", "ui")

const indexFilePath = resolve(base, "index.ts")

let interrupted = false

process.on("SIGINT", () => {
  interrupted = true
  console.log(chalk.red("\nOperation interrupted by user. Exiting...\n"))
  process.exit(1)
})

async function main() {
  const componentName = process.argv[2]
  if (!componentName) {
    console.error(chalk.red("Please provide a component name."))
    process.exit(1)
  }

  try {
    console.log(chalk.blue("Starting component creation\n"))
    await createComponent(componentName)
    if (interrupted) return

    console.log(chalk.blue("Renaming existing files\n"))
    await renameExistingFiles()
    if (interrupted) return

    console.log(chalk.blue("Updating imports\n"))
    await updateImports()
    if (interrupted) return

    console.log(chalk.blue("Updating index.ts\n"))
    await updateIndexFile()
    if (interrupted) return

    console.log(chalk.blue("Running prettier"))
    await runPrettier()
    if (interrupted) return

    console.log(chalk.green("\nAll tasks completed successfully!\n"))
  } catch (error) {
    console.error(chalk.red(`\nError: ${error}\n`))
    process.exit(1)
  }
}

async function createComponent(componentName: string) {
  const command = `npx shadcn@latest add ${componentName}`
  console.log(chalk.yellow(`Executing: ${command}`))
  await runCommand(command)
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
      if (interrupted) {
        reject(new Error("Operation interrupted by user."))
        return
      }
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`Process exited with code ${code}`))
      }
    })
  })
}

async function renameExistingFiles() {
  const files = await fs.promises.readdir(base)

  for (const file of files) {
    const filePath = resolve(base, file)
    const fileExt = extname(file)

    if (fileExt === ".tsx") {
      const newFileName = renamer(file.replace(fileExt, ""))
      const newFilePath = resolve(base, `${newFileName}${fileExt}`)
      if (filePath !== newFilePath) {
        console.log(chalk.blue(`Renaming file: ${file} -> ${newFileName}${fileExt}\n`))
        await rename(filePath, newFilePath)
      }
    }
  }
}

function renamer(name: string) {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

async function updateImports() {
  const files = await fs.promises.readdir(base)

  for (const file of files) {
    const filePath = resolve(base, file)
    const fileExt = extname(file)

    if (fileExt === ".tsx") {
      let data = await fs.promises.readFile(filePath, "utf-8")

      const componentImportRegex =
        /import\s+\{\s*(\w+)\s*\}\s+from\s+['"](@\/components\/ui\/)([^'"]+)['"]/g
      const generalImportRegex = /import\s+\{\s*(\w+)\s*\}\s+from\s+['"](@\/)([^'"]+)['"]/g

      data = data.replace(componentImportRegex, (_, importName, basePath, componentPath) => {
        const pascalCasePath = renamer(componentPath)
        return `import { ${importName} } from '${basePath}${pascalCasePath}'`
      })

      data = data.replace(generalImportRegex, (_, importName, __, componentPath) => {
        const newPath = `@${componentPath}`
        return `import { ${importName} } from '${newPath}'`
      })

      await fs.promises.writeFile(filePath, data, "utf-8")
    }
  }
}

async function updateIndexFile() {
  const files = await fs.promises.readdir(base)
  const tsxFiles = files.filter((file) => extname(file) === ".tsx")

  if (tsxFiles.length === 0) {
    console.log(chalk.magenta("No components found to update index.ts"))
    return
  }

  let exportStatements = tsxFiles
    .map((file) => {
      const componentName = renamer(file.replace(extname(file), ""))
      return `export * from "./${componentName}"`
    })
    .join("\n")

  await fs.promises.writeFile(indexFilePath, exportStatements, "utf-8")
}

async function runPrettier() {
  const command = `npx prettier --write ${base}/**/*.tsx`
  console.log(chalk.yellow(`Executing: ${command}`))
  await runCommand(command)
}

main()
