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
      <div className="mb-2 flex flex-col gap-1">
        <Typography variant="h1">
          {t("home.favoriteArtists.title", "Your Favorite Artists")}
        </Typography>
        <Typography affects={["muted", "small"]}>
          {t("home.favoriteArtists.description")}
        </Typography>
      </div>
      {favoriteArtists.artists.slice(0, 1).map((artist, index) => (
        <ArtistItem key={`${artist.id}-${index}`} artist={artist} variant="hero" />
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
          {favoriteArtists.artists.slice(1).map((artist, index) => (
            <CarouselItem
              key={`${artist.id}-${index}`}
              className="basis-auto"
              style={{
                width: "clamp(11rem, 11vw, 18rem)"
              }}
            >
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
