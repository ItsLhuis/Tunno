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

import { type HiddenGems } from "@repo/api"

type HiddenGemsProps = {
  hiddenGems: HiddenGems
}

const HiddenGems = ({ hiddenGems }: HiddenGemsProps) => {
  const { t } = useTranslation()

  if (hiddenGems.totalSongs === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h1">{t("home.hiddenGems.title", "Hidden Gems")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.hiddenGems.description")}</Typography>
      </div>
      <Carousel className="-mx-2">
        <CarouselContent>
          {hiddenGems.songs.map((song, index) => (
            <CarouselItem key={`${song.id}-${index}`} className="w-50">
              <SongItemCard song={song} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export { HiddenGems }
