import { drizzle } from "drizzle-orm/sqlite-proxy"
import Database from "@tauri-apps/plugin-sql"

import * as schema from "./schema"

export { schema }

export const getSQLiteDatabase = async () => await Database.load("sqlite:database.db")

export const database = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getSQLiteDatabase()

    let rows: any = []
    let results = []

    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch((e) => {
        console.error("SQL Error:", e)
        return []
      })
    } else {
      rows = await sqlite.execute(sql, params).catch((e) => {
        console.error("SQL Error:", e)
        return []
      })
      return { rows: [] }
    }

    rows = rows.map((row: any) => {
      return Object.values(row)
    })

    results = method === "all" ? rows : rows[0]

    return { rows: results }
  },
  { schema: schema, logger: true }
)

function isSelectQuery(sql: string): boolean {
  return sql.trim().toLowerCase().startsWith("select")
}
