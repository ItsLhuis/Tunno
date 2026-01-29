import { Fragment, useCallback, useMemo } from "react"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongIds } from "../../hooks/useFetchSongIds"

import { useFetchSongsInfiniteWithMainRelations } from "../../hooks/useFetchSongsInfiniteWithMainRelations"

import { useFetchAlbumsByArtistsWithArtists } from "@features/albums/hooks/useFetchAlbumsByArtistsWithArtists"

import { useFetchArtists } from "@features/artists/hooks/useFetchArtists"

import { usePageRefresh } from "@app/layout/Titlebar/hooks/usePageRefresh"

import { cn } from "@lib/utils"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { SongItemCard, SongItemList } from "../SongItem"
import { SongsListFilters } from "./SongsListFilters"
import { SongsListHeader } from "./SongsListHeader"
import { SongsListSearch } from "./SongsListSearch"
import { SongsListStickyHeader } from "./SongsListStickyHeader"
import { SongsListSubHeader } from "./SongsListSubHeader"

import { type QuerySongsParams, type SongWithMainRelations } from "@repo/api"

type SongListProps = { list: VirtualizedListController<SongWithMainRelations> }

const SongsList = () => {
  const debouncedFilters = useSongsStore((state) => state.debouncedFilters)
  const orderBy = useSongsStore((state) => state.orderBy)
  const viewMode = useSongsStore((state) => state.viewMode)

  const queryParams: QuerySongsParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const keyExtractor = useCallback((item: SongWithMainRelations) => item.id.toString(), [])

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } =
    useFetchSongsInfiniteWithMainRelations(queryParams)

  const { data: allSongIds, refetch: refetchSongIds } = useFetchSongIds(queryParams)

  const { refetch: refetchArtists } = useFetchArtists()

  const { refetch: refetchAlbums } = useFetchAlbumsByArtistsWithArtists([], {
    orderBy: { column: "name", direction: "asc" }
  })

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
          <div className="px-9 pt-6 pb-3">
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
    await Promise.all([refetch(), refetchSongIds(), refetchArtists(), refetchAlbums()])
  }, [refetch, refetchSongIds, refetchArtists, refetchAlbums])

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
      data={songs}
      keyExtractor={keyExtractor}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, index, selected, toggle }) =>
        viewMode === "grid" ? (
          <SongItemCard song={item} index={index} allSongIds={songIds} />
        ) : (
          <SongItemList
            song={item}
            index={index}
            selected={selected}
            onToggle={toggle}
            allSongIds={songIds}
          />
        )
      }
      layout={viewMode}
    />
  )
}

export { SongsList }
