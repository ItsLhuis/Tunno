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

import { type TopAlbums } from "@repo/api"

type TopAlbumsProps = {
  topAlbums: TopAlbums
}

const TopAlbums = ({ topAlbums }: TopAlbumsProps) => {
  const { t } = useTranslation()

  if (topAlbums.totalAlbums === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="mb-2 flex flex-col gap-1">
        <Typography variant="h3">{t("home.topAlbums.title", "Top Albums")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.topAlbums.description")}</Typography>
      </div>
      {topAlbums.albums.slice(0, 1).map((album, index) => (
        <AlbumItem key={`${album.id}-${index}`} album={album} variant="hero" />
      ))}
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: true
        }}
        className="-mx-11"
      >
        <CarouselContent containerClassName="px-9">
          {topAlbums.albums.slice(1).map((album, index) => (
            <CarouselItem key={`${album.id}-${index}`} className="w-40 basis-auto">
              <AlbumItem album={album} variant="card" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { TopAlbums }
