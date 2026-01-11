import {
  type InsertPlaylist as BaseInsertPlaylist,
  type Playlist as BasePlaylist,
  type InferQueryModel
} from "@repo/database"

import { type QueryParams } from "../types"

/**
 * Represents the available column names for the Playlist entity.
 */
export type PlaylistColumns = keyof BasePlaylist

/**
 * Represents the base Playlist entity without relations, directly from the database schema.
 */
export type Playlist = BasePlaylist

/**
 * Defines the columns by which a list of playlists can be ordered.
 */
export type OrderablePlaylistColumns =
  | "name"
  | "playCount"
  | "isFavorite"
  | "totalTracks"
  | "totalDuration"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

/**
 * Defines the filterable properties for querying playlists.
 */
export type PlaylistFilters = {
  search?: string
  isFavorite?: boolean
  minPlayCount?: number
  maxPlayCount?: number
  minTotalTracks?: number
  maxTotalTracks?: number
  minTotalDuration?: number
  maxTotalDuration?: number
  playedAfter?: Date
  playedBefore?: Date
}

/**
 * Represents a Playlist entity including its associated songs.
 */
export type PlaylistWithSongs = InferQueryModel<
  "playlists",
  {
    songs: {
      with: {
        song: true
      }
    }
  }
>

/**
 * Represents a Playlist entity including its statistical data.
 */
export type PlaylistWithStats = InferQueryModel<
  "playlists",
  {
    stats: true
  }
>

/**
 * Represents a Playlist entity including its associated songs and statistical data.
 */
export type PlaylistWithSongsAndStats = InferQueryModel<
  "playlists",
  {
    songs: {
      with: {
        song: true
      }
    }
    stats: true
  }
>

/**
 * Represents a Playlist entity including its main relations (songs).
 */
export type PlaylistWithMainRelations = PlaylistWithSongs

/**
 * Represents a Playlist entity including all possible relations (songs and stats).
 */
export type PlaylistWithAllRelations = PlaylistWithSongsAndStats

/**
 * Represents a Playlist entity with custom specified relations.
 * @template T - A record defining the custom relations to include.
 */
export type PlaylistWithCustomRelations<T extends Record<string, any>> = InferQueryModel<
  "playlists",
  T
>

/**
 * Represents the data required to insert a new Playlist into the database.
 */
export type InsertPlaylist = BaseInsertPlaylist
/**
 * Represents the partial data for updating an existing Playlist in the database.
 */
export type UpdatePlaylist = Partial<InsertPlaylist>

/**
 * Defines the parameters for querying playlists, including ordering and filtering.
 * @template TOrderByColumn - The column by which to order the results.
 * @template TFilters - The filters to apply to the query.
 */
export type QueryPlaylistParams = QueryParams<OrderablePlaylistColumns, PlaylistFilters>
