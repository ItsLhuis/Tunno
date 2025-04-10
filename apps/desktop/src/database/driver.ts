import Database from "@tauri-apps/plugin-sql"

import { drizzle as drizzleProxy, type AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy"
import { type DrizzleConfig } from "drizzle-orm/utils"

type QueryContext = {
  lastQuery: string
  lastParams: unknown[]
  lastMethod: string
  isReturningQuery: boolean
  returningColumns: string
  tableName: string | null
}

const queryContext: QueryContext = {
  lastQuery: "",
  lastParams: [],
  lastMethod: "",
  isReturningQuery: false,
  returningColumns: "",
  tableName: null
}

function extractTableName(sql: string): string | null {
  const matches = sql.match(/(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+([^\s(]+)/i)
  return matches ? matches[1].replace(/["`]/g, "") : null
}

function isReturningQuery(sql: string): boolean {
  return sql.toUpperCase().includes("RETURNING")
}

function extractReturningColumns(sql: string): string {
  const matches = sql.match(/RETURNING\s+(.*?)(?:;|\s*$)/i)
  return matches ? matches[1] : "*"
}

function isSelectQuery(sql: string): boolean {
  const selectRegex = /^\s*SELECT\b/i
  return selectRegex.test(sql)
}

export const getSQLiteDatabase = async (name: string): Promise<Database> =>
  await Database.load(`sqlite:${name}`)

function processResults(results: any[]): any[] {
  if (!results || results.length === 0) return []

  return results.map((row) => {
    if (Array.isArray(row)) return row

    if (typeof row === "object" && row !== null) {
      return row
    }

    return [row]
  })
}

export function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(
  databaseName: string,
  config?: DrizzleConfig<TSchema>
) {
  const queryCallback: AsyncRemoteCallback = async (sql, params, method) => {
    try {
      const sqlite = await getSQLiteDatabase(databaseName)

      let rows: any[] = []
      let results = []

      queryContext.lastQuery = sql
      queryContext.lastParams = params
      queryContext.lastMethod = method
      queryContext.isReturningQuery = isReturningQuery(sql)

      if (queryContext.isReturningQuery) {
        queryContext.tableName = extractTableName(sql)
        queryContext.returningColumns = extractReturningColumns(sql)

        const cleanSql = sql.replace(/\s+RETURNING\s+.*?(?:;|\s*$)/i, "")

        if (isSelectQuery(cleanSql)) {
          rows = await sqlite.select(cleanSql, params)
        } else {
          if (cleanSql.toUpperCase().startsWith("INSERT")) {
            const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE rowid = last_insert_rowid()`
            const result: any[] = await sqlite.select(selectSql)
            rows = processResults(result)
          } else if (cleanSql.toUpperCase().startsWith("UPDATE") && queryContext.tableName) {
            const whereClause = cleanSql.match(/WHERE\s+(.*?)(?:;|\s*$)/i)
            if (whereClause && whereClause[1]) {
              const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause[1]}`
              const result: any[] = await sqlite.select(selectSql)
              rows = processResults(result)
            }
          } else if (cleanSql.toUpperCase().startsWith("DELETE") && queryContext.tableName) {
            const whereClause = cleanSql.match(/WHERE\s+(.*?)(?:;|\s*$)/i)
            if (whereClause && whereClause[1]) {
              const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause[1]}`
              const result: any[] = await sqlite.select(selectSql)
              rows = processResults(result)
            }
          }

          await sqlite.execute(cleanSql, params)
        }
      } else {
        if (isSelectQuery(sql)) {
          rows = await sqlite.select(sql, params)
        } else {
          await sqlite.execute(sql, params)
          rows = []
        }
      }

      rows = rows.map((row: any) => {
        return Object.values(row)
      })

      results = method === "all" ? rows : rows[0]

      return { rows: results }
    } catch (error) {
      throw new Error(error as string)
    }
  }

  return drizzleProxy(queryCallback, config)
}
