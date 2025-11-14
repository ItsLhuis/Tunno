import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { SongItem } from "@features/songs/components"

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
        <Typography variant="h3">{t("home.hiddenGems.title", "Hidden Gems")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.hiddenGems.description")}</Typography>
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
          skipSnaps: true
        }}
        className="-mx-11"
      >
        <CarouselContent containerClassName="px-9">
          {hiddenGems.songs.map((song, index) => (
            <CarouselItem
              key={`${song.id}-${index}`}
              className="basis-auto"
              style={{
                width: "clamp(11rem, 11vw, 18rem)"
              }}
            >
              <SongItem song={song} variant="card" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { HiddenGems }
