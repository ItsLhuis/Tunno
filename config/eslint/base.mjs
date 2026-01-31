import tseslint from "typescript-eslint"
import eslintConfigPrettier from "eslint-config-prettier"

/**
 * Base ESLint config for all TypeScript packages.
 * Extends typescript-eslint with sensible defaults.
 */
export const base = tseslint.config(...tseslint.configs.recommended, eslintConfigPrettier, {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    parserOptions: {
      ecmaVersion: 2020
    }
  },
  rules: {
    // TypeScript handles these via strict mode
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_"
      }
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-require-imports": "off",

    // Best practices
    "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    "no-debugger": "warn",
    "no-duplicate-imports": "error",
    eqeqeq: ["error", "always", { null: "ignore" }],
    "no-var": "error",
    "prefer-const": "error",
    "prefer-template": "warn",
    "object-shorthand": "warn"
  }
})

export default base
