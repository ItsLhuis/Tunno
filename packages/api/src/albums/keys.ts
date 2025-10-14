import { type QueryAlbumParams } from "./types"

export const albumKeys = {
  all: ["albums"] as const,
  withSongs: ["withSongs"] as const,
  withArtists: ["withArtists"] as const,
  withStats: ["withStats"] as const,
  withSongsAndArtists: ["withSongsAndArtists"] as const,
  withMainRelations: ["withSongsAndArtists"] as const,
  withAllRelations: ["withAllRelations"] as const,
  withCustomRelations: ["withCustomRelations"] as const,
  list: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithSongs: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withSongs]
    return params ? [...key, params] : key
  },
  listWithArtists: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withArtists]
    return params ? [...key, params] : key
  },
  listWithStats: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withStats]
    return params ? [...key, params] : key
  },
  listWithSongsAndArtists: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withSongsAndArtists]
    return params ? [...key, params] : key
  },
  listWithMainRelations: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listWithAllRelations: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", ...albumKeys.withAllRelations]
    return params ? [...key, params] : key
  },
  listInfinite: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", "infinite"]
    return params ? [...key, params] : key
  },
  listInfiniteWithMainRelations: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", "infinite", ...albumKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listIdsOnly: (params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", "ids"]
    return params ? [...key, params] : key
  },
  listSongIdsOnly: (id: number) => [...albumKeys.all, "list", "songs", "ids", id] as const,
  listByArtists: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "listByArtists", { artistIds: [...artistIds].sort() }]
    return params ? [...key, params] : key
  },
  listByArtistsWithSongs: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listByArtists",
      ...albumKeys.withSongs,
      { artistIds: [...artistIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  listByArtistsWithArtists: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listByArtists",
      ...albumKeys.withArtists,
      { artistIds: [...artistIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  listByArtistsWithMainRelations: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listByArtists",
      ...albumKeys.withMainRelations,
      { artistIds: [...artistIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  listByArtistsWithAllRelations: (artistIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listByArtists",
      ...albumKeys.withAllRelations,
      { artistIds: [...artistIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  listBySongs: (songIds: number[], params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "listBySongs", { songIds: [...songIds].sort() }]
    return params ? [...key, params] : key
  },
  listBySongsWithMainRelations: (songIds: number[], params?: QueryAlbumParams) => {
    const key = [
      ...albumKeys.all,
      "listBySongs",
      ...albumKeys.withMainRelations,
      { songIds: [...songIds].sort() }
    ]
    return params ? [...key, params] : key
  },
  listWithCustomRelations: (relationKey: string, params?: QueryAlbumParams) => {
    const key = [...albumKeys.all, "list", "custom", relationKey]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...albumKeys.all, "details", id] as const,
  detailsWithSongs: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withSongs] as const,
  detailsWithArtists: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withArtists] as const,
  detailsWithStats: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withStats] as const,
  detailsWithSongsAndArtists: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withSongsAndArtists] as const,
  detailsWithMainRelations: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withMainRelations] as const,
  detailsWithAllRelations: (id: number) =>
    [...albumKeys.all, "details", id, ...albumKeys.withAllRelations] as const,
  detailsWithCustomRelations: (id: number, relationKey: string) =>
    [...albumKeys.all, "details", id, "custom", relationKey] as const
}
