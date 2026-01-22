import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { AlbumItemCard } from "@features/albums/components"
import { ArtistItemCard } from "@features/artists/components"
import { PlaylistItemCard } from "@features/playlists/components"
import { SongItemCard } from "@features/songs/components"

import { type RecentlyAdded as RecentlyAddedData, type RecentlyAddedItem } from "@repo/api"

type RecentlyAddedProps = {
  recentlyAdded: RecentlyAddedData
}

const RecentlyAddedItemRenderer = ({ item, index }: { item: RecentlyAddedItem; index: number }) => {
  switch (item.type) {
    case "song":
      return <SongItemCard song={item.data} index={index} />
    case "album":
      return <AlbumItemCard album={item.data} index={index} />
    case "artist":
      return <ArtistItemCard artist={item.data} index={index} />
    case "playlist":
      return <PlaylistItemCard playlist={item.data} index={index} />
  }
}

const RecentlyAdded = ({ recentlyAdded }: RecentlyAddedProps) => {
  const { t } = useTranslation()

  if (recentlyAdded.totalItems === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.recentlyAdded.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.recentlyAdded.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {recentlyAdded.items.map((item, index) => (
            <CarouselItem key={`recently-added-${item.type}-${item.data.id}`} className="w-50">
              <RecentlyAddedItemRenderer item={item} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { RecentlyAdded }
