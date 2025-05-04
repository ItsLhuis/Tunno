import { defineConfig } from "drizzle-kit"

import fs from "fs"
import path from "path"

const tauriConfigPath = path.resolve(__dirname, ".", "src-tauri", "tauri.conf.json")

const defaultBundleId = "com.itslhuis.wave"

function getBundleId() {
  try {
    const config = JSON.parse(fs.readFileSync(tauriConfigPath, "utf8"))
    return config.identifier || defaultBundleId
  } catch (error) {
    return defaultBundleId
  }
}

const bundleId = getBundleId()

const databasePath =
  process.platform === "win32"
    ? path.join(process.env.APPDATA || "", bundleId)
    : process.platform === "darwin"
      ? path.join(process.env.HOME || "", "Library/Application Support", bundleId)
      : path.join(
          process.env.XDG_CONFIG_HOME || path.join(process.env.HOME || "", ".config"),
          bundleId
        )

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/database/schema.ts",
  out: "./src-tauri/migrations",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: `file:///${path.resolve(path.join(databasePath, "database.db"))}`
  }
})
