import { useTranslation } from "@repo/i18n"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Typography
} from "@components/ui"

import { PlaylistItem } from "@/features/playlists/components"

import { type YourPlaylists } from "@repo/api"

type YourPlaylistsProps = {
  yourPlaylists: YourPlaylists
}

const YourPlaylists = ({ yourPlaylists }: YourPlaylistsProps) => {
  const { t } = useTranslation()

  if (yourPlaylists.totalPlaylists === 0) {
    return null
  }

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.yourPlaylists.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.yourPlaylists.description")}</Typography>
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
          <div className="grid auto-cols-max grid-flow-col grid-rows-2 gap-y-1 overflow-x-auto">
            {yourPlaylists.playlists.map((playlist, index) => (
              <CarouselItem key={`${playlist.id}-${index}`} className="w-32 basis-auto">
                <PlaylistItem playlist={playlist} variant="compact" />
              </CarouselItem>
            ))}
          </div>
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { YourPlaylists }
