import { useCallback, useMemo, useRef } from "react"

import { useParams } from "@tanstack/react-router"

import { useFetchSongsByIdsWithMainRelations } from "../../../songs/hooks/useFetchSongsByIdsWithMainRelations"

import { useFetchPlaylistByIdWithAllRelations } from "../../hooks/useFetchPlaylistByIdWithAllRelations"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { AsyncState, ScrollAreaWithHeaders, VirtualizedList } from "@components/ui"

import { SongItem } from "@features/songs/components"

import { PlaylistInfoHeader } from "./PlaylistInfoHeader"
import { PlaylistInfoStats } from "./PlaylistInfoStats"
import { PlaylistInfoStickyHeader } from "./PlaylistInfoStickyHeader"
import { PlaylistInfoSubHeader } from "./PlaylistInfoSubHeader"

const PlaylistInfo = () => {
  const { id } = useParams({ from: "/playlists/$id" })

  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    data: playlistData,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
    refetch: refetchPlaylist
  } = useFetchPlaylistByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!playlistData?.songs) return []
    return playlistData.songs.map((relation) => relation.songId)
  }, [playlistData?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    isError: isSongsError,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const isLoading = isPlaylistLoading || isSongsLoading
  const isError = isPlaylistError || isSongsError

  const playlist = playlistData

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const Header = useCallback(() => {
    if (!playlist) return null
    return (
      <div>
        <PlaylistInfoHeader playlist={playlist} />
        <PlaylistInfoStats playlist={playlist} />
      </div>
    )
  }, [playlist])

  const StickyHeader = useCallback(() => {
    if (!playlist) return null
    return <PlaylistInfoStickyHeader playlist={playlist} />
  }, [playlist])

  const ListHeader = useCallback(
    () => (
      <div className="px-9 pb-0 pt-6">
        <PlaylistInfoSubHeader className="border-b" />
      </div>
    ),
    []
  )

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetchPlaylist(), refetchSongs()])
  }, [refetchPlaylist, refetchSongs])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <AsyncState data isLoading={isLoading} isError={isError}>
      {() => (
        <ScrollAreaWithHeaders
          scrollRef={scrollRef}
          HeaderComponent={Header}
          StickyHeaderComponent={StickyHeader}
          ListHeaderComponent={ListHeader}
          className="space-y-6"
        >
          <VirtualizedList
            data={songs}
            keyExtractor={(song) => song.id.toString()}
            estimateItemHeight={70}
            gap={8}
            scrollRef={scrollRef}
            renderItem={({ item }) => <SongItem song={item} allSongIds={allSongIds} />}
          />
        </ScrollAreaWithHeaders>
      )}
    </AsyncState>
  )
}

export { PlaylistInfo }
