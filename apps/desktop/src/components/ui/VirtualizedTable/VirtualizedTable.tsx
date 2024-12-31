"use client"

import * as React from "react"

import { cn } from "@lib/utils"

import { HoveringFeature } from "./features/hover"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { useVirtualizer } from "@tanstack/react-virtual"

import { MoreHorizontal } from "lucide-react"

import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  Button
} from "@components/ui"

export interface VirtualizedTableProps<TData, TValue> {
  parentRef: React.MutableRefObject<HTMLDivElement | null>
  placeholder?: string
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  estimateSize: number
  rowClassName?: string
  rowStyle?: React.CSSProperties
}

const VirtualizedTable = <TData, TValue>({
  parentRef,
  placeholder = "Search",
  columns,
  data,
  estimateSize,
  rowClassName = "",
  rowStyle = {}
}: VirtualizedTableProps<TData, TValue>) => {
  const [globalFilter, setGlobalFilter] = React.useState<string | null>(null)

  const [sorting, setSorting] = React.useState<SortingState>([])

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const [rowSelection, setRowSelection] = React.useState({})

  const dataMemo = React.useMemo(() => data, [data])
  const columnsMemo = React.useMemo(() => columns, [columns])

  const table = useReactTable({
    _features: [HoveringFeature],
    data: dataMemo,
    columns: columnsMemo,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const { rows } = table.getRowModel()

  const estimateRowSize = React.useCallback(() => estimateSize, [estimateSize])

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: estimateRowSize,
    getScrollElement: () => parentRef.current,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  const handleGlobalFilterChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setGlobalFilter(event.target.value)
    },
    []
  )

  return (
    <div className="flex flex-col flex-1 w-full">
      <div className="flex items-center gap-3 py-3">
        <Input
          placeholder={placeholder}
          value={globalFilter ?? ""}
          onChange={handleGlobalFilterChange}
          className="flex-1"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="ml-auto">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="m-3 mt-0">
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
      </div>
      <div className="rounded-md">
        <Table className="relative overflow-hidden">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("flex w-full hover:bg-transparent mb-3", rowClassName)}
                style={rowStyle}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={header.column.columnDef.meta?.className}
                      style={{
                        width: header.column.columnDef.meta?.width
                          ? header.column.columnDef.meta?.width
                          : header.getSize()
                      }}
                    >
                      <div className="truncate">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rows.length === 0 ? (
              <TableRow className="flex w-full justify-center rounded-md">
                <TableCell colSpan={columns.length} className="text-center py-4">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index]
                return (
                  <TableRow
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={rowVirtualizer.measureElement}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn("flex absolute w-full border-none rounded-md", rowClassName)}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                      ...rowStyle
                    }}
                    onMouseEnter={() => row.toggleHovered()}
                    onMouseLeave={() => row.toggleHovered()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cell.column.columnDef.meta?.className}
                        style={{
                          width: cell.column.columnDef.meta?.width
                            ? cell.column.columnDef.meta?.width
                            : cell.column.getSize()
                        }}
                      >
                        <div className="truncate">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
VirtualizedTable.displayName = "VirtualizedTable"

export { VirtualizedTable }
