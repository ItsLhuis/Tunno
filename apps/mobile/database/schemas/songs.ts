import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

export const songs = sqliteTable("songs", {
  id: integer("id").primaryKey().unique(),
  name: text("name").notNull()
})
