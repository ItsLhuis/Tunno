import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { AlbumItem } from "@features/albums/components"
import { ArtistItem } from "@features/artists/components"
import { PlaylistItem } from "@features/playlists/components"
import { SongItem } from "@features/songs/components"

import { type RecentlyAdded, type RecentlyAddedItem } from "@repo/api"

type RecentlyAddedProps = {
  recentlyAdded: RecentlyAdded
}

const renderRecentlyAddedItem = (item: RecentlyAddedItem) => {
  switch (item.type) {
    case "song":
      return <SongItem song={item.data} variant="card" />
    case "album":
      return <AlbumItem album={item.data} variant="card" />
    case "playlist":
      return <PlaylistItem playlist={item.data} variant="card" />
    case "artist":
      return <ArtistItem artist={item.data} variant="card" />
    default:
      return null
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
        <Typography variant="h3">{t("home.recentlyAdded.title", "Recently Added")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.recentlyAdded.description")}</Typography>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: true
        }}
        className="-mx-9"
      >
        <CarouselContent containerClassName="px-9">
          {recentlyAdded.items.map((item, index) => (
            <CarouselItem key={`${item.type}-${item.data.id}-${index}`} className="w-56 basis-auto">
              {renderRecentlyAddedItem(item)}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { RecentlyAdded }
