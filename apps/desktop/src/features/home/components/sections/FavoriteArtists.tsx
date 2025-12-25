import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { ArtistItemCard } from "@features/artists/components"

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
        <Typography variant="h1">
          {t("home.favoriteArtists.title", "Your Favorite Artists")}
        </Typography>
        <Typography affects={["muted", "small"]}>
          {t("home.favoriteArtists.description")}
        </Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {favoriteArtists.artists.map((artist, index) => (
            <CarouselItem key={`${artist.id}-${index}`} className="w-50">
              <ArtistItemCard artist={artist} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { FavoriteArtists }
