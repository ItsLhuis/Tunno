import { type QueryArtistParams } from "./types"

export const artistKeys = {
  all: ["artists"] as const,
  withRelations: ["withRelations"] as const,
  list: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithRelations: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withRelations]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...artistKeys.all, "details", id] as const,
  detailsWithRelations: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withRelations] as const
}
