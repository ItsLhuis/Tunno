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
        main: "index.html"
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
      "@i18n": path.resolve(root, "i18n/"),
      "@lib": path.resolve(root, "lib/"),
      "@stores": path.resolve(root, "stores/"),
      "@utils": path.resolve(root, "utils/")
    }
  }
}))
