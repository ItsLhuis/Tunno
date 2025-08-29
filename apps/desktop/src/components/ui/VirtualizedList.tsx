"use client"

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode
} from "react"

import { useVirtualizer } from "@tanstack/react-virtual"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"

export type VirtualizedListController<TItem> = {
  data: TItem[]
  selectedIds: string[]
  isAllSelected: boolean
  hasSelection: boolean
  selectedCount: number
  toggleSelect: (id: string, additive?: boolean) => void
  selectAll: () => void
  clearSelection: () => void
}

export type VirtualizedListProps<TItem> = HTMLAttributes<HTMLDivElement> & {
  data: TItem[]
  keyExtractor: (item: TItem, index: number) => string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  estimateItemHeight: number
  numColumns?: number
  gap?: number
  minItemWidth?: number
  containerClassName?: string
  rowClassName?: string
  rowStyle?: CSSProperties
  ListEmptyComponent?: React.ComponentType
  onSelectionChange?: (selectedIds: string[], selectedItems: TItem[]) => void
  onController?: (controller: VirtualizedListController<TItem>) => void
  scrollRef?: React.RefObject<HTMLDivElement>
}

type VirtualizedItemProps<TItem> = {
  item: TItem
  index: number
  id: string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  isSelected: boolean
  onToggle: () => void
  isLastRow: boolean
  gap: number
}

const VirtualizedItem = memo(function VirtualizedItem<TItem>({
  item,
  index,
  id,
  renderItem,
  isSelected,
  onToggle,
  isLastRow,
  gap
}: VirtualizedItemProps<TItem>) {
  return (
    <div
      key={id}
      className={cn("group relative")}
      style={{
        marginBottom: !isLastRow && gap > 0 ? `${gap}px` : undefined
      }}
    >
      {renderItem({ item, index, selected: isSelected, toggle: onToggle })}
    </div>
  )
}) as <TItem>(props: VirtualizedItemProps<TItem>) => ReactElement

type VirtualRowProps<TItem> = {
  virtualRow: any
  data: TItem[]
  effectiveColumns: number
  keyExtractor: (item: TItem, index: number) => string
  renderItem: (args: {
    item: TItem
    index: number
    selected: boolean
    toggle: () => void
  }) => ReactNode
  gap: number
  rowClassName: string
  rowStyle: CSSProperties
  selectionState: Record<string, boolean>
  onToggleItem: (id: string) => void
  totalRows: number
  measureRef: (element: HTMLElement | null) => void
}

const VirtualRow = memo(function VirtualRow<TItem>({
  virtualRow,
  data,
  effectiveColumns,
  keyExtractor,
  renderItem,
  gap,
  rowClassName,
  rowStyle,
  selectionState,
  onToggleItem,
  totalRows,
  measureRef
}: VirtualRowProps<TItem>) {
  const fromIndex = virtualRow.index * effectiveColumns
  const toIndex = Math.min(fromIndex + effectiveColumns, data.length)

  const rowItems = useMemo(() => data.slice(fromIndex, toIndex), [data, fromIndex, toIndex])

  const toggleHandlers = useMemo(() => {
    const handlers = new Map<string, () => void>()

    rowItems.forEach((item, idx) => {
      const index = fromIndex + idx
      const id = keyExtractor(item, index)
      handlers.set(id, () => onToggleItem(id))
    })

    return handlers
  }, [rowItems, fromIndex, keyExtractor, onToggleItem])

  const isLastRow = virtualRow.index === totalRows - 1

  return (
    <div
      key={virtualRow.key}
      data-index={virtualRow.index}
      ref={measureRef}
      className={cn("absolute left-0 right-0")}
      style={{
        transform: `translateY(${virtualRow.start}px)`
      }}
    >
      <div
        className={cn("grid", rowClassName)}
        style={{
          gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
          gap: gap,
          ...rowStyle
        }}
      >
        {rowItems.map((item, idx) => {
          const index = fromIndex + idx
          const id = keyExtractor(item, index)
          const isSelected = selectionState[id] ?? false
          const toggle = toggleHandlers.get(id)!

          return (
            <VirtualizedItem
              key={id}
              item={item}
              index={index}
              id={id}
              renderItem={renderItem}
              isSelected={isSelected}
              onToggle={toggle}
              isLastRow={isLastRow}
              gap={gap}
            />
          )
        })}
      </div>
    </div>
  )
}) as <TItem>(props: VirtualRowProps<TItem>) => ReactElement

