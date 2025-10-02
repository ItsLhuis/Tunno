import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { artists } = schema

export type ArtistColumns = keyof typeof artists.$inferSelect

export type Artist = typeof artists.$inferSelect

export type OrderableArtistColumns =
  | "name"
  | "playCount"
  | "isFavorite"
  | "totalTracks"
  | "totalDuration"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

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

export type ArtistWithStats = InferQueryModel<
  "artists",
  {
    stats: true
  }
>

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

export type ArtistWithMainRelations = ArtistWithSongsAndAlbums

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

export type ArtistWithCustomRelations<T extends Record<string, any>> = InferQueryModel<"artists", T>

export type InsertArtist = typeof artists.$inferInsert
export type UpdateArtist = Partial<InsertArtist>

export type QueryArtistParams = QueryParams<OrderableArtistColumns, ArtistFilters>
