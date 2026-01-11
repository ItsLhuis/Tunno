import fs from "fs"
import os from "os"
import path from "path"

import chalk from "chalk"

import inquirer from "inquirer"

const appName = "Tunno"
const defaultDownloadPath = path.join(os.homedir(), "Downloads")

/**
 * Determines and returns the absolute path to the application's configuration file.
 * It ensures the base configuration directory exists.
 *
 * @returns The absolute path to the `.config.json` file.
 */
const getConfigPath = (): string => {
  const baseConfigPath =
    process.platform === "win32"
      ? path.join(process.env.APPDATA || "", appName)
      : path.join(os.homedir(), ".config", appName)

  if (!fs.existsSync(baseConfigPath)) {
    fs.mkdirSync(baseConfigPath, { recursive: true })
  }

  return path.join(baseConfigPath, ".config.json")
}

const configPath = getConfigPath()

type Config = {
  downloadPath?: string
  env: {
    SPOTIFY_CLIENT_ID?: string
    SPOTIFY_CLIENT_SECRET?: string
  }
}

/**
 * Normalizes a given file path to use consistent directory separators
 * and ensures it ends with a path separator.
 *
 * @param filePath - The path to normalize.
 * @returns The normalized path.
 */
const normalizePath = (filePath: string): string => {
  return path.normalize(filePath).endsWith(path.sep)
    ? path.normalize(filePath)
    : path.normalize(filePath) + path.sep
}

/**
 * Validates a given download path, resolves it to an absolute path,
 * handles Windows-specific path resolution, checks for invalid characters,
 * and prompts the user to create the directory if it doesn't exist.
 * If validation fails or the user declines to create a directory,
 * it falls back to the default download path.
 *
 * @param downloadPath - The path provided by the user or from config.
 * @returns A validated and resolved absolute download path.
 */
const validateDownloadPath = async (downloadPath: string): Promise<string> => {
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
    const { createDir } = await inquirer.prompt([
      {
        type: "confirm",
        name: "createDir",
        message: `The directory ${chalk.blue(
          chalk.bold(resolvedPath)
        )} does not exist. ${chalk.yellow("Do you want to create it?")}`,
        default: true
      }
    ])

    console.log("")

    if (createDir) {
      try {
        fs.mkdirSync(resolvedPath, { recursive: true })
      } catch (error) {
        return defaultDownloadPath
      }
    } else {
      return defaultDownloadPath
    }
  }

  return resolvedPath.endsWith(path.sep) ? resolvedPath : resolvedPath + path.sep
}

/**
 * Ensures that the `.config.json` file exists at the determined configuration path.
 * If the file does not exist, it creates it with default values.
 * If it exists, it attempts to parse it and optionally validates the `downloadPath`.
 * In case of parsing errors or invalid paths, it recreates the config file with defaults.
 *
 * @param validatePath - If true, validates and potentially updates the `downloadPath` in the config.
 */
const ensureConfigFileExists = async (validatePath = true): Promise<void> => {
  if (!fs.existsSync(configPath)) {
    const defaultConfig: Config = { downloadPath: defaultDownloadPath, env: {} }

    fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
  } else {
    try {
      let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

      if (validatePath) {
        config.downloadPath = await validateDownloadPath(config.downloadPath || defaultDownloadPath)

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
      }
    } catch (error) {
      const defaultConfig: Config = { downloadPath: defaultDownloadPath, env: {} }

      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8")
    }
  }
}

/**
 * Sets the application's download path in the configuration file.
 * The path is validated before being saved.
 *
 * @param downloadPath - The new download path to set.
 * @returns The resolved and validated download path that was set.
 */
export const setDownloadPath = async (downloadPath: string): Promise<string> => {
  await ensureConfigFileExists(false)

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  const resolvedPath = await validateDownloadPath(downloadPath)
  config.downloadPath = resolvedPath

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")

  return resolvedPath
}

/**
 * Retrieves the currently configured download path from the application's config file.
 * Ensures the config file exists before attempting to read.
 *
 * @returns The configured download path, or the default download path if not set.
 */
export const getDownloadPath = async (): Promise<string> => {
  await ensureConfigFileExists()

  const config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  return config.downloadPath || defaultDownloadPath
}

type EnvKey = keyof Config["env"]

/**
 * Sets a specific environment variable key-value pair in the configuration file.
 * Ensures the config file exists before writing.
 *
 * @param key - The key of the environment variable to set (e.g., "SPOTIFY_CLIENT_ID").
 * @param value - The value to associate with the key.
 */
export const setEnvKey = async (key: EnvKey, value: string): Promise<void> => {
  await ensureConfigFileExists()

  let config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  if (!config.env) {
    config.env = {}
  }

  config.env[key] = value

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8")
}

/**
 * Retrieves the value of a specific environment variable key from the configuration file.
 * Ensures the config file exists before reading.
 *
 * @param key - The key of the environment variable to retrieve.
 * @returns The value of the environment variable, or `undefined` if not found.
 */
export const getEnvKey = async (key: EnvKey): Promise<string | undefined> => {
  await ensureConfigFileExists()

  const config: Config = JSON.parse(fs.readFileSync(configPath, "utf-8"))

  return config.env?.[key]
}
