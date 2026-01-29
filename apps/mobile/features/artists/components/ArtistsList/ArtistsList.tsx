import { Fragment, memo, useCallback, useMemo, useState, type ReactElement } from "react"

import { View } from "react-native"

import { createStyleSheet, spacingTokens, useRuntime, useStyles, viewStyle } from "@styles"

import { useResponsiveColumns } from "@components/ui/ListWithHeader/hooks"

import { useBottomPlayerHeight } from "@features/player/contexts/BottomPlayerLayoutContext"

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

import {
  ArtistItemCard,
  ArtistItemList,
  type ArtistItemCardProps,
  type ArtistItemListProps
} from "../ArtistItem"
import { ArtistsListFilters } from "./ArtistsListFilters"
import { ArtistsListHeader } from "./ArtistsListHeader"
import { ArtistsListSearch } from "./ArtistsListSearch"
import { ArtistsListStickyHeader } from "./ArtistsListStickyHeader"

import { type Artist, type QueryArtistParams } from "@repo/api"

type ArtistItemType = "list" | "grid"

const LIST_ITEM_HEIGHT = 56
const LIST_ITEM_MARGIN = spacingTokens.md

const GRID_ITEM_MARGIN = spacingTokens.md
const GRID_INFO_ROW_HEIGHT = 39

const CONTENT_PADDING = spacingTokens.lg

type GridItemWrapperProps = ArtistItemCardProps & {
  index: number
  numColumns: number
  artistsLength: number
  gap: number
}

const ArtistGridItemWrapper = memo(function ArtistGridItemWrapper({
  artist,
  index,
  numColumns,
  artistsLength,
  gap
}: GridItemWrapperProps) {
  const styles = useStyles(artistsListStyles)

  const itemGap = (gap * (numColumns - 1)) / numColumns
  const marginLeft = numColumns > 1 ? ((index % numColumns) / (numColumns - 1)) * itemGap : 0
  const marginRight = itemGap - marginLeft
  const isLastRow = index >= artistsLength - (artistsLength % numColumns || numColumns)

  return (
    <View style={styles.gridItemWrapper(marginLeft, marginRight, isLastRow)}>
      <ArtistItemCard artist={artist} />
    </View>
  )
})

type ListItemWrapperProps = ArtistItemListProps & {
  index: number
  artistsLength: number
}

const ArtistListItemWrapper = memo(function ArtistListItemWrapper({
  artist,
  index,
  artistsLength
}: ListItemWrapperProps) {
  const styles = useStyles(artistsListStyles)
  const isLastItem = index === artistsLength - 1

  return (
    <View style={styles.listItemWrapper(isLastItem)}>
      <ArtistItemList artist={artist} />
    </View>
  )
})

const ArtistsList = () => {
  const styles = useStyles(artistsListStyles)

  const {
    dimensions: { width: screenWidth }
  } = useRuntime()

  const numColumns = useResponsiveColumns()

  const gap = spacingTokens.md

  const bottomPlayerHeight = useBottomPlayerHeight()

  const [isRefreshing, setIsRefreshing] = useState(false)

  const debouncedFilters = useArtistsStore((state) => state.debouncedFilters)
  const orderBy = useArtistsStore((state) => state.orderBy)
  const viewMode = useArtistsStore((state) => state.viewMode)

  const gridItemHeight = useMemo(() => {
    const availableWidth = screenWidth - CONTENT_PADDING * 2
    const totalGapWidth = gap * (numColumns - 1)
    const itemWidth = (availableWidth - totalGapWidth) / numColumns

    return itemWidth + spacingTokens.sm + GRID_INFO_ROW_HEIGHT
  }, [screenWidth, numColumns, gap])

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

  const getItemType = useCallback(
    (_item: Artist): ArtistItemType => {
      return viewMode === "grid" ? "grid" : "list"
    },
    [viewMode]
  )

  const overrideItemLayout = useCallback(
    (layout: { span?: number; size?: number }, _item: Artist, index: number) => {
      if (viewMode === "list") {
        const isLastItem = index === artists.length - 1
        layout.size = LIST_ITEM_HEIGHT + (isLastItem ? 0 : LIST_ITEM_MARGIN)
      } else {
        const isLastRow = index >= artists.length - (artists.length % numColumns || numColumns)
        layout.size = gridItemHeight + (isLastRow ? 0 : GRID_ITEM_MARGIN)
      }
    },
    [viewMode, artists.length, numColumns, gridItemHeight]
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

  const renderItem = useCallback(
    ({ item, index }: { item: Artist; index: number }): ReactElement => {
      if (viewMode === "grid") {
        return (
          <ArtistGridItemWrapper
            artist={item}
            index={index}
            numColumns={numColumns}
            artistsLength={artists.length}
            gap={gap}
          />
        )
      }

      return <ArtistListItemWrapper artist={item} index={index} artistsLength={artists.length} />
    },
    [viewMode, numColumns, artists.length, gap]
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
        data={artists}
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
