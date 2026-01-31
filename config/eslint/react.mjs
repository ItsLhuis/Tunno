import reactPlugin from "eslint-plugin-react"
import reactHooksPlugin from "eslint-plugin-react-hooks"
import globals from "globals"

/**
 * React-specific ESLint config.
 * For desktop (Vite), web (Next.js), and mobile (Expo/React Native) apps.
 */
export const react = [
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      // React rules
      "react/jsx-uses-react": "off", // Not needed with React 17+ JSX transform
      "react/react-in-jsx-scope": "off", // Not needed with React 17+ JSX transform
      "react/prop-types": "off", // TypeScript handles this
      "react/display-name": "off",
      "react/jsx-no-target-blank": "error",
      "react/jsx-no-useless-fragment": "warn",
      "react/jsx-curly-brace-presence": ["warn", { props: "never", children: "never" }],
      "react/self-closing-comp": "warn",
      "react/no-array-index-key": "warn",

      // React Hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn"
    }
  }
]

export default react
