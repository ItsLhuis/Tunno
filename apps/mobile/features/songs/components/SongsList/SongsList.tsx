import { Fragment, useCallback, useMemo, useState } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongIds } from "../../hooks/useFetchSongIds"
import { useFetchSongsWithMainRelationsInfinite } from "../../hooks/useFetchSongsWithMainRelationsInfinite"

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
    useFetchSongsWithMainRelationsInfinite(queryParams)

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
        contentContainerStyle={styles.contentContainer(songs.length === 0, bottomPlayerHeight)}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={({ item, index }) => {
          const isLastItem = index === songs.length - 1

          if (viewMode === "grid") {
            const itemGap = (gap * (numColumns - 1)) / numColumns

            const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
            const marginRight = itemGap - marginLeft

            const isLastRow = index >= songs.length - (songs.length % numColumns || numColumns)

            return (
              <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow ? 0 : gap)}>
                <SongItemCard song={item} allSongIds={songIds} />
              </View>
            )
          }

          return (
            <View style={styles.listItemWrapper(isLastItem ? 0 : gap)}>
              <SongItemList song={item} allSongIds={songIds} />
            </View>
          )
        }}
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
  contentContainer: (isEmpty: boolean, bottomOffset: number) =>
    viewStyle({
      padding: theme.space("lg"),
      paddingBottom: theme.space("lg") + theme.space("md") + bottomOffset,
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

export { SongsList }
