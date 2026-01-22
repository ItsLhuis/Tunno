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

import { type NewReleases } from "@repo/api"

type NewReleasesProps = {
  newReleases: NewReleases
}

const NewReleases = ({ newReleases }: NewReleasesProps) => {
  const { t } = useTranslation()

  const albums = newReleases.albums.slice(1)

  if (albums.length === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.newReleases.title", "New Releases")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.newReleases.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {albums.map((album, index) => (
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

export { NewReleases }
