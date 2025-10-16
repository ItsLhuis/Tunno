import { useCallback, useMemo } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchAlbumByIdWithAllRelations } from "../../hooks/useFetchAlbumByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { AlbumInfoHeader } from "./AlbumInfoHeader"
import { AlbumInfoStats } from "./AlbumInfoStats"
import { AlbumInfoStickyHeader } from "./AlbumInfoStickyHeader"
import { AlbumInfoSubHeader } from "./AlbumInfoSubHeader"

const AlbumInfo = () => {
  const { id } = useParams({ from: "/albums/$id" })

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

  const isLoading = isAlbumLoading || isSongsLoading
  const isError = isAlbumError || isSongsError

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
    return <AlbumInfoStickyHeader album={album} />
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
    <AsyncState data isLoading={isLoading} isError={isError}>
      {() => (
        <ScrollAreaWithHeaders
          HeaderComponent={Header}
          StickyHeaderComponent={StickyHeader}
          ListHeaderComponent={ListHeader}
          className="flex w-full flex-1 flex-col gap-9"
        >
          {songs.length > 0 && (
            <section className="flex w-full flex-col gap-3">
              <div className="flex flex-col gap-1">
                {songs.map((song) => (
                  <SongItem key={song.id} song={song} allSongIds={allSongIds} />
                ))}
              </div>
            </section>
          )}
        </ScrollAreaWithHeaders>
      )}
    </AsyncState>
  )
}

export { AlbumInfo }
