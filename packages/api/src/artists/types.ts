import {
  type Artist as BaseArtist,
  type InsertArtist as BaseInsertArtist,
  type InferQueryModel
} from "@repo/database"

import { type QueryParams } from "../types"

/**
 * Represents the available column names for the Artist entity.
 */
export type ArtistColumns = keyof BaseArtist

/**
 * Represents the base Artist entity without relations, directly from the database schema.
 */
export type Artist = BaseArtist

/**
 * Defines the columns by which a list of artists can be ordered.
 */
export type OrderableArtistColumns =
  | "name"
  | "playCount"
  | "isFavorite"
  | "totalTracks"
  | "totalDuration"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

/**
 * Defines the filterable properties for querying artists.
 */
export type ArtistFilters = {
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
 * Represents an Artist entity including their associated songs.
 */
export type ArtistWithSongs = InferQueryModel<
  "artists",
  {
    songs: {
      with: {
        song: true
      }
    }
  }
>

/**
 * Represents an Artist entity including their associated albums.
 */
export type ArtistWithAlbums = InferQueryModel<
  "artists",
  {
    albums: {
      with: {
        album: true
      }
    }
  }
>

/**
 * Represents an Artist entity including their statistical data.
 */
export type ArtistWithStats = InferQueryModel<
  "artists",
  {
    stats: true
  }
>

/**
 * Represents an Artist entity including their associated songs and albums.
 */
export type ArtistWithSongsAndAlbums = InferQueryModel<
  "artists",
  {
    songs: {
      with: {
        song: true
      }
    }
    albums: {
      with: {
        album: true
      }
    }
  }
>

/**
 * Represents an Artist entity including their main relations (songs and albums).
 */
export type ArtistWithMainRelations = ArtistWithSongsAndAlbums

/**
 * Represents an Artist entity including all possible relations (songs, albums, and stats).
 */
export type ArtistWithAllRelations = InferQueryModel<
  "artists",
  {
    songs: {
      with: {
        song: true
      }
    }
    albums: {
      with: {
        album: true
      }
    }
    stats: true
  }
>

/**
 * Represents an Artist entity with custom specified relations.
 * @template T - A record defining the custom relations to include.
 */
export type ArtistWithCustomRelations<T extends Record<string, unknown>> = InferQueryModel<
  "artists",
  T
>

/**
 * Represents the data required to insert a new Artist into the database.
 */
export type InsertArtist = BaseInsertArtist
/**
 * Represents the partial data for updating an existing Artist in the database.
 */
export type UpdateArtist = Partial<InsertArtist>

/**
 * Defines the parameters for querying artists, including ordering and filtering.
 * @template TOrderByColumn - The column by which to order the results.
 * @template TFilters - The filters to apply to the query.
 */
export type QueryArtistParams = QueryParams<OrderableArtistColumns, ArtistFilters>
