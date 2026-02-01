import Database from "@tauri-apps/plugin-sql"

import { drizzle as drizzleProxy, type AsyncRemoteCallback } from "drizzle-orm/sqlite-proxy"
import { type DrizzleConfig } from "drizzle-orm/utils"

/**
 * Context object to store details about the last executed SQL query.
 * This can be useful for debugging or for more complex query handling.
 */
type QueryContext = {
  lastQuery: string
  lastParams: unknown[]
  lastMethod: string
  isReturningQuery: boolean
  returningColumns: string
  tableName: string | null
}

/**
 * Global instance of `QueryContext` to store information about the most recently executed Drizzle query.
 */
const queryContext: QueryContext = {
  lastQuery: "",
  lastParams: [],
  lastMethod: "",
  isReturningQuery: false,
  returningColumns: "",
  tableName: null
}

/**
 * Extracts the table name from an SQL query string (INSERT, UPDATE, DELETE).
 *
 * @param sql - The SQL query string.
 * @returns The extracted table name as a string, or `null` if not found.
 */
function extractTableName(sql: string): string | null {
  const matches = sql.match(/(?:INSERT\s+INTO|UPDATE|DELETE\s+FROM)\s+([^\s(,]+)/i)
  return matches ? matches[1].replace(/["`]/g, "") : null
}

/**
 * Checks if an SQL query string contains a `RETURNING` clause.
 *
 * @param sql - The SQL query string.
 * @returns `true` if the query includes `RETURNING`, `false` otherwise.
 */
function isReturningQuery(sql: string): boolean {
  return sql.toUpperCase().includes("RETURNING")
}

/**
 * Extracts the columns specified in an SQL `RETURNING` clause.
 *
 * @param sql - The SQL query string.
 * @returns A string containing the columns to be returned, or "*" if not explicitly specified.
 */
function extractReturningColumns(sql: string): string {
  const matches = sql.match(/RETURNING\s+(.*?)(?:;|\s*$)/i)
  return matches ? matches[1] : "*"
}

/**
 * Checks if an SQL query string is a `SELECT` query.
 *
 * @param sql - The SQL query string.
 * @returns `true` if it's a `SELECT` query, `false` otherwise.
 */
function isSelectQuery(sql: string): boolean {
  return /^\s*SELECT\b/i.test(sql)
}

/**
 * Checks if an SQL query string is an `INSERT` query.
 *
 * @param sql - The SQL query string.
 * @returns `true` if it's an `INSERT` query, `false` otherwise.
 */
function isInsertQuery(sql: string): boolean {
  return /^\s*INSERT\b/i.test(sql)
}

/**
 * Checks if an SQL query string is an `UPDATE` query.
 *
 * @param sql - The SQL query string.
 * @returns `true` if it's an `UPDATE` query, `false` otherwise.
 */
function isUpdateQuery(sql: string): boolean {
  return /^\s*UPDATE\b/i.test(sql)
}

/**
 * Checks if an SQL query string is a `DELETE` query.
 *
 * @param sql - The SQL query string.
 * @returns `true` if it's a `DELETE` query, `false` otherwise.
 */
function isDeleteQuery(sql: string): boolean {
  return /^\s*DELETE\b/i.test(sql)
}

/**
 * Extracts the `WHERE` clause content from an SQL query string.
 *
 * @param sql - The SQL query string.
 * @returns The extracted `WHERE` clause content as a string, or `null` if not found.
 */
function extractWhereClause(sql: string): string | null {
  const whereMatch = sql.match(
    /WHERE\s+(.*?)(?:\s+ORDER\s+BY|\s+LIMIT|\s+GROUP\s+BY|\s+HAVING|;|\s*$)/i
  )
  return whereMatch ? whereMatch[1].trim() : null
}

/**
 * Extracts the parameters corresponding to the `WHERE` clause from a list of all query parameters.
 * This is crucial for correctly applying parameters to `SELECT` statements when
 * simulating `RETURNING` clauses for UPDATE/DELETE operations.
 *
 * @param sql - The SQL query string.
 * @param allParams - An array containing all parameters provided with the SQL query.
 * @returns An array of parameters relevant to the `WHERE` clause.
 */
function extractWhereParams(sql: string, allParams: unknown[]): unknown[] {
  const whereClause = extractWhereClause(sql)
  if (!whereClause) return []

  const whereParamCount = (whereClause.match(/\?/g) || []).length

  if (whereParamCount === 0) return []

  if (isUpdateQuery(sql) || isDeleteQuery(sql)) {
    return allParams.slice(-whereParamCount)
  }

  return allParams.slice(-whereParamCount)
}

/**
 * Asynchronously loads and connects to an SQLite database using `@tauri-apps/plugin-sql`.
 *
 * @param name - The name of the database file to load.
 * @returns A Promise that resolves to a `Database` instance.
 */
export async function getSQLiteDatabase(name: string): Promise<Database> {
  return await Database.load(`sqlite:${name}`)
}

/**
 * Processes raw results from the SQLite driver into a format compatible with Drizzle ORM.
 *
 * This function handles cases where results might be arrays of arrays (e.g., from `select` method
 * when returning multiple columns for multiple rows) or objects, converting them to
 * consistent array-of-arrays or array-of-objects structure where appropriate.
 *
 * @param results - The raw results received from the underlying SQLite driver.
 * @returns An array of processed results.
 */
function processResults(results: unknown[]): unknown[] {
  if (!results || results.length === 0) return []

  return results.map((row) => {
    if (Array.isArray(row)) return row

    if (typeof row === "object" && row !== null) {
      return Object.values(row)
    }

    return [row]
  })
}

/**
 * Creates a Drizzle ORM client instance configured to use `@tauri-apps/plugin-sql` for database interactions.
 *
 * This function acts as a custom driver for Drizzle, translating Drizzle's SQL queries
 * into commands executable by the Tauri SQL plugin. It specifically handles `RETURNING` clauses
 * by simulating their behavior through separate `SELECT` queries for INSERT, UPDATE, and DELETE operations,
 * as the underlying driver might not directly support them.
 *
 * @param databaseName - The name of the SQLite database file to connect to.
 * @param config - (Optional) Drizzle configuration options for the schema.
 * @returns A Drizzle ORM client instance.
 */
export function drizzle<TSchema extends Record<string, unknown> = Record<string, never>>(
  databaseName: string,
  config?: DrizzleConfig<TSchema>
) {
  const queryCallback: AsyncRemoteCallback = async (sql, params, method) => {
    try {
      const sqlite = await getSQLiteDatabase(databaseName)

      // Store query context for debugging or advanced logic (e.g., specific returning column processing)
      queryContext.lastQuery = sql
      queryContext.lastParams = params
      queryContext.lastMethod = method
      queryContext.isReturningQuery = isReturningQuery(sql)
      queryContext.tableName = extractTableName(sql)

      let result: unknown[] = []

      if (queryContext.isReturningQuery) {
        queryContext.returningColumns = extractReturningColumns(sql)
        const cleanSql = sql.replace(/\s+RETURNING\s+.*?(?:;|\s*$)/i, "")

        if (isInsertQuery(cleanSql)) {
          // Simulate RETURNING for INSERT
          await sqlite.execute(cleanSql, params)

          const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE rowid = last_insert_rowid()`
          result = await sqlite.select(selectSql)
        } else if (isUpdateQuery(cleanSql) && queryContext.tableName) {
          // Simulate RETURNING for UPDATE
          const whereClause = extractWhereClause(cleanSql)
          let affectedRows: unknown[] = []

          if (whereClause) {
            const whereParams = extractWhereParams(cleanSql, params)
            const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause}`
            affectedRows = await sqlite.select(selectSql, whereParams)
          }

          await sqlite.execute(cleanSql, params)

          result = affectedRows
        } else if (isDeleteQuery(cleanSql) && queryContext.tableName) {
          // Simulate RETURNING for DELETE
          const whereClause = extractWhereClause(cleanSql)

          if (whereClause) {
            const whereParams = extractWhereParams(cleanSql, params)
            const selectSql = `SELECT ${queryContext.returningColumns} FROM ${queryContext.tableName} WHERE ${whereClause}`
            result = await sqlite.select(selectSql, whereParams)
          }

          await sqlite.execute(cleanSql, params)
        } else if (isSelectQuery(cleanSql)) {
          // Handle SELECT with RETURNING (though less common, keep consistent)
          result = await sqlite.select(cleanSql, params)
        }
      } else {
        // Standard queries without RETURNING
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

      return { rows: finalResult as unknown[] }
    } catch (error) {
      throw new Error(typeof error === "string" ? error : JSON.stringify(error))
    }
  }

  return drizzleProxy(queryCallback, config)
}
