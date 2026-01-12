import { type Playlist } from "@repo/api"

export type BasePlaylistItemProps = {
  playlist: Playlist
}

export type PlaylistItemCardProps = BasePlaylistItemProps

export type PlaylistItemCompactProps = BasePlaylistItemProps

export type PlaylistItemListProps = BasePlaylistItemProps
