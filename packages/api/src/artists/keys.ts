import { type QueryArtistParams } from "./types"

export const artistKeys = {
  all: ["artists"] as const,
  withSongs: ["withSongs"] as const,
  withAlbums: ["withAlbums"] as const,
  withStats: ["withStats"] as const,
  withSongsAndAlbums: ["withSongsAndAlbums"] as const,
  withMainRelations: ["withSongsAndAlbums"] as const,
  withAllRelations: ["withAllRelations"] as const,
  withCustomRelations: ["withCustomRelations"] as const,
  list: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithSongs: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withSongs]
    return params ? [...key, params] : key
  },
  listWithAlbums: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withAlbums]
    return params ? [...key, params] : key
  },
  listWithStats: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withStats]
    return params ? [...key, params] : key
  },
  listWithSongsAndAlbums: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withSongsAndAlbums]
    return params ? [...key, params] : key
  },
  listWithMainRelations: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listWithAllRelations: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", ...artistKeys.withAllRelations]
    return params ? [...key, params] : key
  },
  listInfiniteWithMainRelations: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", "infinite", ...artistKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listIdsOnly: (params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", "ids"]
    return params ? [...key, params] : key
  },
  listWithCustomRelations: (relationKey: string, params?: QueryArtistParams) => {
    const key = [...artistKeys.all, "list", "custom", relationKey]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...artistKeys.all, "details", id] as const,
  detailsWithSongs: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withSongs] as const,
  detailsWithAlbums: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withAlbums] as const,
  detailsWithStats: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withStats] as const,
  detailsWithSongsAndAlbums: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withSongsAndAlbums] as const,
  detailsWithMainRelations: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withMainRelations] as const,
  detailsWithAllRelations: (id: number) =>
    [...artistKeys.all, "details", id, ...artistKeys.withAllRelations] as const,
  detailsWithCustomRelations: (id: number, relationKey: string) =>
    [...artistKeys.all, "details", id, "custom", relationKey] as const
}
