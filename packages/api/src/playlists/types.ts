import {
  type Playlist as BasePlaylist,
  type InsertPlaylist as BaseInsertPlaylist,
  type InferQueryModel
} from "@repo/database"

import { type QueryParams } from "../types"

export type PlaylistColumns = keyof BasePlaylist

export type Playlist = BasePlaylist

export type OrderablePlaylistColumns =
  | "name"
  | "playCount"
  | "isFavorite"
  | "totalTracks"
  | "totalDuration"
  | "lastPlayedAt"
  | "createdAt"
  | "updatedAt"

export type PlaylistFilters = {
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

export type PlaylistWithSongs = InferQueryModel<
  "playlists",
  {
    songs: {
      with: {
        song: true
      }
    }
  }
>

export type PlaylistWithStats = InferQueryModel<
  "playlists",
  {
    stats: true
  }
>

export type PlaylistWithSongsAndStats = InferQueryModel<
  "playlists",
  {
    songs: {
      with: {
        song: true
      }
    }
    stats: true
  }
>

export type PlaylistWithMainRelations = PlaylistWithSongs

export type PlaylistWithAllRelations = PlaylistWithSongsAndStats

export type PlaylistWithCustomRelations<T extends Record<string, any>> = InferQueryModel<
  "playlists",
  T
>

export type InsertPlaylist = BaseInsertPlaylist
export type UpdatePlaylist = Partial<InsertPlaylist>

export type QueryPlaylistParams = QueryParams<OrderablePlaylistColumns, PlaylistFilters>
