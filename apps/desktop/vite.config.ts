import { tanstackRouter } from "@tanstack/router-plugin/vite"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

import path from "path"

const root = path.resolve(__dirname, "src")
const host = process.env.TAURI_DEV_HOST

export default defineConfig(async () => ({
  plugins: [tanstackRouter(), react()],
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
        miniPlayer: "miniPlayer.html"
      }
    }
  },
  resolve: {
    alias: {
      "@": root,
      "@api": path.resolve(root, "api/"),
      "@app": path.resolve(root, "app/"),
      "@assets": path.resolve(root, "assets/"),
      "@components": path.resolve(root, "components/"),
      "@contexts": path.resolve(root, "contexts/"),
      "@data": path.resolve(root, "data/"),
      "@database": path.resolve(root, "database/"),
      "@features": path.resolve(root, "features/"),
      "@hooks": path.resolve(root, "hooks/"),
      "@lib": path.resolve(root, "lib/"),
      "@routes": path.resolve(root, "routes/"),
      "@services": path.resolve(root, "services/"),
      "@stores": path.resolve(root, "stores/"),
      "@utils": path.resolve(root, "utils/")
    }
  }
}))
