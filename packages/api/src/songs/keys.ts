import { type QuerySongsParams } from "./types"

export const songKeys = {
  all: ["songs"] as const,
  withRelations: ["withRelations"] as const,
  listWithRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withRelations]
    return params ? [...key, params] : key
  },
  detailsWithRelations: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withRelations] as const
}
