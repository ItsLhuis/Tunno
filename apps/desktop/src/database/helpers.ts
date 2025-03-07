import {
  type BuildQueryResult,
  type DBQueryConfig,
  type ExtractTablesWithRelations
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
