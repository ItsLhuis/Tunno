import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongIds } from "../../hooks/useFetchSongIds"

import { useFetchSongsWithMainRelationsInfinite } from "../../hooks/useFetchSongsWithMainRelationsInfinite"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { SongItem } from "../SongItem"
import { SongsListFilters } from "./SongsListFilters"
import { SongsListHeader } from "./SongsListHeader"
import { SongsListSearch } from "./SongsListSearch"
import { SongsListStickyHeader } from "./SongsListStickyHeader"
import { SongsListSubHeader } from "./SongsListSubHeader"

import { type QuerySongsParams, type SongWithMainRelations } from "@repo/api"

type SongListProps = { list: VirtualizedListController<SongWithMainRelations> }

const SongsList = () => {
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

  const songs = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const songIds = allSongIds ?? []

  const Header = useCallback(
    ({ list }: SongListProps) => <SongsListHeader list={list} allSongIds={songIds} />,
    [songIds]
  )

  const StickyHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <SongsListStickyHeader
          list={list}
          allSongIds={songIds}
          className={cn(viewMode === "grid" && "pb-9")}
        />
        {viewMode === "list" && (
          <div className="pt-6">
            <SongsListSubHeader list={list} />
          </div>
        )}
      </Fragment>
    ),
    [songIds, viewMode]
  )

  const ListHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <SongsListSearch
          renderRight={<SongsListFilters />}
          className={cn(viewMode === "grid" && "pb-6")}
        />
        {viewMode === "list" && (
          <div className="px-9 pb-3 pt-6">
            <SongsListSubHeader list={list} className="border-b" />
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
    await Promise.all([refetch(), refetchSongIds()])
  }, [refetch, refetchSongIds])

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
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, selected, toggle }) => (
        <SongItem
          song={item}
          variant={viewMode === "grid" ? "card" : "list"}
          selected={viewMode === "list" ? selected : false}
          onToggle={viewMode === "list" ? toggle : undefined}
          allSongIds={songIds}
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

export { SongsList }
