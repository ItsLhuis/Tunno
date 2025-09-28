import { useCallback, useMemo } from "react"

import { useParams } from "@tanstack/react-router"

import { useTranslation } from "@repo/i18n"

import { useFetchSongByIdWithAllRelations } from "../../hooks/useFetchSongByIdWithAllRelations"

import { NotFound, ScrollAreaWithHeaders, Spinner, Typography } from "@components/ui"

import { ArtistItem } from "@features/artists/components/ArtistItem"

import { SongItem } from "../SongItem"
import { SongInfoHeader } from "./SongInfoHeader"
import { SongInfoStats } from "./SongInfoStats"
import { SongInfoStickyHeader } from "./SongInfoStickyHeader"
import { SongInfoSubHeader } from "./SongInfoSubHeader"

const SongInfo = () => {
  const { id } = useParams({ from: "/songs/$id" })

  const { t } = useTranslation()

  const { data, isLoading, isError } = useFetchSongByIdWithAllRelations(Number(id))

  const song = useMemo(() => {
    if (!data) return null
    return data
  }, [data])

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

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (isError || !song) {
    return <NotFound />
  }

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      className="flex w-full flex-col gap-9"
    >
      <SongItem song={song} allSongIds={[song.id]} />
      {song.artists.length > 0 && (
        <section className="flex w-full flex-col gap-3">
          <Typography variant="h3">{t("artists.title")}</Typography>
          {song.artists.map((artist) => (
            <ArtistItem artist={artist.artist} />
          ))}
        </section>
      )}
    </ScrollAreaWithHeaders>
  )
}

export { SongInfo }
