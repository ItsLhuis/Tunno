import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { AlbumItemCard, AlbumItemHero } from "@features/albums/components"

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
        <Typography variant="h1">{t("home.topAlbums.title", "Top Albums")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.topAlbums.description")}</Typography>
      </div>
      {topAlbums.albums.slice(0, 1).map((album, index) => (
        <AlbumItemHero key={`${album.id}-${index}`} album={album} />
      ))}
      <Carousel className="-mx-2">
        <CarouselContent>
          {topAlbums.albums.slice(1).map((album, index) => (
            <CarouselItem
              key={`${album.id}-${index}`}
              className="basis-auto"
              style={{
                width: "clamp(11rem, 11vw, 18rem)"
              }}
            >
              <AlbumItemCard album={album} />
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
