import { Fragment, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

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

const SongsList = () => {
  const styles = useStyles(songsListStyles)

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { debouncedFilters, orderBy, viewMode } = useSongsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy,
      viewMode: state.viewMode
    }))
  )

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

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

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

  const renderGridItem = useCallback(
    ({ item, index }: { item: SongWithMainRelations; index: number }): ReactElement => {
      const itemGap = (gap * (numColumns - 1)) / numColumns
      const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
      const marginRight = itemGap - marginLeft
      const isLastRow = index >= songs.length - (songs.length % numColumns || numColumns)

      return (
        <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow)}>
          <SongItemCard song={item} allSongIds={songIds} />
        </View>
      )
    },
    [numColumns, songs.length, songIds]
  )

  const renderListItem = useCallback(
    ({ item, index }: { item: SongWithMainRelations; index: number }): ReactElement => {
      const isLastItem = index === songs.length - 1

      return (
        <View style={styles.listItemWrapper(isLastItem)}>
          <SongItemList song={item} allSongIds={songIds} />
        </View>
      )
    },
    [songs.length, songIds]
  )

  const renderItem = useCallback(
    ({ item, index }: { item: SongWithMainRelations; index: number }): ReactElement => {
      if (viewMode === "grid") {
        return renderGridItem({ item, index })
      }

      return renderListItem({ item, index })
    },
    [viewMode]
  )

  const getItemType = useCallback(() => (viewMode === "grid" ? "grid" : "list"), [viewMode])

  return (
    <Fragment>
      <FlashListWithHeaders
        key={viewMode}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        LargeHeaderSubtitleComponent={LargeHeaderSubtitleComponent}
        data={songs}
        keyExtractor={keyExtractor}
        numColumns={viewMode === "grid" ? numColumns : 1}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={styles.contentContainer(bottomPlayerHeight)}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={renderItem}
        getItemType={getItemType}
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

export { SongsList }
