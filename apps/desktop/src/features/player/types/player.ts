import { type Track as BaseTrack } from "@track-player/web"

import { type SongWithMainRelations } from "@repo/api"

export type Track = {
  id: number
} & BaseTrack &
  Omit<SongWithMainRelations, "album">
