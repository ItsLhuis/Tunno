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

import { type OnRepeat } from "@repo/api"

type OnRepeatProps = {
  onRepeat: OnRepeat
}

const OnRepeat = ({ onRepeat }: OnRepeatProps) => {
  const { t } = useTranslation()

  if (onRepeat.totalSongs === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.onRepeat.title", "On Repeat")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.onRepeat.description")}</Typography>
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
          {onRepeat.songs.map((song, index) => (
            <CarouselItem key={`${song.id}-${index}`} className="w-56 basis-auto">
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

export { OnRepeat }
