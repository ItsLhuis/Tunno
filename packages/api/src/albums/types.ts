import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { albums } = schema

export type AlbumColumns = keyof typeof albums.$inferSelect

export type Album = typeof albums.$inferSelect

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

export type InsertAlbum = typeof albums.$inferInsert
export type UpdateAlbum = Partial<InsertAlbum>

export type QueryAlbumParams = QueryParams<AlbumColumns>
