import { useCallback } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { useFetchSongsWithRelations } from "../../hooks/useFetchSongsWithRelations"

import { columns } from "./columns"

import { type Table } from "@tanstack/react-table"

import { NotFound, Spinner, VirtualizedTableGridWithHeaders } from "@components/ui"

import { HeaderComponent } from "./Header"
import { RowContextMenuContentComponent } from "./RowContextMenu"
import { SearchComponent } from "./Search"
import { StickyHeaderComponent } from "./StickyHeader"

import { type QuerySongsParams, type SongWithRelations } from "@repo/api"

type TableComponentProps = { table: Table<SongWithRelations> }

const SongsList = () => {
  const { t, i18n } = useTranslation()

  const { debouncedSearchTerm, visibleColumns } = useSongsStore(
    useShallow((state) => ({
      debouncedSearchTerm: state.debouncedSearchTerm,
      visibleColumns: state.visibleColumns
    }))
  )

  const queryParams: QuerySongsParams = {
    filters: debouncedSearchTerm ? { search: debouncedSearchTerm } : undefined
  }

  const { data, isLoading } = useFetchSongsWithRelations(queryParams)

  const tableColumns = columns({ t, language: i18n.language, songs: data })

  const ListEmpty = useCallback(() => (isLoading ? <Spinner /> : <NotFound />), [isLoading])

  const Header = useCallback(
    ({ table }: TableComponentProps) => <HeaderComponent table={table} />,
    []
  )

  const StickyHeader = useCallback(
    ({ table }: TableComponentProps) => <StickyHeaderComponent table={table} />,
    []
  )

  const ListHeader = useCallback(
    ({ table }: TableComponentProps) => <SearchComponent table={table} />,
    []
  )

  const RowContextMenuContent = useCallback(() => <RowContextMenuContentComponent />, [])

  return (
    <VirtualizedTableGridWithHeaders
      ListEmptyComponent={ListEmpty}
      HeaderComponent={Header}
      StickyHeaderComponent={StickyHeader}
      ListHeaderComponent={ListHeader}
      containerClassName="overflow-x-hidden"
      columns={tableColumns}
      data={data ?? []}
      estimateSize={70}
      rowGridCols={["auto", "auto", "1fr", "1fr", "0.5fr", "minmax(50px,0.2fr)", "auto"]}
      rowContextMenuContent={RowContextMenuContent}
      initialVisibleColumns={visibleColumns}
    />
  )
}

export { SongsList }
