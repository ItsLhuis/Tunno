import { type Track as BaseTrack } from "react-native-track-player"

import { type SongWithMainRelations } from "@repo/api"

export type Track = {
  id: number
} & BaseTrack &
  Omit<SongWithMainRelations, "album">
