import { useTranslation } from "@repo/i18n"
import { useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { type Table, type VisibilityState } from "@tanstack/react-table"

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Icon,
  SearchInput
} from "@components/ui"

import { type SongWithRelations } from "@repo/api"

type SearchComponentProps = {
  table: Table<SongWithRelations>
}

const SearchComponent = ({ table }: SearchComponentProps) => {
  const { t } = useTranslation()

  const { searchTerm, setSearchTerm, visibleColumns, setVisibleColumns } = useSongsStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm,
      visibleColumns: state.visibleColumns,
      setVisibleColumns: state.setVisibleColumns
    }))
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  const handleColumnToggle = useCallback(
    (columnId: string, value: boolean) => {
      const newVisible: VisibilityState = {
        ...visibleColumns,
        [columnId]: value
      }
      setVisibleColumns(newVisible)
      table.getColumn(columnId)?.toggleVisibility(value)
    },
    [visibleColumns, setVisibleColumns, table]
  )

  return (
    <SearchInput
      containerClassName="p-9 pb-0 pt-6"
      value={searchTerm}
      onChange={handleInputChange}
      className="flex-1"
      renderRight={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{t("common.visibility")}</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>{t("common.columns")}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={visibleColumns[column.id] ?? true}
                      onCheckedChange={(value) => handleColumnToggle(column.id, !!value)}
                    >
                      {column.columnDef.meta?.headerText}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    />
  )
}

export { SearchComponent }
