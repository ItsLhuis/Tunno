export type QueryParams<TOrderByColumn extends string> = {
  limit?: number
  offset?: number
  orderBy?: { column: TOrderByColumn; direction: "asc" | "desc" }
  filters?: { search?: string }
}
