import { useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, useStyles, viewStyle } from "@styles"

import { useLocalSearchParams } from "expo-router"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useFetchArtistByIdWithAllRelations } from "../../hooks/useFetchArtistByIdWithAllRelations"

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
import { ArtistInfoHeader } from "./ArtistInfoHeader"
import { ArtistInfoStickyHeader } from "./ArtistInfoStickyHeader"

import { type SongWithMainRelations } from "@repo/api"

const ArtistInfo = () => {
  const styles = useStyles(artistInfoStyles)

  const { id } = useLocalSearchParams<{ id: string }>()

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const {
    data: artist,
    isLoading: isArtistLoading,
    isError: isArtistError,
    refetch: refetchArtist
  } = useFetchArtistByIdWithAllRelations(Number(id))

  const songIds = useMemo(() => {
    if (!artist?.songs) return []
    return artist.songs.map((song) => song.songId)
  }, [artist?.songs])

  const {
    data: songsData,
    isLoading: isSongsLoading,
    refetch: refetchSongs
  } = useFetchSongsByIdsWithMainRelations(songIds.length > 0 ? songIds : null)

  const songs = songsData ?? []

  const allSongIds = useMemo(() => songs.map((song) => song.id), [songs])

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetchArtist(), refetchSongs()])
    setIsRefreshing(false)
  }, [refetchArtist, refetchSongs])

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => {
      if (!artist) return null
      return (
        <ArtistInfoStickyHeader
          artist={artist}
          songIds={allSongIds}
          scrollY={scrollY}
          showHeader={showHeader}
        />
      )
    },
    [artist, allSongIds]
  )

  const LargeHeaderComponent = useCallback(() => {
    if (!artist) return null
    return <ArtistInfoHeader artist={artist} songIds={allSongIds} />
  }, [artist, allSongIds])

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
            playSource="artist"
            sourceContextId={artist?.id}
          />
        </View>
      )
    },
    [songs.length, styles, allSongIds, artist?.id]
  )

  return (
    <AsyncState data={artist} isLoading={isArtistLoading} isError={isArtistError}>
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

const artistInfoStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { ArtistInfo }
