import tseslint from "typescript-eslint"
import { base, react, reactNative, node, next } from "./config/eslint/index.mjs"

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      // Dependencies
      "**/node_modules/**",

      // Build outputs
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/web-build/**",

      // Turbo cache
      "**/.turbo/**",

      // Tauri build
      "**/target/**",
      "**/src-tauri/target/**",

      // Expo cache
      "**/.expo/**",
      "**/expo-env.d.ts",

      // Generated files
      "**/*.generated.*",
      "**/drizzle/**",
      "**/migrations/**",

      // Config files that don't need linting
      "**/*.config.js",
      "**/*.config.cjs",
      "**/tailwind.config.*",
      "**/postcss.config.*",
      "**/metro.config.*",
      "**/babel.config.*",
      "**/commitlint.config.*",

      // Patches
      "**/patches/**"
    ]
  },

  // Base TypeScript config for all files
  ...base,

  // Packages (shared libraries) - TypeScript only
  {
    files: ["packages/**/*.ts", "packages/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },

  // Desktop app (Tauri + React + Vite)
  {
    files: ["apps/desktop/**/*.ts", "apps/desktop/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ...react.map((config) => ({
    ...config,
    files: ["apps/desktop/**/*.tsx", "apps/desktop/**/*.ts"]
  })),

  // Mobile app (Expo + React Native)
  {
    files: ["apps/mobile/**/*.ts", "apps/mobile/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ...react.map((config) => ({
    ...config,
    files: ["apps/mobile/**/*.tsx", "apps/mobile/**/*.ts"]
  })),
  ...reactNative.map((config) => ({
    ...config,
    files: ["apps/mobile/**/*.tsx", "apps/mobile/**/*.ts"]
  })),

  // Web app (Next.js)
  {
    files: ["apps/web/**/*.ts", "apps/web/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ...react.map((config) => ({
    ...config,
    files: ["apps/web/**/*.tsx", "apps/web/**/*.ts"]
  })),
  ...next.map((config) => ({
    ...config,
    files: ["apps/web/**/*.tsx", "apps/web/**/*.ts"]
  })),

  // CLI app (Node.js)
  {
    files: ["apps/cli/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  ...node.map((config) => ({
    ...config,
    files: ["apps/cli/**/*.ts"]
  })),

  // Config files (use Node environment)
  ...node.map((config) => ({
    ...config,
    files: ["**/*.config.mjs", "**/config/**/*.mjs"]
  }))
)
