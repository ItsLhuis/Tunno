import { type Album } from "@repo/api"

export type BaseAlbumItemProps = {
  album: Album
}

export type AlbumItemHeroProps = BaseAlbumItemProps & {
  heroLabel?: string
}

export type AlbumItemCardProps = BaseAlbumItemProps & {
  index?: number
}

export type AlbumItemCompactProps = BaseAlbumItemProps & {
  index?: number
}

export type AlbumItemListProps = BaseAlbumItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
}
