import fs from "fs"
import path from "path"
import os from "os"

const configPath: string = path.join(process.cwd(), "config/default.json")
const defaultDownloadPath: string = path.join(os.homedir(), "Downloads")

interface Config {
  downloadPath?: string
}

const validateDownloadPath = (downloadPath: string): string => {
  downloadPath = downloadPath.replace(/^\/+|\/+$/g, "").replace(/\\+/g, "/")

  const invalidChars = /[<>:"|?*\\]/
  if (invalidChars.test(downloadPath)) {
    return defaultDownloadPath
  }

  const isAbsolutePath = path.isAbsolute(downloadPath)
  const resolvedPath = isAbsolutePath ? downloadPath : path.join(os.homedir(), downloadPath)
  return resolvedPath.endsWith(path.sep) ? resolvedPath : resolvedPath + path.sep
}

const ensureConfigFileExists = (): void => {
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = { downloadPath: defaultDownloadPath }
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
  } else {
    try {
      let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

      if (!config.downloadPath) {
        config.downloadPath = defaultDownloadPath
      } else {
        config.downloadPath = validateDownloadPath(config.downloadPath)
      }

      fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
    } catch (error) {
      if (error instanceof SyntaxError) {
        const defaultConfig: Config = { downloadPath: defaultDownloadPath }
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
      } else {
        throw error
      }
    }
  }
}

export const setDownloadPath = (downloadPath: string): string => {
  ensureConfigFileExists()

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  const resolvedPath = validateDownloadPath(downloadPath)
  config.downloadPath = resolvedPath

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

  return resolvedPath
}

export const getDownloadPath = (): string => {
  ensureConfigFileExists()

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  const downloadPath = config.downloadPath || defaultDownloadPath

  return downloadPath.endsWith(path.sep) ? downloadPath : downloadPath + path.sep
}
