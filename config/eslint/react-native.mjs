import reactNativePlugin from "eslint-plugin-react-native"
import globals from "globals"

/**
 * React Native specific ESLint config.
 * For mobile (Expo/React Native) apps only.
 */
export const reactNative = [
  {
    plugins: {
      "react-native": reactNativePlugin
    },
    languageOptions: {
      globals: {
        ...globals.node,
        __DEV__: "readonly",
        fetch: "readonly",
        FormData: "readonly",
        Headers: "readonly",
        Request: "readonly",
        Response: "readonly",
        AbortController: "readonly",
        Blob: "readonly",
        File: "readonly",
        FileReader: "readonly",
        URL: "readonly",
        URLSearchParams: "readonly",
        WebSocket: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        setInterval: "readonly",
        clearInterval: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
        queueMicrotask: "readonly",
        alert: "readonly",
        console: "readonly"
      }
    },
    rules: {
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "off", // Allow inline styles
      "react-native/no-color-literals": "off", // Allow color literals
      "react-native/no-raw-text": "off", // Allow raw text (too strict for most cases)
      "react-native/split-platform-components": "off" // Platform-specific imports are fine
    }
  }
]

export default reactNative
