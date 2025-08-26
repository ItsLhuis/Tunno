import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { albums } = schema

export type AlbumColumns = keyof typeof albums.$inferSelect

export type Album = typeof albums.$inferSelect

export type AlbumWithRelations = InferQueryModel<
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

export type InsertAlbum = typeof albums.$inferInsert
export type UpdateAlbum = Partial<InsertAlbum>

export type QueryAlbumParams = QueryParams<AlbumColumns>
