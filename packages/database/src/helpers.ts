import {
  type BuildQueryResult,
  type DBQueryConfig,
  DrizzleQueryError,
  type ExtractTablesWithRelations,
  type SQL,
  type SQLWrapper,
  asc,
  desc,
  sql
} from "drizzle-orm"

import * as schema from "./schema"

type Schema = typeof schema
type TablesWithRelations = ExtractTablesWithRelations<Schema>

/**
 * Extracts the 'with' clause type for relations from a Drizzle ORM query configuration.
 * @template TableName - The name of the table.
 */
export type IncludeRelation<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  "one" | "many",
  boolean,
  TablesWithRelations,
  TablesWithRelations[TableName]
>["with"]

/**
 * Extracts the 'columns' clause type for selected columns from a Drizzle ORM query configuration.
 * @template TableName - The name of the table.
 */
export type IncludeColumns<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  "one" | "many",
  boolean,
  TablesWithRelations,
  TablesWithRelations[TableName]
>["columns"]

/**
 * Infers the query result model for a given table, including specified relations and columns.
 * Handles optional relations correctly.
 * @template TableName - The name of the table.
 * @template With - The 'with' clause for relations.
 * @template Columns - The 'columns' clause for selected columns.
 */
export type InferQueryModel<
  TableName extends keyof TablesWithRelations,
  With extends IncludeRelation<TableName> | undefined = undefined,
  Columns extends IncludeColumns<TableName> | undefined = undefined
> = {
  [K in keyof BaseQueryResult<TableName, Columns, With>]: K extends keyof With
    ? With[K] extends { __optional: true }
      ? BaseQueryResult<TableName, Columns, With>[K] | undefined
      : BaseQueryResult<TableName, Columns, With>[K]
    : BaseQueryResult<TableName, Columns, With>[K]
}

type BaseQueryResult<
  TableName extends keyof TablesWithRelations,
  Columns extends IncludeColumns<TableName> | undefined,
  With extends IncludeRelation<TableName> | undefined
> = BuildQueryResult<
  TablesWithRelations,
  TablesWithRelations[TableName],
  {
    columns: Columns
    with: With
  }
>

/**
 * Represents a value that can be used as a cursor in keyset pagination.
 */
export type CursorValue = string | number | boolean | null | Date

/**
 * Builds SQL cursor condition for keyset pagination with multi-column sorting
 *
 * Generates a WHERE clause that allows fetching pages after a cursor point
 * when sorting by multiple columns. The condition handles tiebreaking by
 * requiring all preceding columns to match the cursor values while the
 * current column satisfies the comparison operator.
 *
 * @param params.cursorValues - Array of cursor values from the last fetched item.
 * @param params.columns - Array of SQL column expressions matching the sort order.
 * @param params.direction - Sort direction ('asc' or 'desc').
 * @param params.tiebreakerDirection - Optional override for tiebreaker comparison direction.
 * @returns SQL WHERE clause or undefined if cursor values don't match columns count.
 *
 * @example
 * ```ts
 * // For cursor pagination with (createdAt DESC, id ASC)
 * const condition = buildCursorCondition({
 *   cursorValues: [lastDate, lastId],
 *   columns: [createdAt, id],
 *   direction: 'desc',
 *   tiebreakerDirection: 'asc'
 * })
 * // Generates: (createdAt < ?) OR ((createdAt = ?) AND (id > ?))
 * ```
 */
export function buildCursorCondition(params: {
  cursorValues: CursorValue[]
  columns: SQLWrapper[]
  direction: "asc" | "desc"
  tiebreakerDirection?: "asc" | "desc"
}): SQL | undefined {
  const { cursorValues, columns, direction, tiebreakerDirection = "asc" } = params

  if (cursorValues.length === 0 || cursorValues.length !== columns.length) {
    return undefined
  }

  const conditions: SQL[] = []
  const primaryOperator = direction === "desc" ? "<" : ">"
  const tiebreakerOperator = tiebreakerDirection === "desc" ? "<" : ">"

  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    const value = cursorValues[i]

    if (i === 0) {
      conditions.push(sql`${column} ${sql.raw(primaryOperator)} ${value}`)
    } else {
      const equalityConditions: SQL[] = []
      for (let j = 0; j < i; j++) {
        equalityConditions.push(sql`${columns[j]} = ${cursorValues[j]}`)
      }
      conditions.push(
        sql`(${sql.join(equalityConditions, sql` AND `)} AND ${column} ${sql.raw(tiebreakerOperator)} ${value})`
      )
    }
  }

  return sql`(${sql.join(conditions, sql` OR `)})`
}

/**
 * Returns an order-by SQL expression based on the column and direction.
 * @param column - The SQL column to order by.
 * @param direction - The sort direction ('asc' or 'desc').
 * @returns An `asc` or `desc` SQL order-by expression.
 */
export function getOrderByFromColumn(column: SQLWrapper, direction: "asc" | "desc") {
  return direction === "asc" ? asc(column) : desc(column)
}

/**
 * Enum for common SQLite error codes related to constraints.
 */
export enum SQLiteErrorCode {
  UNIQUE_CONSTRAINT = "2067",
  NOT_NULL_CONSTRAINT = "787",
  FOREIGN_KEY_CONSTRAINT = "1299",
  CHECK_CONSTRAINT = "275",
  CONSTRAINT_OTHER = "1555"
}

