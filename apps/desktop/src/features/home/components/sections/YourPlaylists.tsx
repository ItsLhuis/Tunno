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

  const organizedPlaylists: Array<
    [(typeof yourPlaylists.playlists)[0], (typeof yourPlaylists.playlists)[0] | null]
  > = []

  for (let i = 0; i < yourPlaylists.playlists.length; i += 2) {
    organizedPlaylists.push([yourPlaylists.playlists[i], yourPlaylists.playlists[i + 1] || null])
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
        className="-mx-8"
      >
        <CarouselContent containerClassName="px-9">
          {organizedPlaylists.map((pair, columnIndex) => (
            <CarouselItem key={`column-${columnIndex}`} className="basis-auto pl-0">
              <div className="flex w-32 flex-col">
                <PlaylistItem playlist={pair[0]} variant="compact" />
                {pair[1] && <PlaylistItem playlist={pair[1]} variant="compact" />}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-20" />
        <CarouselNext className="mr-20" />
      </Carousel>
    </section>
  )
}

export { YourPlaylists }
