"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from "react"

import { cn } from "@lib/utils"

import { useTranslation } from "@repo/i18n"

import { useScroll } from "./hooks"

import { useVirtualizer } from "@tanstack/react-virtual"

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  Table as TanStackTable,
  useReactTable,
  type VisibilityState
} from "@tanstack/react-table"

import { ContextMenu, ContextMenuTrigger } from "@components/ui/ContextMenu"
import { Fade } from "@components/ui/Fade"
import { ScrollArea } from "@components/ui/ScrollArea"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/Table"

import { type SharedScrollContainerProps } from "./types"

export type VirtualizedTableGridWithHeadersProps<TData, TValue> = HTMLAttributes<HTMLDivElement> &
  SharedScrollContainerProps & {
    HeaderComponent: ComponentType<{ table: TanStackTable<TData> }>
    StickyHeaderComponent?: ComponentType<{ table: TanStackTable<TData> }>
    ListHeaderComponent?: ComponentType<{ table: TanStackTable<TData> }>
    ListEmptyComponent?: ComponentType
    stickyHeaderContainerClassName?: string
    containerClassName?: string
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    estimateSize: number
    rowContextMenuContent?: (table: TanStackTable<TData>) => ReactNode
    rowGridCols?: Array<string | number>
    rowClassName?: string
    rowStyle?: CSSProperties
    showTableColumns?: boolean
    initialVisibleColumns?: VisibilityState
  }

const VirtualizedTableGridWithHeaders = <TData, TValue>({
  HeaderComponent,
  StickyHeaderComponent,
  ListHeaderComponent,
  ListEmptyComponent,
  stickyHeaderContainerClassName,
  stickHeaderThreshold = 10,
  containerClassName,
  columns,
  data,
  estimateSize,
  rowContextMenuContent,
  rowGridCols = [],
  rowClassName = "",
  rowStyle = {},
  showTableColumns = true,
  initialVisibleColumns = {},
  className,
  ...props
}: VirtualizedTableGridWithHeadersProps<TData, TValue>) => {
  const { t } = useTranslation()

  const scrollRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)
  const tableHeaderRef = useRef<HTMLTableSectionElement | null>(null)

  const [headerHeight, setHeaderHeight] = useState<number>(0)

  const { isScrolled } = useScroll({
    scrollRef,
    headerHeight
  })

  const calculateHeaderHeight = useCallback(() => {
    let totalHeight = 0
    if (headerRef.current) {
      totalHeight += headerRef.current.getBoundingClientRect().height
    }
    if (showTableColumns && tableHeaderRef.current) {
      totalHeight += tableHeaderRef.current.getBoundingClientRect().height
    }
    setHeaderHeight(totalHeight + stickHeaderThreshold)
  }, [headerRef, tableHeaderRef, showTableColumns, stickHeaderThreshold])

  useEffect(() => {
    calculateHeaderHeight()
  }, [])

  const [sorting, setSorting] = useState<SortingState>([])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialVisibleColumns)

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
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
    },
    onRowSelectionChange: setRowSelection,
    state: {
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
    getScrollElement: () => scrollRef.current,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

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

  const isListEmpty = virtualRows.length === 0

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn(
        "h-full w-full flex-1 bg-background transition-[background-color]",
        containerClassName
      )}
    >
      <div className={cn("relative flex w-full flex-1 flex-col", isListEmpty && "h-full")}>
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "sticky left-0 right-0 top-0 z-50 flex w-full flex-1 flex-col border-b border-border bg-background/50 px-9 backdrop-blur transition-[background-color,border-color]",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && <StickyHeaderComponent table={table} />}
          {showTableColumns && (
            <div className="w-full">
              {table.getHeaderGroups().map((headerGroup) => (
                <div
                  key={headerGroup.id}
                  className={cn("grid w-full", rowClassName)}
                  style={{ gridTemplateColumns: dynamicGridCols, ...rowStyle }}
                >
                  {headerGroup.headers.map((header) => (
                    <div
                      key={header.id}
                      className={cn(
                        "flex items-center truncate p-3 font-medium text-muted-foreground",
                        header.column.columnDef.meta?.className
                      )}
                      style={{
                        width: header.column.columnDef.meta?.width
                          ? header.column.columnDef.meta?.width
                          : "100%"
                      }}
                    >
                      <div className="truncate text-sm transition-colors">
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </Fade>
        <div ref={headerRef}>
          <HeaderComponent table={table} />
          {ListHeaderComponent && <ListHeaderComponent table={table} />}
        </div>
        <div
          className={cn(
            "h-full p-9 pt-3 transition-[padding]",
            !showTableColumns && "pt-6",
            className
          )}
          {...props}
        >
          <Table className={cn("relative overflow-hidden", isListEmpty && "h-full")}>
            {showTableColumns && (
              <TableHeader ref={tableHeaderRef}>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className={cn(
                      "mb-3 grid w-full focus-within:bg-transparent hover:bg-transparent",
                      rowClassName
                    )}
                    style={{ gridTemplateColumns: dynamicGridCols, ...rowStyle }}
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className={cn("truncate", header.column.columnDef.meta?.className)}
                        style={{
                          width: header.column.columnDef.meta?.width
                            ? header.column.columnDef.meta?.width
                            : "100%"
                        }}
                      >
                        <div className="truncate transition-colors">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
            )}
            <Fade
              key={String(isListEmpty)}
              as="tbody"
              style={{ height: isListEmpty ? "100%" : `${rowVirtualizer.getTotalSize()}px` }}
              className={cn(isListEmpty && "flex h-full items-center justify-center")}
            >
              {isListEmpty ? (
                <TableRow className="flex min-h-14 items-center border-none hover:bg-transparent">
                  <TableCell>
                    {ListEmptyComponent ? <ListEmptyComponent /> : t("common.noResultsFound")}
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
                          className={cn(
                            "absolute grid w-full rounded-md border-none",
                            rowClassName,
                            "group"
                          )}
                          style={{
                            transform: `translateY(${virtualRow.start}px)`,
                            gridTemplateColumns: dynamicGridCols,
                            ...rowStyle
                          }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className={cn("truncate", cell.column.columnDef.meta?.className)}
                              style={{
                                width: cell.column.columnDef.meta?.width
                                  ? cell.column.columnDef.meta?.width
                                  : "100%"
                              }}
                            >
                              <div className="flex-1 truncate transition-colors">
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
            </Fade>
          </Table>
        </div>
      </div>
    </ScrollArea>
  )
}

export { VirtualizedTableGridWithHeaders }
