import globals from "globals"

/**
 * Node.js specific ESLint config.
 * For CLI apps and build scripts.
 */
export const node = [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs
      }
    },
    rules: {
      "no-process-exit": "off", // Allow process.exit in CLI
      "no-console": "off" // Console is expected in CLI
    }
  }
]

export default node
