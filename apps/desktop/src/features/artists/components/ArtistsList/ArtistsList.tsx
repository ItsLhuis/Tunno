import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { useFetchArtistsInfinite } from "../../hooks/useFetchArtistsInfinite"

import { useFetchArtistIds } from "../../hooks/useFetchArtistIds"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { ArtistItem } from "../ArtistItem"
import { ArtistsListFilters } from "./ArtistsListFilters"
import { ArtistsListHeader } from "./ArtistsListHeader"
import { ArtistsListSearch } from "./ArtistsListSearch"
import { ArtistsListStickyHeader } from "./ArtistsListStickyHeader"
import { ArtistsListSubHeader } from "./ArtistsListSubHeader"

import { type Artist, type QueryArtistParams } from "@repo/api"

type ArtistsListProps = { list: VirtualizedListController<Artist> }

const ArtistsList = () => {
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

  const artists = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.artists)
  }, [data?.pages])

  const artistIds = allArtistIds ?? []

  const Header = useCallback(
    ({ list }: ArtistsListProps) => <ArtistsListHeader list={list} allArtistIds={artistIds} />,
    [artistIds]
  )

  const StickyHeader = useCallback(
    ({ list }: ArtistsListProps) => (
      <Fragment>
        <ArtistsListStickyHeader
          list={list}
          allArtistIds={artistIds}
          className={cn(viewMode === "grid" && "pb-9")}
        />
        {viewMode === "list" && (
          <div className="pt-6">
            <ArtistsListSubHeader list={list} />
          </div>
        )}
      </Fragment>
    ),
    [artistIds, viewMode]
  )

  const ListHeader = useCallback(
    ({ list }: ArtistsListProps) => (
      <Fragment>
        <ArtistsListSearch
          renderRight={<ArtistsListFilters />}
          className={cn(viewMode === "grid" && "pb-6")}
        />
        {viewMode === "list" && (
          <div className="px-9 pb-3 pt-6">
            <ArtistsListSubHeader list={list} className="border-b" />
          </div>
        )}
      </Fragment>
    ),
    [viewMode]
  )

  const ListEmpty = () => (isLoading ? <Spinner /> : <NotFound />)

  const ListFooter = () =>
    hasNextPage ? (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    ) : null

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetch(), refetchArtistIds()])
  }, [refetch, refetchArtistIds])

  usePageRefresh({
    refreshFn: handleRefresh
  })

  return (
    <VirtualizedListWithHeaders
      className={cn("p-9 pt-0", viewMode === "grid" && "-m-2")}
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, selected, toggle }) => (
        <ArtistItem
          artist={item}
          variant={viewMode === "grid" ? "card" : "list"}
          selected={viewMode === "list" ? selected : false}
          onToggle={viewMode === "list" ? toggle : undefined}
        />
      )}
      layout={viewMode}
      gridBreakpoints={{
        xs: 3,
        sm: 3,
        md: 4,
        lg: 4,
        xl: 5,
        "2xl": 6
      }}
    />
  )
}

export { ArtistsList }