/**
 * Represents a database error, potentially including a specific error code.
 */
export type DatabaseError = Error & {
  code?: string
  errno?: number
}

/**
 * Type guard to check if an unknown error is a DatabaseError instance.
 * @param error - The error to check.
 * @returns True if the error is a DatabaseError, false otherwise.
 */
function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof Error
}

/**
 * Extracts the error code from an error object, supporting both direct 'code' property
 * and codes embedded in the message.
 * @param error - The error object.
 * @returns The extracted error code as a string, or null if not found.
 */
function extractErrorCode(error: Error): string | null {
  if ("code" in error && typeof (error as { code?: unknown }).code === "string") {
    return (error as { code: string }).code
  }

  const codeMatch = error.message.match(/\(code:\s*(\d+)\)/)
  if (codeMatch) {
    return codeMatch[1]
  }

  return null
}

/**
 * Type guard to check if an unknown error is a DrizzleQueryError that wraps a DatabaseError with a code.
 * @param error - The error to check.
 * @returns True if the error matches the expected DrizzleQueryError structure, false otherwise.
 */
function isDrizzleQueryError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  if (!(error instanceof DrizzleQueryError) || !error.cause) {
    return false
  }

  if (!isDatabaseError(error.cause)) {
    return false
  }

  const code = extractErrorCode(error.cause)
  if (!code) {
    return false
  }

  if (!error.cause.code) {
    error.cause.code = code
  }

  return true
}

/**
 * Type guard to check if an error is a SQLite constraint error
 *
 * Checks if the error originated from Drizzle ORM and has a SQLite
 * constraint error code. Optionally filters by specific constraint type.
 *
 * @param error - Unknown error to check
 * @param constraintType - Optional specific constraint type to check for
 * @returns True if error matches the constraint type
 *
 * @example
 * ```ts
 * try {
 *   await db.insert(users).values(user)
 * } catch (err) {
 *   if (isConstraintError(err, SQLiteErrorCode.UNIQUE_CONSTRAINT)) {
 *     console.log('Email already exists')
 *   }
 * }
 * ```
 */
export function isConstraintError(
  error: unknown,
  constraintType?: SQLiteErrorCode
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  if (!isDrizzleQueryError(error)) {
    return false
  }

  const code = error.cause.code

  if (constraintType) {
    return code === constraintType
  }

  return (
    code === SQLiteErrorCode.UNIQUE_CONSTRAINT ||
    code === SQLiteErrorCode.NOT_NULL_CONSTRAINT ||
    code === SQLiteErrorCode.FOREIGN_KEY_CONSTRAINT ||
    code === SQLiteErrorCode.CHECK_CONSTRAINT ||
    code === SQLiteErrorCode.CONSTRAINT_OTHER
  )
}

/**
 * Type guard for SQLite unique constraint errors
 *
 * @param error - Unknown error to check
 * @returns True if error is a unique constraint violation
 */
export function isUniqueConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.UNIQUE_CONSTRAINT)
}

/**
 * Type guard for SQLite NOT NULL constraint errors
 *
 * @param error - Unknown error to check
 * @returns True if error is a NOT NULL constraint violation
 */
export function isNotNullConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.NOT_NULL_CONSTRAINT)
}

/**
 * Type guard for SQLite foreign key constraint errors
 *
 * @param error - Unknown error to check
 * @returns True if error is a foreign key constraint violation
 */
export function isForeignKeyConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.FOREIGN_KEY_CONSTRAINT)
}

/**
 * Provides structured information about a database constraint error.
 */
export type ConstraintErrorInfo = {
  type: "unique" | "not_null" | "foreign_key" | "check" | "other"
  code: string
  message: string
  table?: string
  column?: string
}

/**
 * Extracts structured information from SQLite constraint errors
 *
 * Parses SQLite error messages to extract constraint type, affected table,
 * and column names. Useful for displaying user-friendly error messages.
 *
 * @param error - Error to parse
 * @returns Structured constraint info or null if not a constraint error
 *
 * @example
 * ```ts
 * try {
 *   await db.insert(albums).values(album)
 * } catch (err) {
 *   const info = extractConstraintInfo(err)
 *   if (info?.type === 'unique' && info.table === 'albums') {
 *     showError(`Album "${album.name}" already exists`)
 *   }
 * }
 * ```
 */
export function extractConstraintInfo(error: unknown): ConstraintErrorInfo | null {
  if (!isDrizzleQueryError(error)) {
    return null
  }

  const { code, message } = error.cause

  let type: ConstraintErrorInfo["type"]
  switch (code) {
    case SQLiteErrorCode.UNIQUE_CONSTRAINT:
      type = "unique"
      break
    case SQLiteErrorCode.NOT_NULL_CONSTRAINT:
      type = "not_null"
      break
    case SQLiteErrorCode.FOREIGN_KEY_CONSTRAINT:
      type = "foreign_key"
      break
    case SQLiteErrorCode.CHECK_CONSTRAINT:
      type = "check"
      break
    default:
      type = "other"
  }

  const tableColumnMatches = message.matchAll(/(\w+)\.(\w+)/g)
  const matches = Array.from(tableColumnMatches)

  let table: string | undefined
  let column: string | undefined

  if (matches.length > 0) {
    table = matches[0][1]
    column = matches.map((m) => m[2]).join(", ")
  }

  return {
    type,
    code,
    message,
    table,
    column
  }
}
