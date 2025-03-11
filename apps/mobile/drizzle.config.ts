import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "./database/schema.ts",
  out: "./migrations",
  verbose: true,
  strict: true
})
