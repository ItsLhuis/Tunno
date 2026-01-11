import {
  type Album as BaseAlbum,
  type InsertAlbum as BaseInsertAlbum,
  type InferQueryModel
} from "@repo/database"

import { type QueryParams } from "../types"

/**
 * Represents the available column names for the Album entity.
 */
export type AlbumColumns = keyof BaseAlbum

/**
 * Represents the base Album entity without relations, directly from the database schema.
 */
export type Album = BaseAlbum

/**
 * Defines the columns by which a list of albums can be ordered.
 */
export type OrderableAlbumColumns =
  | "name"
  | "releaseYear"
  | "playCount"
  | "isFavorite"
  | "albumType"
  | "totalTracks"
  | "totalDuration"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

/**
 * Defines the filterable properties for querying albums.
 */
export type AlbumFilters = {
  search?: string
  releaseYear?: number | number[]
  isFavorite?: boolean
  albumType?: "single" | "album" | "compilation" | ("single" | "album" | "compilation")[]
  minTotalTracks?: number
  maxTotalTracks?: number
  minTotalDuration?: number
  maxTotalDuration?: number
  minPlayCount?: number
  maxPlayCount?: number
  playedAfter?: Date
  playedBefore?: Date
}

/**
 * Represents an Album entity including its associated songs.
 */
export type AlbumWithSongs = InferQueryModel<
  "albums",
  {
    songs: true
  }
>

/**
 * Represents an Album entity including its associated artists.
 */
export type AlbumWithArtists = InferQueryModel<
  "albums",
  {
    artists: {
      with: {
        artist: true
      }
    }
  }
>

/**
 * Represents an Album entity including its statistical data.
 */
export type AlbumWithStats = InferQueryModel<
  "albums",
  {
    stats: true
  }
>

/**
 * Represents an Album entity including its associated songs and artists.
 */
export type AlbumWithSongsAndArtists = InferQueryModel<
  "albums",
  {
    songs: true
    artists: {
      with: {
        artist: true
      }
    }
  }
>

/**
 * Represents an Album entity including its main relations (songs and artists).
 */
export type AlbumWithMainRelations = AlbumWithSongsAndArtists

/**
 * Represents an Album entity including all possible relations (songs, artists, and stats).
 */
export type AlbumWithAllRelations = InferQueryModel<
  "albums",
  {
    songs: true
    artists: {
      with: {
        artist: true
      }
    }
    stats: true
  }
>

/**
 * Represents an Album entity with custom specified relations.
 * @template T - A record defining the custom relations to include.
 */
export type AlbumWithCustomRelations<T extends Record<string, any>> = InferQueryModel<"albums", T>

/**
 * Represents the data required to insert a new Album into the database.
 */
export type InsertAlbum = BaseInsertAlbum
/**
 * Represents the partial data for updating an existing Album in the database.
 */
export type UpdateAlbum = Partial<InsertAlbum>

/**
 * Defines the parameters for querying albums, including ordering and filtering.
 * @template TOrderByColumn - The column by which to order the results.
 * @template TFilters - The filters to apply to the query.
 */
export type QueryAlbumParams = QueryParams<OrderableAlbumColumns, AlbumFilters>
