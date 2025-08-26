import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { artists } = schema

export type ArtistColumns = keyof typeof artists.$inferSelect

export type Artist = typeof artists.$inferSelect

export type ArtistWithRelations = InferQueryModel<
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

export type InsertArtist = typeof artists.$inferInsert
export type UpdateArtist = Partial<InsertArtist>

export type QueryArtistParams = QueryParams<ArtistColumns>
