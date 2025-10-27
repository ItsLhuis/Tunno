import { useCallback } from "react"

import { useParams } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useFetchSongByIdWithAllRelations } from "../../hooks/useFetchSongByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { formatTime } from "@repo/utils"

import {
  AsyncState,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ScrollAreaWithHeaders,
  Typography
} from "@components/ui"

import { AlbumItem } from "@features/albums/components/AlbumItem"
import { ArtistItem } from "@features/artists/components/ArtistItem"
import { PlaylistItem } from "@features/playlists/components/PlaylistItem"

import { SongItem } from "../SongItem"
import { SongInfoHeader } from "./SongInfoHeader"
import { SongInfoStats } from "./SongInfoStats"
import { SongInfoStickyHeader } from "./SongInfoStickyHeader"
import { SongInfoSubHeader } from "./SongInfoSubHeader"

const SongInfo = () => {
  const { id } = useParams({ from: "/songs/$id" })

  const { t } = useTranslation()

  const {
    data: song,
    isLoading: isSongLoading,
    isError: isSongError,
    refetch
  } = useFetchSongByIdWithAllRelations(Number(id))

  const Header = useCallback(() => {
    if (!song) return null
    return (
      <div>
        <SongInfoHeader song={song} />
        <SongInfoStats song={song} />
      </div>
    )
  }, [song])

  const StickyHeader = useCallback(() => {
    if (!song) return null
    return <SongInfoStickyHeader song={song} />
  }, [song])

  const ListHeader = useCallback(
    () => (
      <div className="px-9 pb-0 pt-6">
        <SongInfoSubHeader className="border-b" />
      </div>
    ),
    []
  )

  const handleRefresh = useCallback(async () => {
    await refetch()
  }, [refetch])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <AsyncState data={song} isLoading={isSongLoading} isError={isSongError}>
      {(data) => (
        <ScrollAreaWithHeaders
          HeaderComponent={Header}
          StickyHeaderComponent={StickyHeader}
          ListHeaderComponent={ListHeader}
          className="space-y-6"
        >
          <SongItem song={data} allSongIds={[data.id]} />
          {data.album && (
            <section className="-mx-2 flex w-full flex-col gap-3">
              <Typography variant="h3" className="mx-2">
                {t("common.album")}
              </Typography>
              <div className="w-56">
                <AlbumItem album={data.album} variant="card" />
              </div>
            </section>
          )}
          {data.artists.length > 0 && (
            <section className="flex w-full flex-col gap-3 pt-3">
              <Typography variant="h3">{t("artists.title")}</Typography>
              <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                  skipSnaps: true
                }}
                className="-mx-9"
              >
                <CarouselContent containerClassName="px-9">
                  {data.artists.map((artist, index) => (
                    <CarouselItem key={artist.artist.id || index} className="w-56 basis-auto">
                      <ArtistItem artist={artist.artist} variant="card" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-20" />
                <CarouselNext className="mr-20" />
              </Carousel>
            </section>
          )}
          {data.playlists.length > 0 && (
            <section className="flex w-full flex-col gap-3 pt-3">
              <Typography variant="h3">{t("playlists.title")}</Typography>
              <Carousel
                opts={{
                  align: "start",
                  dragFree: true,
                  skipSnaps: true
                }}
                className="-mx-9"
              >
                <CarouselContent containerClassName="px-9">
                  {data.playlists.map((playlist, index) => (
                    <CarouselItem key={playlist.playlist.id || index} className="w-56 basis-auto">
                      <PlaylistItem playlist={playlist.playlist} variant="card" />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-20" />
                <CarouselNext className="mr-20" />
              </Carousel>
            </section>
          )}
          {data.lyrics && Array.isArray(data.lyrics) && data.lyrics.length > 0 && (
            <section className="flex w-full flex-col gap-3 pt-3">
              <Typography variant="h3">{t("form.labels.lyrics")}</Typography>
              <div className="w-full space-y-2">
                {data.lyrics.map((line, index) => (
                  <div key={index} className="flex w-full gap-2">
                    <Typography affects="muted" className="shrink-0">
                      [{formatTime(line.startTime)}]
                    </Typography>
                    <Typography className="shrink-0">-</Typography>
                    <Typography className="overflow-wrap-anywhere min-w-0 flex-1 break-all">
                      {line.text || "..."}
                    </Typography>
                  </div>
                ))}
              </div>
            </section>
          )}
        </ScrollAreaWithHeaders>
      )}
    </AsyncState>
  )
}

export { SongInfo }
