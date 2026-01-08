import { useCallback, useMemo, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

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

  const gap = spacingTokens.sm

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

  return (
    <AsyncState data={album} isLoading={isAlbumLoading} isError={isAlbumError}>
      {(data) => (
        <FlashListWithHeaders
          HeaderComponent={HeaderComponent}
          LargeHeaderComponent={LargeHeaderComponent}
          data={songs}
          keyExtractor={keyExtractor}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.contentContainer(songs.length === 0, bottomPlayerHeight)}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          renderItem={({ item, index }) => {
            const isLastItem = index === songs.length - 1

            return (
              <View style={styles.listItemWrapper(isLastItem ? 0 : gap)}>
                <SongItemList
                  song={item}
                  allSongIds={allSongIds}
                  playSource="album"
                  sourceContextId={data.id}
                />
              </View>
            )
          }}
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
  contentContainer: (isEmpty: boolean, bottomOffset: number) =>
    viewStyle({
      paddingBottom: theme.space("lg") + runtime.insets.bottom + bottomOffset,
      ...(isEmpty && {
        flex: 1
      })
    }),
  listItemWrapper: (marginBottom: number) =>
    viewStyle({
      marginBottom,
      paddingHorizontal: theme.space("lg")
    })
}))

export { AlbumInfo }
