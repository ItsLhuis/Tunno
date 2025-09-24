export type QueryParams<TOrderByColumn extends string, TFilters = Record<string, unknown>> = {
  limit?: number
  offset?: number
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: TFilters
}
