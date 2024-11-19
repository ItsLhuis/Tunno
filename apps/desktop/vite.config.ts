import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

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
        tray: "tray.html"
      }
    }
  }
}))
