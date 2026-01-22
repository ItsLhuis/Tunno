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

import { type TopAlbums as TopAlbumsData } from "@repo/api"

type TopAlbumsProps = {
  topAlbums: TopAlbumsData
}

const TopAlbums = ({ topAlbums }: TopAlbumsProps) => {
  const { t } = useTranslation()

  if (topAlbums.totalAlbums === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.topAlbums.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.topAlbums.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {topAlbums.albums.map((album, index) => (
            <CarouselItem key={`${album.id}-${index}`} className="w-50">
              <AlbumItemCard album={album} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { TopAlbums }
