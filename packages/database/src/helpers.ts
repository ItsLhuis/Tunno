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

export type IncludeRelation<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  "one" | "many",
  boolean,
  TablesWithRelations,
  TablesWithRelations[TableName]
>["with"]

export type IncludeColumns<TableName extends keyof TablesWithRelations> = DBQueryConfig<
  "one" | "many",
  boolean,
  TablesWithRelations,
  TablesWithRelations[TableName]
>["columns"]

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

export type CursorValue = string | number | boolean | null | Date

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

export function getOrderByFromColumn(column: SQLWrapper, direction: "asc" | "desc") {
  return direction === "asc" ? asc(column) : desc(column)
}

export enum SQLiteErrorCode {
  UNIQUE_CONSTRAINT = "2067",
  NOT_NULL_CONSTRAINT = "787",
  FOREIGN_KEY_CONSTRAINT = "1299",
  CHECK_CONSTRAINT = "275",
  CONSTRAINT_OTHER = "1555"
}

export type DatabaseError = Error & {
  code?: string
  errno?: number
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return error instanceof Error
}

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

export function isUniqueConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.UNIQUE_CONSTRAINT)
}

export function isNotNullConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.NOT_NULL_CONSTRAINT)
}

export function isForeignKeyConstraintError(
  error: unknown
): error is DrizzleQueryError & { cause: DatabaseError & { code: string } } {
  return isConstraintError(error, SQLiteErrorCode.FOREIGN_KEY_CONSTRAINT)
}

export type ConstraintErrorInfo = {
  type: "unique" | "not_null" | "foreign_key" | "check" | "other"
  code: string
  message: string
  table?: string
  column?: string
}

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
