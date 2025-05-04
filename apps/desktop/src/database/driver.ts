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
  const matches = sql.match(/(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+([^\s(,]+)/i)
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
  return /^\s*SELECT\b/i.test(sql)
}

function isInsertQuery(sql: string): boolean {
  return /^\s*INSERT\b/i.test(sql)
}

function isUpdateQuery(sql: string): boolean {
  return /^\s*UPDATE\b/i.test(sql)
}

function isDeleteQuery(sql: string): boolean {
  return /^\s*DELETE\b/i.test(sql)
}

function extractWhereClause(sql: string): string | null {
  const matches = sql.match(/WHERE\s+(.*?)(?:;|\s*(?:ORDER|LIMIT|GROUP|HAVING|$))/i)
  return matches ? matches[1] : null
}

export const getSQLiteDatabase = async (name: string): Promise<Database> =>
  await Database.load(`sqlite:${name}`)

function processResults(results: any[]): any[] {
  if (!results || results.length === 0) return []

  return results.map((row) => {
    if (Array.isArray(row)) return row

    if (typeof row === "object" && row !== null) {
      return Object.values(row)
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

      queryContext.lastQuery = sql
      queryContext.lastParams = params
      queryContext.lastMethod = method
      queryContext.isReturningQuery = isReturningQuery(sql)
      queryContext.tableName = extractTableName(sql)

      let result: any[] = []

      if (queryContext.isReturningQuery) {
        queryContext.returningColumns = extractReturningColumns(sql)
        const cleanSql = sql.replace(/\s+RETURNING\s+.*?(?:;|\s*$)/i, "")

        if (isInsertQuery(cleanSql)) {
          await sqlite.execute(cleanSql, params)

          const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE rowid = last_insert_rowid()`
          result = await sqlite.select(selectSql)
        } else if (isUpdateQuery(cleanSql) && queryContext.tableName) {
          const whereClause = extractWhereClause(cleanSql)
          let affectedRows: any[] = []

          if (whereClause) {
            const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause}`
            affectedRows = await sqlite.select(selectSql, params)
          }

          await sqlite.execute(cleanSql, params)

          result = affectedRows
        } else if (isDeleteQuery(cleanSql) && queryContext.tableName) {
          const whereClause = extractWhereClause(cleanSql)

          if (whereClause) {
            const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause}`
            result = await sqlite.select(selectSql, params)
          }

          await sqlite.execute(cleanSql, params)
        } else if (isSelectQuery(cleanSql)) {
          result = await sqlite.select(cleanSql, params)
        }
      } else {
        if (isSelectQuery(sql)) {
          result = await sqlite.select(sql, params)
        } else {
          await sqlite.execute(sql, params).catch(() => [])
          result = []
        }
      }

      const processedRows = processResults(result)

      const finalResult =
        method === "all" ? processedRows : processedRows.length > 0 ? processedRows[0] : {}

      return { rows: finalResult }
    } catch (error) {
      throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
  }

  return drizzleProxy(queryCallback, config)
}
