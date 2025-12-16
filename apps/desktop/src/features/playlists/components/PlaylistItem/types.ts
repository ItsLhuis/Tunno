import { type Playlist } from "@repo/api"

export type ColumnKey = "checkbox" | "title" | "playCount" | "lastPlayed" | "date"

export type BasePlaylistItemProps = {
  playlist: Playlist
}

export type PlaylistItemHeroProps = BasePlaylistItemProps & {
  heroLabel?: string
}

export type PlaylistItemCardProps = BasePlaylistItemProps

export type PlaylistItemCompactProps = BasePlaylistItemProps

export type PlaylistItemSelectProps = BasePlaylistItemProps & {
  selected?: boolean
  onToggle?: () => void
}

export type PlaylistItemListProps = BasePlaylistItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
  visibleColumns?: ColumnKey[]
}
