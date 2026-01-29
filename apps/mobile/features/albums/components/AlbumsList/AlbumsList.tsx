import { Fragment, memo, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useRuntime, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import { useFetchAlbumIds } from "../../hooks/useFetchAlbumIds"
import { useFetchAlbumsInfinite } from "../../hooks/useFetchAlbumsInfinite"

import {
  FlashListWithHeaders,
  KeyboardSpacer,
  NotFound,
  RefreshControl,
  Spinner,
  type ScrollHeaderProps
} from "@components/ui"

import {
  AlbumItemCard,
  AlbumItemList,
  type AlbumItemCardProps,
  type AlbumItemListProps
} from "../AlbumItem"
import { AlbumsListFilters } from "./AlbumsListFilters"
import { AlbumsListHeader } from "./AlbumsListHeader"
import { AlbumsListSearch } from "./AlbumsListSearch"
import { AlbumsListStickyHeader } from "./AlbumsListStickyHeader"

import { type Album, type QueryAlbumParams } from "@repo/api"

type AlbumItemType = "list" | "grid"

const LIST_ITEM_HEIGHT = 56
const LIST_ITEM_MARGIN = spacingTokens.md

const GRID_ITEM_MARGIN = spacingTokens.md
const GRID_INFO_ROW_HEIGHT = 39

const CONTENT_PADDING = spacingTokens.lg

type GridItemWrapperProps = AlbumItemCardProps & {
  index: number
  numColumns: number
  albumsLength: number
  gap: number
}

const AlbumGridItemWrapper = memo(function AlbumGridItemWrapper({
  album,
  index,
  numColumns,
  albumsLength,
  gap
}: GridItemWrapperProps) {
  const styles = useStyles(albumsListStyles)

  const itemGap = (gap * (numColumns - 1)) / numColumns
  const marginLeft = numColumns > 1 ? ((index % numColumns) / (numColumns - 1)) * itemGap : 0
  const marginRight = itemGap - marginLeft
  const isLastRow = index >= albumsLength - (albumsLength % numColumns || numColumns)

  return (
    <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow)}>
      <AlbumItemCard album={album} />
    </View>
  )
})

type ListItemWrapperProps = AlbumItemListProps & {
  index: number
  albumsLength: number
}

const AlbumListItemWrapper = memo(function AlbumListItemWrapper({
  album,
  index,
  albumsLength
}: ListItemWrapperProps) {
  const styles = useStyles(albumsListStyles)
  const isLastItem = index === albumsLength - 1

  return (
    <View style={styles.listItemWrapper(isLastItem)}>
      <AlbumItemList album={album} />
    </View>
  )
})

const AlbumsList = () => {
  const styles = useStyles(albumsListStyles)

  const {
    dimensions: { width: screenWidth }
  } = useRuntime()

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedFilters = useAlbumsStore((state) => state.debouncedFilters)
  const orderBy = useAlbumsStore((state) => state.orderBy)
  const viewMode = useAlbumsStore((state) => state.viewMode)

  const gridItemHeight = useMemo(() => {
    const availableWidth = screenWidth - CONTENT_PADDING * 2
    const totalGapWidth = gap * (numColumns - 1)
    const itemWidth = (availableWidth - totalGapWidth) / numColumns

    return itemWidth + spacingTokens.sm + GRID_INFO_ROW_HEIGHT
  }, [screenWidth, numColumns, gap])

  const queryParams: QueryAlbumParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchAlbumsInfinite(queryParams)

  const { data: allAlbumIds, refetch: refetchAlbumIds } = useFetchAlbumIds(queryParams)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetch(), refetchAlbumIds()])
    setIsRefreshing(false)
  }, [refetch, refetchAlbumIds])

  const albums = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const albumIds = allAlbumIds ?? []

  const keyExtractor = useCallback((item: Album) => item.id.toString(), [])

  const getItemType = useCallback(
    (_item: Album): AlbumItemType => {
      return viewMode === "grid" ? "grid" : "list"
    },
    [viewMode]
  )

  const overrideItemLayout = useCallback(
    (layout: { span?: number; size?: number }, _item: Album, index: number) => {
      if (viewMode === "list") {
        const isLastItem = index === albums.length - 1
        layout.size = LIST_ITEM_HEIGHT + (isLastItem ? 0 : LIST_ITEM_MARGIN)
      } else {
        const isLastRow = index >= albums.length - (albums.length % numColumns || numColumns)
        layout.size = gridItemHeight + (isLastRow ? 0 : GRID_ITEM_MARGIN)
      }
    },
    [viewMode, albums.length, numColumns, gridItemHeight]
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
      <AlbumsListStickyHeader scrollY={scrollY} showHeader={showHeader} allAlbumIds={albumIds} />
    ),
    [albumIds]
  )

  const LargeHeaderComponent = useCallback(
    () => <AlbumsListHeader allAlbumIds={albumIds} />,
    [albumIds]
  )

  const LargeHeaderSubtitleComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <AlbumsListSearch renderRight={<AlbumsListFilters />} />
      </View>
    ),
    []
  )

  const renderItem = useCallback(
    ({ item, index }: { item: Album; index: number }): ReactElement => {
      if (viewMode === "grid") {
        return (
          <AlbumGridItemWrapper
            album={item}
            index={index}
            numColumns={numColumns}
            albumsLength={albums.length}
            gap={gap}
          />
        )
      }

      return <AlbumListItemWrapper album={item} index={index} albumsLength={albums.length} />
    },
    [viewMode, numColumns, albums.length, gap]
  )

  const contentContainerStyleMemo = useMemo(
    () => styles.contentContainer(bottomPlayerHeight),
    [styles, bottomPlayerHeight]
  )

  return (
    <Fragment>
      <FlashListWithHeaders
        key={viewMode}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        LargeHeaderSubtitleComponent={LargeHeaderSubtitleComponent}
        data={albums}
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

const albumsListStyles = createStyleSheet(({ theme }) => ({
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
    }),
  gridItemWrapper: (marginLeft: number, marginRight: number, isLastRow: boolean) =>
    viewStyle({
      flexGrow: 1,
      marginLeft,
      marginRight,
      marginBottom: isLastRow ? 0 : theme.space()
    }),
  listItemWrapper: (isLastItem: boolean) =>
    viewStyle({
      marginBottom: isLastItem ? 0 : theme.space()
    })
}))

export { AlbumsList }
