import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  schema: "./src/database/schema.ts",
  strict: true,
  out: "./src-tauri/migrations"
})
