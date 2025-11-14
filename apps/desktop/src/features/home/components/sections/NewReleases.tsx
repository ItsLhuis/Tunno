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

import { type NewReleases } from "@repo/api"

type NewReleasesProps = {
  newReleases: NewReleases
}

const NewReleases = ({ newReleases }: NewReleasesProps) => {
  const { t } = useTranslation()

  if (newReleases.totalAlbums === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="mb-2 flex flex-col gap-1">
        <Typography variant="h3">{t("home.newReleases.title", "New Releases")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.newReleases.description")}</Typography>
      </div>
      {newReleases.albums.slice(0, 1).map((album, index) => (
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
          {newReleases.albums.slice(1).map((album, index) => (
            <CarouselItem
              key={`${album.id}-${index}`}
              className="basis-auto"
              style={{
                width: "clamp(11rem, 11vw, 18rem)"
              }}
            >
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

export { NewReleases }
