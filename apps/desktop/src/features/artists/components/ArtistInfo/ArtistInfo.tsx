import { useCallback, useMemo } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchArtistByIdWithAllRelations } from "../../hooks/useFetchArtistByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { AsyncState, ScrollAreaWithHeaders } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { ArtistInfoHeader } from "./ArtistInfoHeader"
import { ArtistInfoStats } from "./ArtistInfoStats"
import { ArtistInfoStickyHeader } from "./ArtistInfoStickyHeader"
import { ArtistInfoSubHeader } from "./ArtistInfoSubHeader"

const ArtistInfo = () => {
  const { id } = useParams({ from: "/artists/$id" })

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

  const isLoading = isArtistLoading || isSongsLoading
  const isError = isArtistError || isSongsError

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
    return <ArtistInfoStickyHeader artist={artist} />
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

export { ArtistInfo }
