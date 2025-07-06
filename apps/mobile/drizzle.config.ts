import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "sqlite",
  driver: "expo",
  schema: "../../packages/database/src/schema.ts",
  out: "./migrations",
  verbose: true,
  strict: true
})
