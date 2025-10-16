import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { ArtistItem } from "@features/artists/components"

import { type FavoriteArtists } from "@repo/api"

type FavoriteArtistsProps = {
  favoriteArtists: FavoriteArtists
}

const FavoriteArtists = ({ favoriteArtists }: FavoriteArtistsProps) => {
  const { t } = useTranslation()

  if (favoriteArtists.totalArtists === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">
          {t("home.favoriteArtists.title", "Your Favorite Artists")}
        </Typography>
        <Typography affects={["muted", "small"]}>
          {t("home.favoriteArtists.description")}
        </Typography>
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
          {favoriteArtists.artists.map((artist, index) => (
            <CarouselItem key={`${artist.id}-${index}`} className="w-56 basis-auto">
              <ArtistItem artist={artist} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { FavoriteArtists }
