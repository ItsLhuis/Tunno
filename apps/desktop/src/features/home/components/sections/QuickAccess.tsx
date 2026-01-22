import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@components/ui"

import { AlbumItemCompact } from "@features/albums/components"
import { ArtistItemCompact } from "@features/artists/components"
import { PlaylistItemCompact } from "@features/playlists/components"

import { type QuickAccess as QuickAccessData, type QuickAccessItem } from "@repo/api"

type QuickAccessProps = {
  quickAccess: QuickAccessData
}

const QuickAccessItemRenderer = ({ item, index }: { item: QuickAccessItem; index: number }) => {
  switch (item.type) {
    case "playlist":
      return <PlaylistItemCompact playlist={item.data} index={index} />
    case "album":
      return <AlbumItemCompact album={item.data} index={index} />
    case "artist":
      return <ArtistItemCompact artist={item.data} index={index} />
  }
}

const QuickAccess = ({ quickAccess }: QuickAccessProps) => {
  if (quickAccess.totalItems === 0) {
    return null
  }

  return (
    <Carousel className="-mx-2">
      <CarouselContent>
        {quickAccess.items.map((item, index) => (
          <CarouselItem key={`quick-access-${item.type}-${item.data.id}`} className="w-80">
            <QuickAccessItemRenderer item={item} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { QuickAccess }
