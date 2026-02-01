import {
  type InsertSong as BaseInsertSong,
  type Song as BaseSong,
  type InferQueryModel,
  schema
} from "@repo/database"

import { type QueryParams } from "../types"

/**
 * Represents the available column names for the Song entity.
 */
export type SongColumns = keyof BaseSong

/**
 * Represents the base Song entity without relations, directly from the database schema.
 */
export type Song = BaseSong

/**
 * Represents the release year of a song.
 */
export type SongReleaseYear = BaseSong["releaseYear"]

/**
 * Defines the columns by which a list of songs can be ordered.
 */
export type OrderableSongColumns =
  | "name"
  | "duration"
  | "isFavorite"
  | "releaseYear"
  | "playCount"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

/**
 * Defines the filterable properties for querying songs.
 */
export type SongFilters = {
  search?: string
  isFavorite?: boolean
  releaseYear?: SongReleaseYear | SongReleaseYear[]
  albumId?: number | number[]
  hasLyrics?: boolean
  minDuration?: number
  maxDuration?: number
  minPlayCount?: number
  maxPlayCount?: number
  playedAfter?: Date
  playedBefore?: Date
}

/**
 * Represents a Song entity including its associated album.
 */
export type SongWithAlbum = InferQueryModel<
  "songs",
  {
    album: true
  }
>

/**
 * Represents a Song entity including its associated artists.
 */
export type SongWithArtists = InferQueryModel<
  "songs",
  {
    artists: {
      with: {
        artist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its associated playlists.
 */
export type SongWithPlaylists = InferQueryModel<
  "songs",
  {
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its statistical data.
 */
export type SongWithStats = InferQueryModel<
  "songs",
  {
    stats: true
  }
>

/**
 * Represents a Song entity including its play history.
 */
export type SongWithPlayHistory = InferQueryModel<
  "songs",
  {
    playHistory: true
  }
>

/**
 * Represents a Song entity including its associated album and artists.
 */
export type SongWithAlbumAndArtists = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its associated album and playlists.
 */
export type SongWithAlbumAndPlaylists = InferQueryModel<
  "songs",
  {
    album: true
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its associated artists and playlists.
 */
export type SongWithArtistsAndPlaylists = InferQueryModel<
  "songs",
  {
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its associated album, artists, and playlists.
 */
export type SongWithAlbumAndArtistsAndPlaylists = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
  }
>

/**
 * Represents a Song entity including its main relations (album and artists).
 */
export type SongWithMainRelations = SongWithAlbumAndArtists

/**
 * Represents a Song entity including all possible relations (album, artists, playlists, stats, and play history).
 */
export type SongWithAllRelations = InferQueryModel<
  "songs",
  {
    album: true
    artists: {
      with: {
        artist: true
      }
    }
    playlists: {
      with: {
        playlist: true
      }
    }
    stats: true
    playHistory: true
  }
>

/**
 * Represents the structure of a play history entry from the database schema.
 */
export type PlayHistory = typeof schema.playHistory.$inferSelect

/**
 * Represents a Song entity with custom specified relations.
 * @template T - A record defining the custom relations to include.
 */
export type SongWithCustomRelations<T extends Record<string, unknown>> = InferQueryModel<"songs", T>

/**
 * Represents the data required to insert a new Song into the database.
 */
export type InsertSong = BaseInsertSong
/**
 * Represents the partial data for updating an existing Song in the database.
 */
export type UpdateSong = Partial<InsertSong>

/**
 * Defines the parameters for querying songs, including ordering and filtering.
 * @template TOrderByColumn - The column by which to order the results.
 * @template TFilters - The filters to apply to the query.
 */
export type QuerySongsParams = QueryParams<OrderableSongColumns, SongFilters>
