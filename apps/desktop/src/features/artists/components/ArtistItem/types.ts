import { type Artist } from "@repo/api"

export type BaseArtistItemProps = {
  artist: Artist
}

export type ArtistItemHeroProps = BaseArtistItemProps & {
  heroLabel?: string
}

export type ArtistItemCardProps = BaseArtistItemProps

export type ArtistItemListProps = BaseArtistItemProps & {
  index?: number
  selected?: boolean
  onToggle?: () => void
}
