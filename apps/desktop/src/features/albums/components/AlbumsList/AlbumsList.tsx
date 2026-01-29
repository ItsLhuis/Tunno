import { Fragment, useCallback, useMemo } from "react"

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

import { AlbumItemCard, AlbumItemList } from "../AlbumItem"
import { AlbumsListFilters } from "./AlbumsListFilters"
import { AlbumsListHeader } from "./AlbumsListHeader"
import { AlbumsListSearch } from "./AlbumsListSearch"
import { AlbumsListStickyHeader } from "./AlbumsListStickyHeader"
import { AlbumsListSubHeader } from "./AlbumsListSubHeader"

import { type Album, type QueryAlbumParams } from "@repo/api"

type AlbumsListProps = { list: VirtualizedListController<Album> }

const AlbumsList = () => {
  const debouncedFilters = useAlbumsStore((state) => state.debouncedFilters)
  const orderBy = useAlbumsStore((state) => state.orderBy)
  const viewMode = useAlbumsStore((state) => state.viewMode)

  const queryParams: QueryAlbumParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const keyExtractor = useCallback((item: Album) => item.id.toString(), [])

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
          <div className="px-9 pt-6 pb-3">
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
      className={cn(viewMode === "grid" && "p-7 pt-0")}
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      data={albums}
      keyExtractor={keyExtractor}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, index, selected, toggle }) =>
        viewMode === "grid" ? (
          <AlbumItemCard album={item} index={index} />
        ) : (
          <AlbumItemList album={item} index={index} selected={selected} onToggle={toggle} />
        )
      }
      layout={viewMode}
    />
  )
}

export { AlbumsList }
