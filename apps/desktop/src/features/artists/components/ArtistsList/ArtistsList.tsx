import { Fragment, useCallback, useMemo } from "react"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { useFetchArtistsInfinite } from "../../hooks/useFetchArtistsInfinite"

import { useFetchArtistIds } from "../../hooks/useFetchArtistIds"

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
  const { debouncedFilters, orderBy } = useArtistsStore(
    useShallow((state) => ({
      debouncedFilters: state.debouncedFilters,
      orderBy: state.orderBy
    }))
  )

  const queryParams: QueryArtistParams = {
    orderBy: orderBy || { column: "createdAt", direction: "desc" },
    filters: Object.keys(debouncedFilters).length > 0 ? debouncedFilters : undefined
  }

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFetchArtistsInfinite(queryParams)

  const { data: allArtistIds } = useFetchArtistIds(queryParams)

  const artists = useMemo(() => {
    if (!data?.pages) return []
    return data.pages.flatMap((page) => page.artists)
  }, [data?.pages])

  const artistIds = useMemo(() => allArtistIds || [], [allArtistIds])

  const Header = useCallback(
    ({ list }: ArtistsListProps) => <ArtistsListHeader list={list} allArtistIds={artistIds} />,
    [artistIds]
  )

  const StickyHeader = useCallback(
    ({ list }: ArtistsListProps) => (
      <Fragment>
        <ArtistsListStickyHeader list={list} allArtistIds={artistIds} />
        <div className="pt-6">
          <ArtistsListSubHeader list={list} />
        </div>
      </Fragment>
    ),
    [artistIds]
  )

  const ListHeader = useCallback(
    ({ list }: ArtistsListProps) => (
      <Fragment>
        <ArtistsListSearch renderRight={<ArtistsListFilters />} />
        <div className="px-9 pb-3 pt-6">
          <ArtistsListSubHeader list={list} className="border-b" />
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
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      gap={8}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      renderItem={({ item, selected, toggle }) => (
        <ArtistItem artist={item} variant="list" selected={selected} onToggle={toggle} />
      )}
    />
  )
}

export { ArtistsList }
