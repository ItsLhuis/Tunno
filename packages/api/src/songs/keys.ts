import { type QuerySongsParams } from "./types"

export const songKeys = {
  all: ["songs"] as const,
  withAlbum: ["withAlbum"] as const,
  withArtists: ["withArtists"] as const,
  withPlaylists: ["withPlaylists"] as const,
  withStats: ["withStats"] as const,
  withPlayHistory: ["withPlayHistory"] as const,
  withAlbumAndArtists: ["withAlbumAndArtists"] as const,
  withAlbumAndPlaylists: ["withAlbumAndPlaylists"] as const,
  withArtistsAndPlaylists: ["withArtistsAndPlaylists"] as const,
  withAlbumAndArtistsAndPlaylists: ["withAlbumAndArtistsAndPlaylists"] as const,
  withMainRelations: ["withAlbumAndArtistsAndPlaylists"] as const,
  withAllRelations: ["withAllRelations"] as const,
  withCustomRelations: ["withCustomRelations"] as const,
  list: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithAlbum: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withAlbum]
    return params ? [...key, params] : key
  },
  listWithArtists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withArtists]
    return params ? [...key, params] : key
  },
  listWithPlaylists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withPlaylists]
    return params ? [...key, params] : key
  },
  listWithStats: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withStats]
    return params ? [...key, params] : key
  },
  listWithPlayHistory: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withPlayHistory]
    return params ? [...key, params] : key
  },
  listWithAlbumAndArtists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withAlbumAndArtists]
    return params ? [...key, params] : key
  },
  listWithAlbumAndPlaylists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withAlbumAndPlaylists]
    return params ? [...key, params] : key
  },
  listWithArtistsAndPlaylists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withArtistsAndPlaylists]
    return params ? [...key, params] : key
  },
  listWithAlbumAndArtistsAndPlaylists: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withAlbumAndArtistsAndPlaylists]
    return params ? [...key, params] : key
  },
  listWithMainRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listWithAllRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", ...songKeys.withAllRelations]
    return params ? [...key, params] : key
  },
  listInfiniteWithMainRelations: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", "infinite", ...songKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listIdsOnly: (params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", "ids"]
    return params ? [...key, params] : key
  },
  listSongIdsByArtistIds: (artistIds: number[]) =>
    [...songKeys.all, "list", "ids", "artist", artistIds] as const,
  listSongIdsByAlbumIds: (albumIds: number[]) =>
    [...songKeys.all, "list", "ids", "album", albumIds] as const,
  listSongIdsByPlaylistIds: (playlistIds: number[]) =>
    [...songKeys.all, "list", "ids", "playlist", playlistIds] as const,
  listWithCustomRelations: (relationKey: string, params?: QuerySongsParams) => {
    const key = [...songKeys.all, "list", "custom", relationKey]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...songKeys.all, "details", id] as const,
  detailsWithAlbum: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withAlbum] as const,
  detailsWithArtists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withArtists] as const,
  detailsWithPlaylists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withPlaylists] as const,
  detailsWithStats: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withStats] as const,
  detailsWithPlayHistory: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withPlayHistory] as const,
  detailsWithAlbumAndArtists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withAlbumAndArtists] as const,
  detailsWithAlbumAndPlaylists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withAlbumAndPlaylists] as const,
  detailsWithArtistsAndPlaylists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withArtistsAndPlaylists] as const,
  detailsWithAlbumAndArtistsAndPlaylists: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withAlbumAndArtistsAndPlaylists] as const,
  detailsWithMainRelations: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withMainRelations] as const,
  detailsWithAllRelations: (id: number) =>
    [...songKeys.all, "details", id, ...songKeys.withAllRelations] as const,
  detailsWithCustomRelations: (id: number, relationKey: string) =>
    [...songKeys.all, "details", id, "custom", relationKey] as const
}
