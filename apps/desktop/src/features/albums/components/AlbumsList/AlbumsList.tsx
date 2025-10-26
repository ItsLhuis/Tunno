import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import { useFetchAlbumsInfinite } from "../../hooks/useFetchAlbumsInfinite"

import { useFetchAlbumIds } from "../../hooks/useFetchAlbumIds"

import { useFetchArtists } from "@features/artists/hooks/useFetchArtists"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { AlbumItem } from "../AlbumItem"
import { AlbumsListFilters } from "./AlbumsListFilters"
import { AlbumsListHeader } from "./AlbumsListHeader"
import { AlbumsListSearch } from "./AlbumsListSearch"
import { AlbumsListStickyHeader } from "./AlbumsListStickyHeader"
import { AlbumsListSubHeader } from "./AlbumsListSubHeader"

import { type Album, type QueryAlbumParams } from "@repo/api"

type AlbumsListProps = { list: VirtualizedListController<Album> }

const AlbumsList = () => {
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

  const { refetch: refetchArtists } = useFetchArtists()

  const albums = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const albumIds = allAlbumIds ?? []

  const Header = useCallback(
    ({ list }: AlbumsListProps) => <AlbumsListHeader list={list} allAlbumIds={albumIds} />,
    [albumIds]
  )

  const StickyHeader = useCallback(
    ({ list }: AlbumsListProps) => (
      <Fragment>
        <AlbumsListStickyHeader
          list={list}
          allAlbumIds={albumIds}
          className={cn(viewMode === "grid" && "pb-9")}
        />
        {viewMode === "list" && (
          <div className="pt-6">
            <AlbumsListSubHeader list={list} />
          </div>
        )}
      </Fragment>
    ),
    [albumIds, viewMode]
  )

  const ListHeader = useCallback(
    ({ list }: AlbumsListProps) => (
      <Fragment>
        <AlbumsListSearch
          renderRight={<AlbumsListFilters />}
          className={cn(viewMode === "grid" && "pb-6")}
        />
        {viewMode === "list" && (
          <div className="px-9 pb-3 pt-6">
            <AlbumsListSubHeader list={list} className="border-b" />
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
    await Promise.all([refetch(), refetchAlbumIds(), refetchArtists()])
  }, [refetch, refetchAlbumIds, refetchArtists])

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
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, selected, toggle }) => (
        <AlbumItem
          album={item}
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

export { AlbumsList }
