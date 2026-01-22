import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "../../stores/usePlaylistsStore"

import { useFetchPlaylistsInfinite } from "../../hooks/useFetchPlaylistsInfinite"

import { useFetchPlaylistIds } from "../../hooks/useFetchPlaylistIds"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { PlaylistItemCard, PlaylistItemList } from "../PlaylistItem"
import { PlaylistsListFilters } from "./PlaylistsListFilters"
import { PlaylistsListHeader } from "./PlaylistsListHeader"
import { PlaylistsListSearch } from "./PlaylistsListSearch"
import { PlaylistsListStickyHeader } from "./PlaylistsListStickyHeader"
import { PlaylistsListSubHeader } from "./PlaylistsListSubHeader"

import { type Playlist, type QueryPlaylistParams } from "@repo/api"

type PlaylistsListProps = { list: VirtualizedListController<Playlist> }

const PlaylistsList = () => {
  const { debouncedFilters, orderBy, viewMode } = usePlaylistsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy,
      viewMode: state.viewMode
    }))
  )

  const queryParams: QueryPlaylistParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const keyExtractor = useCallback((item: Playlist) => item.id.toString(), [])

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchPlaylistsInfinite(queryParams)

  const { data: allPlaylistIds, refetch: refetchPlaylistIds } = useFetchPlaylistIds(queryParams)

  const playlists = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.items)
  }, [data?.pages])

  const playlistIds = allPlaylistIds ?? []

  const Header = useCallback(
    ({ list }: PlaylistsListProps) => (
      <PlaylistsListHeader list={list} allPlaylistIds={playlistIds} />
    ),
    [playlistIds]
  )

  const StickyHeader = useCallback(
    ({ list }: PlaylistsListProps) => (
      <Fragment>
        <PlaylistsListStickyHeader
          list={list}
          allPlaylistIds={playlistIds}
          className={cn(viewMode === "grid" && "pb-9")}
        />
        {viewMode === "list" && (
          <div className="pt-6">
            <PlaylistsListSubHeader list={list} />
          </div>
        )}
      </Fragment>
    ),
    [playlistIds, viewMode]
  )

  const ListHeader = useCallback(
    ({ list }: PlaylistsListProps) => (
      <Fragment>
        <PlaylistsListSearch
          renderRight={<PlaylistsListFilters />}
          className={cn(viewMode === "grid" && "pb-6")}
        />
        {viewMode === "list" && (
          <div className="px-9 pt-6 pb-3">
            <PlaylistsListSubHeader list={list} className="border-b" />
          </div>
        )}
      </Fragment>
    ),
    [viewMode]
  )

  const ListEmpty = useCallback(() => (isLoading ? <Spinner /> : <NotFound />), [isLoading])

  const ListFooter = useCallback(() => {
    if (!hasNextPage) return null
    return (
      <div className="flex justify-center py-3">
        <Spinner />
      </div>
    )
  }, [hasNextPage])

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const handleRefresh = useCallback(async () => {
    await Promise.all([refetch(), refetchPlaylistIds()])
  }, [refetch, refetchPlaylistIds])

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
      data={playlists}
      keyExtractor={keyExtractor}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, index, selected, toggle }) =>
        viewMode === "grid" ? (
          <PlaylistItemCard playlist={item} index={index} />
        ) : (
          <PlaylistItemList playlist={item} index={index} selected={selected} onToggle={toggle} />
        )
      }
      layout={viewMode}
    />
  )
}

export { PlaylistsList }
