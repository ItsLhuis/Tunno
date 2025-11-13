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

import { type JumpBackIn } from "@repo/api"

type JumpBackInProps = {
  jumpBackIn: JumpBackIn
}

const JumpBackIn = ({ jumpBackIn }: JumpBackInProps) => {
  const { t } = useTranslation()

  if (jumpBackIn.totalItems === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.jumpBackIn.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.jumpBackIn.description")}</Typography>
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
          {jumpBackIn.items.map((item, index) => (
            <CarouselItem key={`${item.song.id}-${index}`} className="w-56 basis-auto">
              <SongItem song={item.song} variant="card" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { JumpBackIn }