function VirtualizedList<TItem>({
  data,
  keyExtractor,
  renderItem,
  estimateItemHeight,
  numColumns = 1,
  gap = 0,
  minItemWidth,
  containerClassName,
  rowClassName = "",
  rowStyle = {},
  ListEmptyComponent,
  onSelectionChange,
  onController,
  scrollRef: externalScrollRef,
  className,
  ...props
}: VirtualizedListProps<TItem>) {
  const internalScrollRef = useRef<HTMLDivElement | null>(null)
  const gridContainerRef = useRef<HTMLDivElement | null>(null)

  const [selectionState, setSelectionState] = useState<Record<string, boolean>>({})

  const scrollRef = externalScrollRef || internalScrollRef

  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    const element = gridContainerRef.current

    if (!element) return

    let rafId: number

    const resizeObserver = new ResizeObserver((entries) => {
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        const entry = entries[0]
        if (entry?.contentRect?.width != null) {
          setContainerWidth(entry.contentRect.width)
        }
      })
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const dataIds = useMemo(
    () => data.map((item, index) => keyExtractor(item, index)),
    [data, keyExtractor]
  )

  const selectionStats = useMemo(() => {
    const selectedIds = Object.keys(selectionState).filter((id) => selectionState[id])
    const selectedCount = selectedIds.length
    const totalCount = data.length

    return {
      selectedIds,
      selectedCount,
      isAllSelected: selectedCount === totalCount && totalCount > 0,
      hasSelection: selectedCount > 0
    }
  }, [selectionState, data.length])

  const handleToggleItem = useCallback((id: string, additive = true) => {
    setSelectionState((prev) => {
      const isCurrentlySelected = prev[id] ?? false

      if (!additive) {
        return { [id]: !isCurrentlySelected }
      }

      const newState = { ...prev }

      if (isCurrentlySelected) {
        delete newState[id]
      } else {
        newState[id] = true
      }

      return newState
    })
  }, [])

  const handleSelectAll = useCallback(() => {
    setSelectionState(() => {
      const newState: Record<string, boolean> = {}

      dataIds.forEach((id) => {
        newState[id] = true
      })

      return newState
    })
  }, [dataIds])

  const handleClearSelection = useCallback(() => {
    setSelectionState({})
  }, [])

  const controller = useMemo<VirtualizedListController<TItem>>(
    () => ({
      data,
      selectedIds: selectionStats.selectedIds,
      isAllSelected: selectionStats.isAllSelected,
      hasSelection: selectionStats.hasSelection,
      selectedCount: selectionStats.selectedCount,
      toggleSelect: handleToggleItem,
      selectAll: handleSelectAll,
      clearSelection: handleClearSelection
    }),
    [data, selectionStats, handleToggleItem, handleSelectAll, handleClearSelection]
  )

  useEffect(() => {
    if (!onSelectionChange) return

    const selectedItems = data.filter((item, index) => {
      const id = keyExtractor(item, index)
      return selectionState[id] ?? false
    })

    onSelectionChange(selectionStats.selectedIds, selectedItems)
  }, [onSelectionChange, data, keyExtractor, selectionStats.selectedIds, selectionState])

  useEffect(() => {
    onController?.(controller)
  }, [controller, onController])

  const effectiveColumns = useMemo(() => {
    if (minItemWidth && containerWidth > 0) {
      const availableWidth = containerWidth
      const itemWidthWithGap = minItemWidth + gap
      const calculatedColumns = Math.floor(availableWidth / itemWidthWithGap)

      return Math.max(1, Math.min(calculatedColumns, numColumns))
    }

    return Math.max(1, numColumns)
  }, [containerWidth, minItemWidth, numColumns, gap])

  const rowCount = useMemo(
    () => Math.ceil(data.length / effectiveColumns),
    [data.length, effectiveColumns]
  )

  const getScrollElement = useCallback(() => {
    if (!scrollRef.current) return null

    const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
    return viewport ? (viewport as HTMLElement) : scrollRef.current
  }, [scrollRef])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize: () => estimateItemHeight,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5
  })

  const virtualRows = rowVirtualizer.getVirtualItems()

  const isListEmpty = data.length === 0

  return (
    <div
      ref={externalScrollRef ? undefined : internalScrollRef}
      className={cn("relative", containerClassName)}
      {...props}
    >
      <Fade
        key={String(isListEmpty)}
        ref={gridContainerRef}
        className={cn("relative", isListEmpty && "flex h-full items-center justify-center")}
      >
        {isListEmpty ? (
          ListEmptyComponent ? (
            <div className="flex min-h-14 items-center justify-center">
              <ListEmptyComponent />
            </div>
          ) : null
        ) : (
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {virtualRows.map((virtualRow) => (
              <VirtualRow
                key={virtualRow.key}
                virtualRow={virtualRow}
                data={data}
                effectiveColumns={effectiveColumns}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                gap={gap}
                rowClassName={rowClassName}
                rowStyle={rowStyle}
                selectionState={selectionState}
                onToggleItem={handleToggleItem}
                totalRows={rowCount}
                measureRef={rowVirtualizer.measureElement}
              />
            ))}
          </div>
        )}
      </Fade>
    </div>
  )
}

export { VirtualizedList }
