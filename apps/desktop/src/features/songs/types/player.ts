import { type Track as BaseTrack } from "react-track-player-web"

import { type SongWithMainRelations } from "@repo/api"

export type Track = {
  id: number
} & BaseTrack &
  Omit<SongWithMainRelations, "album">
