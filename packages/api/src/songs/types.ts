import { schema, type InferQueryModel } from "@repo/database"

import { type QueryParams } from "../types"

const { songs } = schema

export type SongColumns = keyof typeof songs.$inferSelect

export type Song = typeof songs.$inferSelect

export type SongWithRelations = InferQueryModel<
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

export type InsertSong = typeof songs.$inferInsert
export type UpdateSong = Partial<InsertSong>

export type QuerySongsParams = QueryParams<SongColumns>
