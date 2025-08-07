import { useTranslation } from "@repo/i18n"

import { useFetchSongsWithRelations } from "../../hooks/useFetchSongsWithRelations"

import { columns } from "./columns"

import { NotFound, Spinner, VirtualizedTableGridWithHeaders } from "@components/ui"

import { ListHeader } from "./ListHeader"
import { RowContextMenuContent } from "./RowContextMenu"
import { SearchComponent } from "./Search"
import { StickyHeaderComponent } from "./StickyHeader"

const SongsList = () => {
  const { t, i18n } = useTranslation()

  const { data, isLoading } = useFetchSongsWithRelations()

  return (
    <VirtualizedTableGridWithHeaders
      ListEmptyComponent={() => (isLoading ? <Spinner /> : <NotFound />)}
      HeaderComponent={({ table }) => <ListHeader table={table} />}
      StickyHeaderComponent={({ table }) => <StickyHeaderComponent table={table} />}
      ListHeaderComponent={({ table }) => <SearchComponent table={table} />}
      containerClassName="overflow-x-hidden"
      columns={columns(t, i18n.language)}
      data={data ?? []}
      estimateSize={70}
      rowGridCols={["auto", "auto", "1fr", "1fr", "0.5fr", "minmax(50px,0.2fr)", "auto"]}
      rowContextMenuContent={() => <RowContextMenuContent />}
    />
  )
}

export { SongsList }
