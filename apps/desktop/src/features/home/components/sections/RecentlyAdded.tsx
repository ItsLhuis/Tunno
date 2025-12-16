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

import { type RecentlyAdded, type RecentlyAddedItem } from "@repo/api"

type RecentlyAddedProps = {
  recentlyAdded: RecentlyAdded
}

function renderRecentlyAddedItem(item: RecentlyAddedItem) {
  switch (item.type) {
    case "song":
      return <SongItemCard song={item.data} />
    case "album":
      return <AlbumItemCard album={item.data} />
    case "playlist":
      return <PlaylistItemCard playlist={item.data} />
    case "artist":
      return <ArtistItemCard artist={item.data} />
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
        <Typography variant="h1">{t("home.recentlyAdded.title", "Recently Added")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.recentlyAdded.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {recentlyAdded.items.map((item, index) => (
            <CarouselItem
              key={`${item.type}-${item.data.id}-${index}`}
              className="basis-auto"
              style={{
                width: "max(11rem, 11vw)"
              }}
            >
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
