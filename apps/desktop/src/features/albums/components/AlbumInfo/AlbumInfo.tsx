import { Fragment, useCallback, useMemo, useRef } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchAlbumByIdWithAllRelations } from "../../hooks/useFetchAlbumByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import { AsyncState, ScrollAreaWithHeaders, VirtualizedList } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { AlbumInfoHeader } from "./AlbumInfoHeader"
import { AlbumInfoStats } from "./AlbumInfoStats"
import { AlbumInfoStickyHeader } from "./AlbumInfoStickyHeader"
import { AlbumInfoSubHeader } from "./AlbumInfoSubHeader"

const AlbumInfo = () => {
  const { id } = useParams({ from: "/albums/$id" })

  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: albumData,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    refetch: refetchAlbum
  } = useFetchAlbumByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!albumData?.songs) return []
    return albumData.songs.map((song) => song.id)
  }, [albumData?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    isError: isSongsError,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const album = albumData

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const Header = useCallback(() => {
    if (!album) return null
    return (
      <div>
        <AlbumInfoHeader album={album} />
        <AlbumInfoStats album={album} />
      </div>
    )
  }, [album])

  const StickyHeader = useCallback(() => {
    if (!album) return null
    return (
      <Fragment>
        <AlbumInfoStickyHeader className="pb-6" album={album} />
        <AlbumInfoSubHeader />
      </Fragment>
    )
  }, [album])

  const ListHeader = useCallback(
    () => (
      <div className="px-9 pb-0 pt-6">
        <AlbumInfoSubHeader className="border-b" />
      </div>
    ),
    []
  )

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchAlbum(), refetchSongs()])
  }, [refetchAlbum, refetchSongs])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <AsyncState data={album} isLoading={isAlbumLoading} isError={isAlbumError}>
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

export { AlbumInfo }
