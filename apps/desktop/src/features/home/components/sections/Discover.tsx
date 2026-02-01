import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { SongItemCard } from "@features/songs/components"

import { type Discover } from "@repo/api"

type DiscoverProps = {
  discover: Discover
}

const Discover = ({ discover }: DiscoverProps) => {
  const { t } = useTranslation()

  if (discover.totalSongs === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.discover.title", "Discover")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.discover.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {discover.songs.map((song, index) => (
            <CarouselItem key={song.id} className="w-50">
              <SongItemCard song={song} index={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { Discover }
