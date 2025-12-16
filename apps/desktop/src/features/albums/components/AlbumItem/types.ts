import { type Album } from "@repo/api"

export type ColumnKey = "checkbox" | "title" | "playCount" | "lastPlayed" | "date"

export type BaseAlbumItemProps = {
  album: Album
}

export type AlbumItemHeroProps = BaseAlbumItemProps & {
  heroLabel?: string
}

export type AlbumItemCardProps = BaseAlbumItemProps

export type AlbumItemListProps = BaseAlbumItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
  visibleColumns?: ColumnKey[]
}
