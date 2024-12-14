import fs from "fs"
import path from "path"
import os from "os"

import chalk from "chalk"

import inquirer from "inquirer"

const appName = "Wave"
const defaultDownloadPath = path.join(os.homedir(), "Downloads")

const getConfigPath = (): string => {
  const baseConfigPath =
    process.platform === "win32"
      ? path.join(process.env.APPDATA || "", appName)
      : path.join(os.homedir(), ".config", appName)

  if (!fs.existsSync(baseConfigPath)) {
    fs.mkdirSync(baseConfigPath, { recursive: true })
  }

  return path.join(baseConfigPath, "config.json")
}

const configPath = getConfigPath()

interface Config {
  downloadPath?: string
}

const normalizePath = (filePath: string): string => {
  return path.normalize(filePath).endsWith(path.sep)
    ? path.normalize(filePath)
    : path.normalize(filePath) + path.sep
}

const validateDownloadPath = async (downloadPath: string, currentPath: string): Promise<string> => {
  let resolvedPath = path.isAbsolute(downloadPath)
    ? normalizePath(downloadPath)
    : normalizePath(path.join(os.homedir(), downloadPath))

  if (process.platform === "win32") {
    if (!/^[A-Za-z]:\\/.test(resolvedPath)) {
      resolvedPath = path.join("C:\\", resolvedPath)
    }
  }

  const invalidChars = /[<>:"|?*]/
  if (invalidChars.test(path.basename(resolvedPath))) {
    return defaultDownloadPath
  }

  if (!fs.existsSync(resolvedPath)) {
    console.log("")
    const { createDir } = await inquirer.prompt([
      {
        type: "confirm",
        name: "createDir",
        message: chalk.yellow(
          `The directory "${chalk.bold(resolvedPath)}" does not exist. Do you want to create it?`
        ),
        default: true
      }
    ])

    if (createDir) {
      try {
        fs.mkdirSync(resolvedPath, { recursive: true })
      } catch (error) {
        return currentPath
      }
    } else {
      return currentPath
    }
  }

  return resolvedPath.endsWith(path.sep) ? resolvedPath : resolvedPath + path.sep
}

const ensureConfigFileExists = async (): Promise<void> => {
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = { downloadPath: defaultDownloadPath }

    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
  } else {
    try {
      let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

      config.downloadPath = await validateDownloadPath(
        config.downloadPath || defaultDownloadPath,
        config.downloadPath || defaultDownloadPath
      )

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
    } catch (error) {
      const defaultConfig: Config = { downloadPath: defaultDownloadPath }

      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
    }
  }
}

export const setDownloadPath = async (downloadPath: string): Promise<string> => {
  await ensureConfigFileExists()

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  const resolvedPath = await validateDownloadPath(
    downloadPath,
    config.downloadPath || defaultDownloadPath
  )
  config.downloadPath = resolvedPath

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

  return resolvedPath
}

export const getDownloadPath = async (): Promise<string> => {
  await ensureConfigFileExists()

  const config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  return config.downloadPath || defaultDownloadPath
}
