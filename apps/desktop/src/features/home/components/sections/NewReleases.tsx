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
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.newReleases.title", "New Releases")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.newReleases.description")}</Typography>
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
          {newReleases.albums.map((album, index) => (
            <CarouselItem key={`${album.id}-${index}`} className="w-56 basis-auto">
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
