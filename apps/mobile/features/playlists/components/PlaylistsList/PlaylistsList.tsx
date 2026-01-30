import { Fragment, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useRuntime, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

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

type PLaylistItemType = "list" | "grid"

const LIST_ITEM_HEIGHT = 56
const LIST_ITEM_MARGIN = spacingTokens.md

const GRID_ITEM_MARGIN = spacingTokens.md
const GRID_INFO_ROW_HEIGHT = 39

const CONTENT_PADDING = spacingTokens.lg

const PlaylistsList = () => {
  const styles = useStyles(playlistsListStyles)

  const {
    dimensions: { width: screenWidth }
  } = useRuntime()

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedFilters = usePlaylistsStore((state) => state.debouncedFilters)
  const orderBy = usePlaylistsStore((state) => state.orderBy)
  const viewMode = usePlaylistsStore((state) => state.viewMode)

  const gridItemHeight = useMemo(() => {
    const availableWidth = screenWidth - CONTENT_PADDING * 2
    const totalGapWidth = gap * (numColumns - 1)
    const itemWidth = (availableWidth - totalGapWidth) / numColumns

    return itemWidth + spacingTokens.sm + GRID_INFO_ROW_HEIGHT
  }, [screenWidth, numColumns, gap])

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

  const gridItemStyles = useMemo(() => {
    if (viewMode !== "grid") return []

    const itemGap = (gap * (numColumns - 1)) / numColumns
    const playlistsLength = playlists.length

    return playlists.map((_, index) => {
      const marginLeft = numColumns > 1 ? ((index % numColumns) / (numColumns - 1)) * itemGap : 0
      const marginRight = itemGap - marginLeft
      const isLastRow = index >= playlistsLength - (playlistsLength % numColumns || numColumns)

      return viewStyle({
        flexGrow: 1,
        marginLeft,
        marginRight,
        marginBottom: isLastRow ? 0 : spacingTokens.md
      })
    })
  }, [viewMode, gap, numColumns, playlists.length])

  const listItemStyles = useMemo(() => {
    if (viewMode !== "list") return []

    return playlists.map((_, index) => {
      const isLastItem = index === playlists.length - 1
      return viewStyle({
        marginBottom: isLastItem ? 0 : spacingTokens.md
      })
    })
  }, [viewMode, playlists.length])

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const getItemType = useCallback(
    (_item: Playlist): PLaylistItemType => {
      return viewMode === "grid" ? "grid" : "list"
    },
    [viewMode]
  )

  const overrideItemLayout = useCallback(
    (layout: { span?: number; size?: number }, _item: Playlist, index: number) => {
      if (viewMode === "list") {
        const isLastItem = index === playlists.length - 1
        layout.size = LIST_ITEM_HEIGHT + (isLastItem ? 0 : LIST_ITEM_MARGIN)
      } else {
        const isLastRow = index >= playlists.length - (playlists.length % numColumns || numColumns)
        layout.size = gridItemHeight + (isLastRow ? 0 : GRID_ITEM_MARGIN)
      }
    },
    [viewMode, playlists.length, numColumns, gridItemHeight]
  )

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
  }, [isLoading])

  const ListFooterComponent = useMemo(() => {
    if (hasNextPage) {
      return (
        <View style={styles.footer}>
          <Spinner />
        </View>
      )
    }
    return null
  }, [hasNextPage])

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
    [allSongIds]
  )

  const LargeHeaderSubtitleComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <PlaylistsListSearch renderRight={<PlaylistsListFilters />} />
      </View>
    ),
    []
  )

  const renderItem = useCallback(
    ({ item, index }: { item: Playlist; index: number }): ReactElement => {
      if (viewMode === "grid") {
        return (
          <View style={gridItemStyles[index]}>
            <PlaylistItemCard playlist={item} />
          </View>
        )
      }

      return (
        <View style={listItemStyles[index]}>
          <PlaylistItemList playlist={item} />
        </View>
      )
    },
    [viewMode, gridItemStyles, listItemStyles]
  )

  const contentContainerStyleMemo = useMemo(
    () => styles.contentContainer(bottomPlayerHeight),
    [bottomPlayerHeight]
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
        getItemType={getItemType}
        overrideItemLayout={overrideItemLayout}
        numColumns={viewMode === "grid" ? numColumns : 1}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={contentContainerStyleMemo}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={renderItem}
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
  contentContainer: (bottomOffset: number) =>
    viewStyle({
      flexGrow: 1,
      padding: theme.space("lg"),
      paddingBottom: theme.space("lg") + bottomOffset
    })
}))

export { PlaylistsList }
