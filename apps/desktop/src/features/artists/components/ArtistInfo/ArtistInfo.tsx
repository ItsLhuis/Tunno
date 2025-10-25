import { Fragment, useCallback, useMemo, useRef } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchArtistByIdWithAllRelations } from "../../hooks/useFetchArtistByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import { AsyncState, ScrollAreaWithHeaders, VirtualizedList } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { ArtistInfoHeader } from "./ArtistInfoHeader"
import { ArtistInfoStats } from "./ArtistInfoStats"
import { ArtistInfoStickyHeader } from "./ArtistInfoStickyHeader"
import { ArtistInfoSubHeader } from "./ArtistInfoSubHeader"

const ArtistInfo = () => {
  const { id } = useParams({ from: "/artists/$id" })

  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: artistData,
    isLoading: isArtistLoading,
    isError: isArtistError,
    refetch: refetchArtist
  } = useFetchArtistByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!artistData?.songs) return []
    return artistData.songs.map((relation) => relation.songId)
  }, [artistData?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    isError: isSongsError,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const artist = artistData

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const Header = useCallback(() => {
    if (!artist) return null
    return (
      <div>
        <ArtistInfoHeader artist={artist} />
        <ArtistInfoStats artist={artist} />
      </div>
    )
  }, [artist])

  const StickyHeader = useCallback(() => {
    if (!artist) return null
    return (
      <Fragment>
        <ArtistInfoStickyHeader className="pb-6" artist={artist} />
        <ArtistInfoSubHeader />
      </Fragment>
    )
  }, [artist])

  const ListHeader = useCallback(
    () => (
      <div className="px-9 pb-0 pt-6">
        <ArtistInfoSubHeader className="border-b" />
      </div>
    ),
    []
  )

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchArtist(), refetchSongs()])
  }, [refetchArtist, refetchSongs])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <AsyncState data={artist} isLoading={isArtistLoading} isError={isArtistError}>
      <ScrollAreaWithHeaders
        scrollRef={scrollRef}
        HeaderComponent={Header}
        StickyHeaderComponent={StickyHeader}
        ListHeaderComponent={ListHeader}
        className={cn(!songs.length && "h-full", "space-y-6")}
      >
        <AsyncState
          data={songs}
          isLoading={isSongsLoading}
          isError={isSongsError}
          className={cn(!songs.length && "h-full min-h-44")}
        >
          {(data) => (
            <VirtualizedList
              data={data}
              keyExtractor={(song) => song.id.toString()}
              estimateItemHeight={70}
              gap={8}
              scrollRef={scrollRef}
              renderItem={({ item }) => <SongItem song={item} allSongIds={allSongIds} />}
            />
          )}
        </AsyncState>
      </ScrollAreaWithHeaders>
    </AsyncState>
  )
}

export { ArtistInfo }
