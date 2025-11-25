import {
  type Album as BaseAlbum,
  type InsertAlbum as BaseInsertAlbum,
  type InferQueryModel
} from "@repo/database"

import { type QueryParams } from "../types"

export type AlbumColumns = keyof BaseAlbum

export type Album = BaseAlbum

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

export type AlbumWithSongs = InferQueryModel<
  "albums",
  {
    songs: true
  }
>

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

export type AlbumWithStats = InferQueryModel<
  "albums",
  {
    stats: true
  }
>

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

export type AlbumWithMainRelations = AlbumWithSongsAndArtists

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

export type AlbumWithCustomRelations<T extends Record<string, any>> = InferQueryModel<"albums", T>

export type InsertAlbum = BaseInsertAlbum
export type UpdateAlbum = Partial<InsertAlbum>

export type QueryAlbumParams = QueryParams<OrderableAlbumColumns, AlbumFilters>
