import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

import path from "path"

const root = path.resolve(__dirname, "src/")
const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 4535,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 4536
        }
      : undefined,
    watch: {
      ignored: ["**/src-tauri/**"]
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: "index.html"
      }
    }
  },
  resolve: {
    alias: {
      "@": root,
      "@assets": path.resolve(root, "assets/"),
      "@components": path.resolve(root, "components/"),
      "@contexts": path.resolve(root, "contexts/"),
      "@hooks": path.resolve(root, "hooks/"),
      "@lib": path.resolve(root, "lib/"),
      "@main": path.resolve(root, "main/"),
      "@overlay": path.resolve(root, "overlay/"),
      "@tauri": path.resolve(root, "tauri/")
    }
  }
}))
