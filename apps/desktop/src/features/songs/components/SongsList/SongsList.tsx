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

import { Filters } from "./Filters"
import { HeaderComponent } from "./Header"
import { SearchComponent } from "./Search"
import { SongItem } from "./SongItem"
import { SongsListHeader } from "./SongsListHeader"
import { StickyHeaderComponent } from "./StickyHeader"

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
    ({ list }: SongListProps) => <HeaderComponent list={list} allSongIds={songIds} />,
    []
  )

  const StickyHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <StickyHeaderComponent list={list} allSongIds={songIds} />
        <div className="pt-6">
          <SongsListHeader list={list} />
        </div>
      </Fragment>
    ),
    []
  )

  const ListHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <SearchComponent renderRight={<Filters />} />
        <div className="px-9 pb-3 pt-6">
          <SongsListHeader list={list} className="border-b" />
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
      onEndReachedThreshold={0.5}
      renderItem={({ item, selected, toggle }) => (
        <SongItem song={item} selected={selected} onToggle={toggle} allSongIds={songIds} />
      )}
    />
  )
}

export { SongsList }
