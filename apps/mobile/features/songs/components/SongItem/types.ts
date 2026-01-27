import { type PlaySource } from "@features/player/types/playSource"

import { type SongWithMainRelations } from "@repo/api"

export type ColumnKey = "checkbox" | "title" | "album" | "date" | "duration"

export type BaseSongItemProps = {
  song: SongWithMainRelations
  playSource?: PlaySource
  sourceContextId?: number
  queueIndex?: number
  playlistId?: number
}

export type SongItemCardProps = BaseSongItemProps & {
  allSongIds?: number[]
}

export type SongItemListProps = BaseSongItemProps & {
  allSongIds?: number[]
  queuePlayback?: boolean
}
