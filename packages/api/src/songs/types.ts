import {
  type Song as BaseSong,
  type InsertSong as BaseInsertSong,
  type InferQueryModel,
  schema
} from "@repo/database"

import { type QueryParams } from "../types"

export type SongColumns = keyof BaseSong

export type Song = BaseSong

export type SongReleaseYear = BaseSong["releaseYear"]

export type OrderableSongColumns =
  | "name"
  | "duration"
  | "isFavorite"
  | "releaseYear"
  | "playCount"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

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

export type SongWithAlbum = InferQueryModel<
  "songs",
  {
    album: true
  }
>

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

export type SongWithStats = InferQueryModel<
  "songs",
  {
    stats: true
  }
>

export type SongWithPlayHistory = InferQueryModel<
  "songs",
  {
    playHistory: true
  }
>

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

export type SongWithMainRelations = SongWithAlbumAndArtists

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

export type PlayHistory = typeof schema.playHistory.$inferSelect

export type SongWithCustomRelations<T extends Record<string, any>> = InferQueryModel<"songs", T>

export type InsertSong = BaseInsertSong
export type UpdateSong = Partial<InsertSong>

export type QuerySongsParams = QueryParams<OrderableSongColumns, SongFilters>
