import { Fragment, useCallback, useMemo, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "../../stores/usePlaylistsStore"

import { useFetchPlaylistIds } from "../../hooks/useFetchPlaylistIds"
import { useFetchPlaylistsInfinite } from "../../hooks/useFetchPlaylistsInfinite"

import { useFetchSongIdsByPlaylistIds } from "@features/songs/hooks/useFetchSongIdsByPlaylistIds"

import {
  FlashListWithHeaders,
  KeyboardSpacer,
  NotFound,
  RefreshControl,
  Spinner,
  type ScrollHeaderProps
} from "@components/ui"

import { PlaylistItemCard, PlaylistItemList } from "../PlaylistItem"
import { PlaylistsListFilters } from "./PlaylistsListFilters"
import { PlaylistsListHeader } from "./PlaylistsListHeader"
import { PlaylistsListSearch } from "./PlaylistsListSearch"
import { PlaylistsListStickyHeader } from "./PlaylistsListStickyHeader"

import { type Playlist, type QueryPlaylistParams } from "@repo/api"

const PlaylistsList = () => {
  const styles = useStyles(playlistsListStyles)

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { debouncedFilters, orderBy, viewMode } = usePlaylistsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy,
      viewMode: state.viewMode
    }))
  )

  const queryParams: QueryPlaylistParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchPlaylistsInfinite(queryParams)

  const { data: allPlaylistIds, refetch: refetchPlaylistIds } = useFetchPlaylistIds(queryParams)

  const { data: allSongIds, refetch: refetchSongIds } = useFetchSongIdsByPlaylistIds(
    allPlaylistIds ?? []
  )

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetch(), refetchPlaylistIds(), refetchSongIds()])
    setIsRefreshing(false)
  }, [refetch, refetchPlaylistIds, refetchSongIds])

  const playlists = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const playlistIds = allPlaylistIds ?? []

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const ListEmptyComponent = useMemo(() => {
    if (isLoading) {
      return (
        <View style={styles.centered}>
          <Spinner />
        </View>
      )
    }
    return <NotFound />
  }, [isLoading, styles.centered])

  const ListFooterComponent = useMemo(() => {
    if (hasNextPage) {
      return (
        <View style={styles.footer}>
          <Spinner />
        </View>
      )
    }
    return null
  }, [hasNextPage, styles.footer])

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => (
      <PlaylistsListStickyHeader
        scrollY={scrollY}
        showHeader={showHeader}
        allPlaylistIds={playlistIds}
        allSongIds={allSongIds ?? []}
      />
    ),
    [playlistIds, allSongIds]
  )

  const LargeHeaderComponent = useCallback(
    () => <PlaylistsListHeader allSongIds={allSongIds ?? []} />,
    [playlistIds, allSongIds]
  )

  const LargeHeaderSubtitleComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <PlaylistsListSearch renderRight={<PlaylistsListFilters />} />
      </View>
    ),
    []
  )

  return (
    <Fragment>
      <FlashListWithHeaders
        key={viewMode}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        LargeHeaderSubtitleComponent={LargeHeaderSubtitleComponent}
        data={playlists}
        keyExtractor={keyExtractor}
        numColumns={viewMode === "grid" ? numColumns : 1}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.contentContainer(playlists.length === 0, bottomPlayerHeight)}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={({ item, index }) => {
          const isLastItem = index === playlists.length - 1

          if (viewMode === "grid") {
            const itemGap = (gap * (numColumns - 1)) / numColumns

            const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
            const marginRight = itemGap - marginLeft

            const isLastRow =
              index >= playlists.length - (playlists.length % numColumns || numColumns)

            return (
              <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow ? 0 : gap)}>
                <PlaylistItemCard playlist={item} />
              </View>
            )
          }

          return (
            <View style={styles.listItemWrapper(isLastItem ? 0 : gap)}>
              <PlaylistItemList playlist={item} />
            </View>
          )
        }}
      />
      <KeyboardSpacer />
    </Fragment>
  )
}

const playlistsListStyles = createStyleSheet(({ theme }) => ({
  searchContainer: {
    paddingBottom: theme.space("lg")
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.space(4)
  },
  footer: {
    alignItems: "center",
    paddingVertical: theme.space()
  },
  contentContainer: (isEmpty: boolean, bottomOffset: number) =>
    viewStyle({
      padding: theme.space("lg"),
      paddingBottom: theme.space("lg") + bottomOffset,
      ...(isEmpty && {
        flex: 1
      })
    }),
  gridItemWrapper: (marginLeft: number, marginRight: number, marginBottom: number) =>
    viewStyle({
      flexGrow: 1,
      marginLeft,
      marginRight,
      marginBottom
    }),
  listItemWrapper: (marginBottom: number) =>
    viewStyle({
      marginBottom
    })
}))

export { PlaylistsList }
