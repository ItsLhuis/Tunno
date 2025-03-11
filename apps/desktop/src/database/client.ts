import { drizzle } from "drizzle-orm/sqlite-proxy"
import Database from "@tauri-apps/plugin-sql"

import * as schema from "./schema"
export { schema }

import { type InferQueryModel } from "./helpers"
export { InferQueryModel }

export const databaseName = "database.db"

export const getSQLiteDatabase = async () => await Database.load(`sqlite:${databaseName}`)

export const database = drizzle<typeof schema>(
  async (sql, params, method) => {
    const sqlite = await getSQLiteDatabase()

    let rows: any = []
    let results = []

    if (isSelectQuery(sql)) {
      rows = await sqlite.select(sql, params).catch(() => [])
    } else {
      rows = await sqlite.execute(sql, params).catch(() => [])
      return { rows: [] }
    }

    rows = rows.map((row: any) => Object.values(row))

    results = method === "all" ? rows : rows[0]

    return { rows: results }
  },
  { schema: schema }
)

function isSelectQuery(sql: string): boolean {
  return sql.trim().toLowerCase().startsWith("select")
}
