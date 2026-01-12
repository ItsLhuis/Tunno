import { Fragment, useCallback, useMemo, useState } from "react"

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
        contentContainerStyle={styles.contentContainer(artists.length === 0, bottomPlayerHeight)}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
        renderItem={({ item, index }) => {
          const isLastItem = index === artists.length - 1

          if (viewMode === "grid") {
            const itemGap = (gap * (numColumns - 1)) / numColumns

            const marginLeft = ((index % numColumns) / (numColumns - 1)) * itemGap
            const marginRight = itemGap - marginLeft

            const isLastRow = index >= artists.length - (artists.length % numColumns || numColumns)

            return (
              <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow ? 0 : gap)}>
                <ArtistItemCard artist={item} />
              </View>
            )
          }

          return (
            <View style={styles.listItemWrapper(isLastItem ? 0 : gap)}>
              <ArtistItemList artist={item} />
            </View>
          )
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

export { ArtistsList }
