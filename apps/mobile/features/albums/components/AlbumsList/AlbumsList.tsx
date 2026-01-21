import { Fragment, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

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

import { AlbumItemCard, AlbumItemList } from "../AlbumItem"
import { AlbumsListFilters } from "./AlbumsListFilters"
import { AlbumsListHeader } from "./AlbumsListHeader"
import { AlbumsListSearch } from "./AlbumsListSearch"
import { AlbumsListStickyHeader } from "./AlbumsListStickyHeader"

import { type Album, type QueryAlbumParams } from "@repo/api"

const AlbumsList = () => {
  const styles = useStyles(albumsListStyles)

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { debouncedFilters, orderBy, viewMode } = useAlbumsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy,
      viewMode: state.viewMode
    }))
  )

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

  const renderGridItem = useCallback(
    ({ item, index }: { item: Album; index: number }): ReactElement => {
      const itemGap = (gap * (numColumns - 1)) / numColumns
      const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
      const marginRight = itemGap - marginLeft
      const isLastRow = index >= albums.length - (albums.length % numColumns || numColumns)

      return (
        <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow)}>
          <AlbumItemCard album={item} />
        </View>
      )
    },
    [numColumns, albums.length]
  )

  const renderListItem = useCallback(
    ({ item, index }: { item: Album; index: number }): ReactElement => {
      const isLastItem = index === albums.length - 1

      return (
        <View style={styles.listItemWrapper(isLastItem)}>
          <AlbumItemList album={item} />
        </View>
      )
    },
    [albums.length]
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
        numColumns={viewMode === "grid" ? numColumns : 1}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.contentContainer(bottomPlayerHeight)}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={({ item, index }) => {
          if (viewMode === "grid") {
            return renderGridItem({ item, index })
          }

          return renderListItem({ item, index })
        }}
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
