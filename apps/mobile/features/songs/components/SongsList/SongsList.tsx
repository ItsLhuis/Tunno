import { Fragment, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useRuntime, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongIds } from "../../hooks/useFetchSongIds"
import { useFetchSongsInfiniteWithMainRelations } from "../../hooks/useFetchSongsInfiniteWithMainRelations"

import {
  FlashListWithHeaders,
  KeyboardSpacer,
  NotFound,
  RefreshControl,
  Spinner,
  type ScrollHeaderProps
} from "@components/ui"

import { SongItemCard, SongItemList } from "../SongItem"
import { SongsListFilters } from "./SongsListFilters"
import { SongsListHeader } from "./SongsListHeader"
import { SongsListSearch } from "./SongsListSearch"
import { SongsListStickyHeader } from "./SongsListStickyHeader"

import { type QuerySongsParams, type SongWithMainRelations } from "@repo/api"

type SongItemType = "list" | "grid"

const LIST_ITEM_HEIGHT = 56
const LIST_ITEM_MARGIN = spacingTokens.md

const GRID_ITEM_MARGIN = spacingTokens.md
const GRID_INFO_ROW_HEIGHT = 39

const CONTENT_PADDING = spacingTokens.lg

const SongsList = () => {
  const styles = useStyles(songsListStyles)

  const {
    dimensions: { width: screenWidth }
  } = useRuntime()

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedFilters = useSongsStore((state) => state.debouncedFilters)
  const orderBy = useSongsStore((state) => state.orderBy)
  const viewMode = useSongsStore((state) => state.viewMode)

  const gridItemHeight = useMemo(() => {
    const availableWidth = screenWidth - CONTENT_PADDING * 2
    const totalGapWidth = gap * (numColumns - 1)
    const itemWidth = (availableWidth - totalGapWidth) / numColumns

    return itemWidth + spacingTokens.sm + GRID_INFO_ROW_HEIGHT
  }, [screenWidth, numColumns, gap])

  const queryParams: QuerySongsParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchSongsInfiniteWithMainRelations(queryParams)

  const { data: allSongIds, refetch: refetchSongIds } = useFetchSongIds(queryParams)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetch(), refetchSongIds()])
    setIsRefreshing(false)
  }, [refetch, refetchSongIds])

  const songs = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const songIds = allSongIds ?? []

  const gridItemStyles = useMemo(() => {
    if (viewMode !== "grid") return []

    const itemGap = (gap * (numColumns - 1)) / numColumns
    const songsLength = songs.length

    return songs.map((_, index) => {
      const marginLeft = numColumns > 1 ? ((index % numColumns) / (numColumns - 1)) * itemGap : 0
      const marginRight = itemGap - marginLeft
      const isLastRow = index >= songsLength - (songsLength % numColumns || numColumns)

      return viewStyle({
        flexGrow: 1,
        marginLeft,
        marginRight,
        marginBottom: isLastRow ? 0 : spacingTokens.md
      })
    })
  }, [viewMode, gap, numColumns, songs.length])

  const listItemStyles = useMemo(() => {
    if (viewMode !== "list") return []

    return songs.map((_, index) => {
      const isLastItem = index === songs.length - 1
      return viewStyle({
        marginBottom: isLastItem ? 0 : spacingTokens.md
      })
    })
  }, [viewMode, songs.length])

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

  const getItemType = useCallback(
    (_item: SongWithMainRelations): SongItemType => {
      return viewMode === "grid" ? "grid" : "list"
    },
    [viewMode]
  )

  const overrideItemLayout = useCallback(
    (layout: { span?: number; size?: number }, _item: SongWithMainRelations, index: number) => {
      if (viewMode === "list") {
        const isLastItem = index === songs.length - 1
        layout.size = LIST_ITEM_HEIGHT + (isLastItem ? 0 : LIST_ITEM_MARGIN)
      } else {
        const isLastRow = index >= songs.length - (songs.length % numColumns || numColumns)
        layout.size = gridItemHeight + (isLastRow ? 0 : GRID_ITEM_MARGIN)
      }
    },
    [viewMode, songs.length, numColumns, gridItemHeight]
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
      <SongsListStickyHeader scrollY={scrollY} showHeader={showHeader} allSongIds={songIds} />
    ),
    [songIds]
  )

  const LargeHeaderComponent = useCallback(
    () => <SongsListHeader allSongIds={songIds} />,
    [songIds]
  )

  const LargeHeaderSubtitleComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <SongsListSearch renderRight={<SongsListFilters />} />
      </View>
    ),
    []
  )

  const renderItem = useCallback(
    ({ item, index }: { item: SongWithMainRelations; index: number }): ReactElement => {
      if (viewMode === "grid") {
        return (
          <View style={gridItemStyles[index]}>
            <SongItemCard song={item} allSongIds={songIds} />
          </View>
        )
      }

      return (
        <View style={listItemStyles[index]}>
          <SongItemList song={item} allSongIds={songIds} />
        </View>
      )
    },
    [viewMode, gridItemStyles, listItemStyles, songIds]
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
        data={songs}
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

const songsListStyles = createStyleSheet(({ theme }) => ({
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

export { SongsList }
