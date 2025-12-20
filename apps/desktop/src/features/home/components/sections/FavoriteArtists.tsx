import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { ArtistItemCard, ArtistItemHero } from "@features/artists/components"

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
        <ArtistItemHero key={`${artist.id}-${index}`} artist={artist} />
      ))}
      <Carousel className="-mx-2">
        <CarouselContent>
          {favoriteArtists.artists.slice(1).map((artist, index) => (
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
