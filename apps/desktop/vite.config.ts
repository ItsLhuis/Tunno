import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import path from "path"

const root = path.resolve(__dirname, "src")
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
        main: "index.html",
        overlay: "overlay.html"
      }
    }
  },
  resolve: {
    alias: {
      "@": root,
      "@app": path.resolve(root, "app/"),
      "@assets": path.resolve(root, "assets/"),
      "@components": path.resolve(root, "components/"),
      "@contexts": path.resolve(root, "contexts/"),
      "@database": path.resolve(root, "database/"),
      "@hooks": path.resolve(root, "hooks/"),
      "@lib": path.resolve(root, "lib/"),
      "@tauri": path.resolve(root, "tauri/"),
      "@utils": path.resolve(root, "utils/")
    }
  }
}))
