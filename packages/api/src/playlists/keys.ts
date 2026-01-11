import { type QueryPlaylistParams } from "./types"

/**
 * Query keys for playlist-related data.
 *
 * Provides a structured way to generate unique keys for React Query,
 * enabling efficient caching and invalidation of playlist data.
 *
 * Base keys:
 * - `all`: all playlists
 * - `withSongs`, `withStats`: key parts for relations
 * - `withSongsAndStats`, `withMainRelations`, `withAllRelations`, `withCustomRelations`: combinations
 *
 * Methods:
 * - `list(params?)`: list playlists
 * - `listWithSongs(params?)`: list playlists with songs
 * - `listWithStats(params?)`: list playlists with stats
 * - `listWithSongsAndStats(params?)`: list playlists with songs and stats
 * - `listWithMainRelations(params?)`: list playlists with main relations
 * - `listWithAllRelations(params?)`: list playlists with all relations
 * - `listInfiniteWithMainRelations(params?)`: infinite scrolling list of playlists with main relations
 * - `listIdsOnly(params?)`: list only playlist IDs
 * - `listWithCustomRelations(relationKey, params?)`: list playlists with custom relation
 * - `details(id)`: fetch playlist details
 * - `detailsWithSongs(id)`, `detailsWithStats(id)`, etc.: variations including relations
 */
export const playlistKeys = {
  all: ["playlists"] as const,
  withSongs: ["withSongs"] as const,
  withStats: ["withStats"] as const,
  withSongsAndStats: ["withSongsAndStats"] as const,
  withMainRelations: ["withSongs"] as const,
  withAllRelations: ["withSongsAndStats"] as const,
  withCustomRelations: ["withCustomRelations"] as const,
  list: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list"]
    return params ? [...key, params] : key
  },
  listWithSongs: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", ...playlistKeys.withSongs]
    return params ? [...key, params] : key
  },
  listWithStats: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", ...playlistKeys.withStats]
    return params ? [...key, params] : key
  },
  listWithSongsAndStats: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", ...playlistKeys.withSongsAndStats]
    return params ? [...key, params] : key
  },
  listWithMainRelations: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", ...playlistKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listWithAllRelations: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", ...playlistKeys.withAllRelations]
    return params ? [...key, params] : key
  },
  listInfiniteWithMainRelations: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", "infinite", ...playlistKeys.withMainRelations]
    return params ? [...key, params] : key
  },
  listIdsOnly: (params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", "ids"]
    return params ? [...key, params] : key
  },
  listWithCustomRelations: (relationKey: string, params?: QueryPlaylistParams) => {
    const key = [...playlistKeys.all, "list", "custom", relationKey]
    return params ? [...key, params] : key
  },
  details: (id: number) => [...playlistKeys.all, "details", id] as const,
  detailsWithSongs: (id: number) =>
    [...playlistKeys.all, "details", id, ...playlistKeys.withSongs] as const,
  detailsWithStats: (id: number) =>
    [...playlistKeys.all, "details", id, ...playlistKeys.withStats] as const,
  detailsWithSongsAndStats: (id: number) =>
    [...playlistKeys.all, "details", id, ...playlistKeys.withSongsAndStats] as const,
  detailsWithMainRelations: (id: number) =>
    [...playlistKeys.all, "details", id, ...playlistKeys.withMainRelations] as const,
  detailsWithAllRelations: (id: number) =>
    [...playlistKeys.all, "details", id, ...playlistKeys.withAllRelations] as const,
  detailsWithCustomRelations: (id: number, relationKey: string) =>
    [...playlistKeys.all, "details", id, "custom", relationKey] as const
}
