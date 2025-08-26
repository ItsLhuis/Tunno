import { type QueryAlbumParams } from "./types"

export const albumKeys = {
  all: ["albums"] as const,
  withRelations: ["withRelations"] as const,
  list: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithRelations: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withRelations]
    return params ? [...key, params] : key
  },
  listByArtists: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "listByArtists", { artistIds: [...artistIds].sort() }]
    return params ? [...key, params] : key
  },
  listByArtistsWithRelations: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listByArtists",
      ...albumKeys.withRelations,
      { artistIds: [...artistIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...albumKeys.all, "details", id] as const,
  detailsWithRelations: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withRelations] as const
}
