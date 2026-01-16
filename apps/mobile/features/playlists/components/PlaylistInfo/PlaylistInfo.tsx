import { useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useLocalSearchParams } from "expo-router"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useFetchPlaylistByIdWithAllRelations } from "../../hooks/useFetchPlaylistByIdWithAllRelations"

import { useFetchSongsByIdsWithMainRelations } from "@features/songs/hooks/useFetchSongsByIdsWithMainRelations"

import {
  AsyncState,
  FlashListWithHeaders,
  NotFound,
  RefreshControl,
  Spinner,
  type ScrollHeaderProps
} from "@components/ui"

import { SongItemList } from "@features/songs/components"
import { PlaylistInfoHeader } from "./PlaylistInfoHeader"
import { PlaylistInfoStickyHeader } from "./PlaylistInfoStickyHeader"

import { type SongWithMainRelations } from "@repo/api"

const PlaylistInfo = () => {
  const styles = useStyles(playlistInfoStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: playlist,
    isLoading: isPlaylistLoading,
    isError: isPlaylistError,
    refetch: refetchPlaylist
  } = useFetchPlaylistByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!playlist?.songs) return []
    return playlist.songs.map((song) => song.song.id)
  }, [playlist?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetchPlaylist(), refetchSongs()])
    setIsRefreshing(false)
  }, [refetchPlaylist, refetchSongs])

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => {
      if (!playlist) return null
      return (
        <PlaylistInfoStickyHeader
          playlist={playlist}
          songIds={allSongIds}
          scrollY={scrollY}
          showHeader={showHeader}
        />
      )
    },
    [playlist, allSongIds]
  )

  const LargeHeaderComponent = useCallback(() => {
    if (!playlist) return null
    return <PlaylistInfoHeader playlist={playlist} songIds={allSongIds} />
  }, [playlist, allSongIds])

  const ListEmptyComponent = useMemo(() => {
    if (isSongsLoading) {
      return (
        <View style={styles.centered}>
          <Spinner />
        </View>
      )
    }
    return <NotFound />
  }, [isSongsLoading, styles.centered])

  const renderItem = useCallback(
    ({ item, index }: { item: SongWithMainRelations; index: number }): ReactElement => {
      const isLastItem = index === songs.length - 1

      return (
        <View style={styles.listItemWrapper(isLastItem)}>
          <SongItemList
            song={item}
            allSongIds={allSongIds}
            playSource="playlist"
            sourceContextId={playlist?.id}
          />
        </View>
      )
    },
    [songs.length, styles, allSongIds, playlist?.id]
  )

  return (
    <AsyncState data={playlist} isLoading={isPlaylistLoading} isError={isPlaylistError}>
      {() => (
        <FlashListWithHeaders
          HeaderComponent={HeaderComponent}
          LargeHeaderComponent={LargeHeaderComponent}
          disableAutoFixScroll
          data={songs}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.contentContainer(bottomPlayerHeight)}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          renderItem={renderItem}
        />
      )}
    </AsyncState>
  )
}

const playlistInfoStyles = createStyleSheet(({ theme, runtime }) => ({
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(4)
  },
  contentContainer: (bottomOffset: number) =>
    viewStyle({
      flexGrow: 1,
      paddingBottom: theme.space("lg") + runtime.insets.bottom + bottomOffset
    }),
  listItemWrapper: (isLastItem: boolean) =>
    viewStyle({
      marginBottom: isLastItem ? 0 : theme.space(),
      paddingHorizontal: theme.space("lg")
    })
}))

export { PlaylistInfo }
