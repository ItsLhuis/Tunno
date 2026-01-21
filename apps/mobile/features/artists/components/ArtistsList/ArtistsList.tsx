import { Fragment, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { useFetchArtistIds } from "../../hooks/useFetchArtistIds"
import { useFetchArtistsInfinite } from "../../hooks/useFetchArtistsInfinite"

import {
  FlashListWithHeaders,
  KeyboardSpacer,
  NotFound,
  RefreshControl,
  Spinner,
  type ScrollHeaderProps
} from "@components/ui"

import { ArtistItemCard, ArtistItemList } from "../ArtistItem"
import { ArtistsListFilters } from "./ArtistsListFilters"
import { ArtistsListHeader } from "./ArtistsListHeader"
import { ArtistsListSearch } from "./ArtistsListSearch"
import { ArtistsListStickyHeader } from "./ArtistsListStickyHeader"

import { type Artist, type QueryArtistParams } from "@repo/api"

const ArtistsList = () => {
  const styles = useStyles(artistsListStyles)

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const { debouncedFilters, orderBy, viewMode } = useArtistsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy,
      viewMode: state.viewMode
    }))
  )

  const queryParams: QueryArtistParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchArtistsInfinite(queryParams)

  const { data: allArtistIds, refetch: refetchArtistIds } = useFetchArtistIds(queryParams)

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await Promise.all([refetch(), refetchArtistIds()])
    setIsRefreshing(false)
  }, [refetch, refetchArtistIds])

  const artists = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const artistIds = allArtistIds ?? []

  const keyExtractor = useCallback((item: Artist) => item.id.toString(), [])

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
      <ArtistsListStickyHeader scrollY={scrollY} showHeader={showHeader} allArtistIds={artistIds} />
    ),
    [artistIds]
  )

  const LargeHeaderComponent = useCallback(
    () => <ArtistsListHeader allArtistIds={artistIds} />,
    [artistIds]
  )

  const LargeHeaderSubtitleComponent = useCallback(
    () => (
      <View style={styles.searchContainer}>
        <ArtistsListSearch renderRight={<ArtistsListFilters />} />
      </View>
    ),
    []
  )

  const renderGridItem = useCallback(
    ({ item, index }: { item: Artist; index: number }): ReactElement => {
      const itemGap = (gap * (numColumns - 1)) / numColumns
      const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
      const marginRight = itemGap - marginLeft
      const isLastRow = index >= artists.length - (artists.length % numColumns || numColumns)

      return (
        <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow)}>
          <ArtistItemCard artist={item} />
        </View>
      )
    },
    [numColumns, artists.length]
  )

  const renderListItem = useCallback(
    ({ item, index }: { item: Artist; index: number }): ReactElement => {
      const isLastItem = index === artists.length - 1

      return (
        <View style={styles.listItemWrapper(isLastItem)}>
          <ArtistItemList artist={item} />
        </View>
      )
    },
    [artists.length]
  )

  return (
    <Fragment>
      <FlashListWithHeaders
        key={viewMode}
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        LargeHeaderSubtitleComponent={LargeHeaderSubtitleComponent}
        data={artists}
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

const artistsListStyles = createStyleSheet(({ theme }) => ({
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

export { ArtistsList }
