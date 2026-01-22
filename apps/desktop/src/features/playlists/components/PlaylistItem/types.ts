import { type Playlist } from "@repo/api"

export type BasePlaylistItemProps = {
  playlist: Playlist
}

export type PlaylistItemHeroProps = BasePlaylistItemProps & {
  heroLabel?: string
}

export type PlaylistItemCardProps = BasePlaylistItemProps & {
  index?: number
}

export type PlaylistItemCompactProps = BasePlaylistItemProps & {
  index?: number
}

export type PlaylistItemSelectProps = BasePlaylistItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
}

export type PlaylistItemListProps = BasePlaylistItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
}
