import {
  type BuildQueryResult,
  type DBQueryConfig,
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
