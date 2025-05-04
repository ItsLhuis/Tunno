const { getDefaultConfig } = require("expo/metro-config")
const { FileStore } = require("metro-cache")
const path = require("path")

const projectRoot = __dirname
const monorepoRoot = path.resolve(projectRoot, "../..")

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot)

config.resolver.sourceExts.push("sql")

config.watchFolders = [monorepoRoot]

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules")
]

config.resolver.disableHierarchicalLookup = true

config.cacheStores = [
  new FileStore({ root: path.join(__dirname, "node_modules", ".cache", "metro") })
]

module.exports = config
