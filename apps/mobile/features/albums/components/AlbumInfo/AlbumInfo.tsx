import { useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useLocalSearchParams } from "expo-router"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useFetchAlbumByIdWithAllRelations } from "../../hooks/useFetchAlbumByIdWithAllRelations"

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
import { AlbumInfoHeader } from "./AlbumInfoHeader"
import { AlbumInfoStickyHeader } from "./AlbumInfoStickyHeader"

import { type SongWithMainRelations } from "@repo/api"

const AlbumInfo = () => {
  const styles = useStyles(albumInfoStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: album,
    isLoading: isAlbumLoading,
    isError: isAlbumError,
    refetch: refetchAlbum
  } = useFetchAlbumByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!album?.songs) return []
    return album.songs.map((song) => song.id)
  }, [album?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetchAlbum(), refetchSongs()])
    setIsRefreshing(false)
  }, [refetchAlbum, refetchSongs])

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => {
      if (!album) return null
      return (
        <AlbumInfoStickyHeader
          album={album}
          songIds={allSongIds}
          scrollY={scrollY}
          showHeader={showHeader}
        />
      )
    },
    [album, allSongIds]
  )

  const LargeHeaderComponent = useCallback(() => {
    if (!album) return null
    return <AlbumInfoHeader album={album} songIds={allSongIds} />
  }, [album, allSongIds])

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
            playSource="album"
            sourceContextId={album?.id}
          />
        </View>
      )
    },
    [songs.length, styles, allSongIds, album?.id]
  )

  return (
    <AsyncState data={album} isLoading={isAlbumLoading} isError={isAlbumError}>
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

const albumInfoStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { AlbumInfo }
