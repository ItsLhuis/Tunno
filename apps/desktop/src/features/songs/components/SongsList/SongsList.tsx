import { Fragment, useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongsWithRelations } from "../../hooks/useFetchSongsWithRelations"

import {
  NotFound,
  Spinner,
  type VirtualizedListController,
  VirtualizedListWithHeaders
} from "@components/ui"

import { HeaderComponent } from "./Header"
import { SearchComponent } from "./Search"
import { SongItem } from "./SongItem"
import { SongsListHeader } from "./SongsListHeader"
import { StickyHeaderComponent } from "./StickyHeader"

import { type QuerySongsParams, type SongWithRelations } from "@repo/api"

type SongListProps = { list: VirtualizedListController<SongWithRelations> }

const SongsList = () => {
  const { debouncedSearchTerm } = useSongsStore(
    useShallow((state) => ({
      debouncedSearchTerm: state.debouncedSearchTerm
    }))
  )

  const queryParams: QuerySongsParams = {
    filters: debouncedSearchTerm ? { search: debouncedSearchTerm } : undefined
  }

  const { data, isLoading } = useFetchSongsWithRelations(queryParams)

  const Header = useCallback(({ list }: SongListProps) => <HeaderComponent list={list} />, [])

  const StickyHeader = useCallback(
    ({ list }: SongListProps) => (
      <Fragment>
        <StickyHeaderComponent list={list} />
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
        <SearchComponent />
        <div className="px-9 pb-3 pt-6">
          <SongsListHeader list={list} className="border-b" />
        </div>
      </Fragment>
    ),
    []
  )

  const ListEmpty = useCallback(() => (isLoading ? <Spinner /> : <NotFound />), [isLoading])

  return (
    <VirtualizedListWithHeaders
      className="p-9 pt-0"
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmpty}
      data={data ?? []}
      keyExtractor={(item) => item.id.toString()}
      estimateItemHeight={70}
      numColumns={1}
      gap={8}
      renderItem={({ item, index, selected, toggle }) => (
        <SongItem
          song={item}
          index={index}
          selected={selected}
          onToggle={toggle}
          songs={data ?? []}
        />
      )}
    />
  )
}

export { SongsList }
