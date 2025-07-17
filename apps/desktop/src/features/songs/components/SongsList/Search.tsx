import { useEffect, useMemo, useState } from "react"

import { debounce } from "lodash"

import { Table } from "@tanstack/react-table"

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

const SearchComponent = ({ table }: { table: Table<SongWithRelations> }) => {
  const [searchTerm, setSearchTerm] = useState("")

  const debouncedSetGlobalFilter = useMemo(
    () => debounce((value) => table.setGlobalFilter(value), 300),
    [table]
  )

  useEffect(() => {
    debouncedSetGlobalFilter(searchTerm)
  }, [searchTerm, debouncedSetGlobalFilter])

  return (
    <SearchInput
      containerClassName="p-9 pb-0 pt-6"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1"
      renderRight={
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Icon name="MoreHorizontal" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Visibility</DropdownMenuLabel>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Columns</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
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
