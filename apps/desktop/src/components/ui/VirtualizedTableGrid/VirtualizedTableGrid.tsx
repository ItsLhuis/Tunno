"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type MutableRefObject,
  type ReactNode
} from "react"

import { cn } from "@lib/utils"

import { Focusing } from "./features/focus"
import { Hovering } from "./features/hover"

import {
  ColumnDef,
  ColumnFiltersState,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"

import { useVirtualizer } from "@tanstack/react-virtual"

import { Loader } from "@/components/ui/Loader"
import { Button } from "@components/ui/Button"
import { ContextMenu, ContextMenuTrigger } from "@components/ui/ContextMenu"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@components/ui/DropdownMenu"
import { Icon } from "@components/ui/Icon"
import { SearchInput } from "@components/ui/SearchInput"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table"

import { AnimatePresence, motion } from "motion/react"

export type VirtualizedTableGridHeaderProps<TData> = {
  containerProps?: HTMLAttributes<HTMLDivElement>
  children?: (table: TanStackTable<TData>) => ReactNode
  placeholder?: string
  onVisibleColumnsChange?: (visibleColumns: VisibilityState) => void
  sticky?: {
    containerProps?: HTMLAttributes<HTMLDivElement>
    tableHeaderProps?: HTMLAttributes<HTMLDivElement>
    children?: (table: TanStackTable<TData>) => ReactNode
    threshold?: number
  }
}

export type VirtualizedTableGridProps<TData, TValue> = HTMLAttributes<HTMLDivElement> & {
  header?: VirtualizedTableGridHeaderProps<TData>
  parentRef: MutableRefObject<HTMLDivElement | null>
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  estimateSize: number
  rowContextMenuContent?: (table: TanStackTable<TData>) => ReactNode
  rowGridCols?: Array<string | number>
  rowClassName?: string
  rowStyle?: React.CSSProperties
  initialVisibleColumns?: VisibilityState
  isLoading?: boolean
}

const VirtualizedTableGrid = <TData, TValue>({
  parentRef,
  header,
  columns,
  data,
  estimateSize,
  rowContextMenuContent,
  rowGridCols = [],
  rowClassName = "",
  rowStyle = {},
  initialVisibleColumns = {},
  isLoading = false,
  className,
  ...props
}: VirtualizedTableGridProps<TData, TValue>) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const [globalFilter, setGlobalFilter] = useState<string | null>(null)

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibleColumns)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    _features: [Focusing, Hovering],
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: (updater) => {
      const columns = typeof updater === "function" ? updater(columnVisibility) : updater
      setColumnVisibility(columns)
      header?.onVisibleColumnsChange?.(columns)
    },
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

  const estimateRowSize = useCallback(() => estimateSize, [estimateSize])

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

  const handleGlobalFilterChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(event.target.value)
  }, [])

  const visibleColumns = useMemo(
    () => table.getAllColumns().filter((col) => col.getIsVisible()),
    [columnVisibility]
  )

  const dynamicGridCols = useMemo(() => {
    return visibleColumns
      .map((column) => {
        const columnIndex = table.getAllColumns().indexOf(column)
        return rowGridCols[columnIndex] || "1fr"
      })
      .join(" ")
  }, [visibleColumns])

  const handleScroll = useCallback(() => {
    if (parentRef.current) {
      const scrollTop = parentRef.current.scrollTop
      const threshold = header?.sticky?.threshold ?? 260
      setIsScrolled(scrollTop > threshold)
    }
  }, [parentRef, header?.sticky?.threshold])

  useEffect(() => {
    const parent = parentRef.current
    if (parent) {
      parent.addEventListener("scroll", handleScroll)
      return () => parent.removeEventListener("scroll", handleScroll)
    }
  }, [parentRef])

  return (
    <div className={cn("relative flex flex-col flex-1 w-full", isLoading && "h-full")}>
      <AnimatePresence mode="popLayout">
        {isScrolled && (
          <motion.div
            className="sticky top-0 left-0 right-0 bg-background/60 backdrop-blur z-50 w-full transition-[background-color]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className={header?.sticky?.containerProps?.className}
              {...header?.sticky?.containerProps}
            >
              {header?.sticky?.children?.(table)}
              <div
                className={header?.sticky?.tableHeaderProps?.className}
                {...header?.sticky?.tableHeaderProps}
              >
                {table.getHeaderGroups().map((headerGroup) => (
                  <div
                    key={headerGroup.id}
                    className={cn("grid w-full hover:bg-transparent", rowClassName)}
                    style={{ gridTemplateColumns: dynamicGridCols, ...rowStyle }}
                  >
                    {headerGroup.headers.map((header) => {
                      return (
                        <div
                          key={header.id}
                          className={cn(
                            "p-3 flex items-center font-medium text-muted-foreground",
                            header.column.columnDef.meta?.className
                          )}
                          style={{
                            width: header.column.columnDef.meta?.width
                              ? header.column.columnDef.meta?.width
                              : header.getSize()
                          }}
                        >
                          <div className="text-sm truncate">
                            {header.isPlaceholder
                              ? null
                              : flexRender(header.column.columnDef.header, header.getContext())}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={cn("flex flex-col gap-3 pt-3", header?.containerProps?.className)}
        {...header?.containerProps}
      >
        {header?.children?.(table)}
        <div className="flex items-center gap-2">
          <SearchInput
            placeholder={header?.placeholder ?? "Search"}
            value={globalFilter ?? ""}
            onChange={handleGlobalFilterChange}
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
        </div>
      </div>
      <div className={cn("h-full", className)} {...props}>
        <Table className={cn("relative overflow-hidden mt-3", isLoading && "h-full")}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("grid w-full hover:bg-transparent mb-3", rowClassName)}
                style={{ gridTemplateColumns: dynamicGridCols, ...rowStyle }}
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
          <motion.tbody
            key={String(isLoading)}
            style={{ height: isLoading ? "100%" : `${rowVirtualizer.getTotalSize()}px` }}
            className={cn(isLoading && "flex justify-center items-center h-full")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isLoading ? (
              <div className="flex items-center min-h-14">
                <Loader />
              </div>
            ) : rows.length === 0 ? (
              <TableRow className="flex w-full justify-center rounded-md border-none">
                <TableCell colSpan={columns.length} className="text-center py-4">
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              virtualRows.map((virtualRow) => {
                const row = rows[virtualRow.index]
                return (
                  <ContextMenu key={row.id}>
                    <ContextMenuTrigger asChild>
                      <TableRow
                        data-index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        data-state={row.getIsSelected() && "selected"}
                        className={cn("grid absolute w-full border-none rounded-md", rowClassName)}
                        style={{
                          transform: `translateY(${virtualRow.start}px)`,
                          gridTemplateColumns: dynamicGridCols,
                          ...rowStyle
                        }}
                        onFocus={() => row.toggleFocused()}
                        onBlur={() => row.toggleFocused()}
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
                            <div className="flex-1 truncate">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </ContextMenuTrigger>
                    {rowContextMenuContent?.(table)}
                  </ContextMenu>
                )
              })
            )}
          </motion.tbody>
        </Table>
      </div>
    </div>
  )
}
VirtualizedTableGrid.displayName = "VirtualizedTableGrid"

export { VirtualizedTableGrid }
