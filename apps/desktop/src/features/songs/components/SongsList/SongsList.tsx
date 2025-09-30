import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongIds } from "../../hooks/useFetchSongIds"
import { useFetchSongsWithMainRelationsInfinite } from "../../hooks/useFetchSongsWithMainRelationsInfinite"

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
  const { debouncedFilters, orderBy } = useSongsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy
    }))
  )

  const queryParams: QuerySongsParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFetchSongsWithMainRelationsInfinite(queryParams)

  const { data: allSongIds } = useFetchSongIds(queryParams)

  const songs = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.songs)
  }, [data?.pages])

  const songIds = useMemo(() => allSongIds || [], [allSongIds])

  const Header = useCallback(
    ({ list }: SongListProps) => <SongsListHeader list={list} allSongIds={songIds} />,
    []
  )

  const StickyHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <SongsListStickyHeader list={list} allSongIds={songIds} />
        <div className="pt-6">
          <SongsListSubHeader list={list} />
        </div>
      </Fragment>
    ),
    []
  )

  const ListHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <SongsListSearch renderRight={<SongsListFilters />} />
        <div className="px-9 pb-3 pt-6">
          <SongsListSubHeader list={list} className="border-b" />
        </div>
      </Fragment>
    ),
    []
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

  return (
    <VirtualizedListWithHeaders
      className="p-9 pt-0"
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      ListFooterComponent={ListFooter}
      data={songs}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      numColumns={1}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, selected, toggle }) => (
        <SongItem song={item} selected={selected} onToggle={toggle} allSongIds={songIds} />
      )}
    />
  )
}

export { SongsList }
