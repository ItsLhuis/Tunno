import fs from "fs"
import path from "path"

import { fileURLToPath } from "url"

import chalk from "chalk"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

type VersionType = "patch" | "minor" | "major"

type AppType = "desktop" | "cli" | "mobile" | "web"

function incrementVersion(version: string, type: VersionType): string {
  const [major, minor, patch] = version.split(".").map(Number)

  switch (type) {
    case "major":
      return `${major + 1}.0.0`
    case "minor":
      return `${major}.${minor + 1}.0`
    case "patch":
      return `${major}.${minor}.${patch + 1}`
  }
}

function detectApp(): AppType | null {
  const projectRoot = path.resolve(__dirname, "..")
  const currentDir = process.cwd()
  const appsDir = path.join(projectRoot, "apps")

  if (!currentDir.startsWith(appsDir)) return null

  const relativePath = path.relative(appsDir, currentDir)
  const appName = relativePath.split(path.sep)[0] as AppType

  return ["desktop", "cli", "mobile", "web"].includes(appName) ? appName : null
}

function updateFile(filePath: string, updater: (content: Record<string, unknown>) => void): void {
  const content = JSON.parse(fs.readFileSync(filePath, "utf-8")) as Record<string, unknown>

  updater(content)

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + "\n")
}

function updateCargoToml(filePath: string, newVersion: string): void {
  let content = fs.readFileSync(filePath, "utf-8")
  content = content.replace(/^version\s*=\s*"[^"]+"/m, `version = "${newVersion}"`)
  fs.writeFileSync(filePath, content)
}

async function bumpVersion() {
  const versionType = process.argv[2] as VersionType

  if (!versionType || !["patch", "minor", "major"].includes(versionType)) {
    console.error(chalk.red("Usage: tsx scripts/bump-version.ts <patch|minor|major>"))
    process.exit(1)
  }

  const app = detectApp()

  if (!app) {
    console.error(chalk.red("Error: Script must be run from within an app directory"))
    process.exit(1)
  }

  const projectRoot = path.resolve(__dirname, "..")
  const appDir = path.join(projectRoot, "apps", app)

  try {
    const packageJsonPath = path.join(appDir, "package.json")
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"))

    const currentVersion = packageJson.version
    const newVersion = incrementVersion(currentVersion, versionType)

    console.log(chalk.blue(`Bumping version: ${currentVersion} → ${newVersion} (${versionType})\n`))

    updateFile(packageJsonPath, (content) => {
      content.version = newVersion
    })
    console.log(chalk.gray(`Updated package.json`))

    if (app === "desktop") {
      updateCargoToml(path.join(appDir, "src-tauri", "Cargo.toml"), newVersion)
      console.log(chalk.gray(`Updated Cargo.toml`))

      updateFile(path.join(appDir, "src-tauri", "tauri.conf.json"), (content) => {
        content.version = newVersion
      })
      console.log(chalk.gray(`Updated tauri.conf.json`))
    } else if (app === "mobile") {
      const appJsonPath = path.join(appDir, "app.json")

      if (fs.existsSync(appJsonPath)) {
        updateFile(appJsonPath, (content) => {
          const expo = content.expo as Record<string, unknown> | undefined
          if (expo) {
            expo.version = newVersion
          } else {
            content.version = newVersion
          }
        })
        console.log(chalk.gray(`Updated app.json`))
      }
    }

    console.log(chalk.green(`\nVersion bumped successfully to ${newVersion}`))
  } catch (error) {
    console.error(chalk.red(`\nError: ${error instanceof Error ? error.message : error}`))
    process.exit(1)
  }
}

bumpVersion()
