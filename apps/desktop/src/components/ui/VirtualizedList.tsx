"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode
} from "react"

import { useVirtualizer } from "@tanstack/react-virtual"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"

export type VirtualizedListController<TItem> = {
  data: TItem[]
  selectedIds: Record<string, boolean>
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

const VirtualizedList = <TItem,>({
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
}: VirtualizedListProps<TItem>) => {
  const internalScrollRef = useRef<HTMLDivElement | null>(null)
  const gridContainerRef = useRef<HTMLDivElement | null>(null)

  const scrollRef = externalScrollRef || internalScrollRef

  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    const element = gridContainerRef.current
    if (!element) return
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry?.contentRect?.width != null) {
        setContainerWidth(entry.contentRect.width)
      }
    })
    resizeObserver.observe(element)
    return () => resizeObserver.disconnect()
  }, [])

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>({})

  const isAllSelected = useMemo(() => {
    if (data.length === 0) return false
    return data.every((item, index) => selectedIds[keyExtractor(item, index)])
  }, [data, selectedIds, keyExtractor])

  const hasSelection = useMemo(() => {
    return data.some((item, index) => selectedIds[keyExtractor(item, index)])
  }, [data, selectedIds, keyExtractor])

  const selectedCount = useMemo(() => {
    return data.filter((item, index) => selectedIds[keyExtractor(item, index)]).length
  }, [data, selectedIds, keyExtractor])

  const emitSelectionChange = useCallback(
    (next: Record<string, boolean>) => {
      if (!onSelectionChange) return
      const selectedItems = data.filter((item, index) => next[keyExtractor(item, index)])
      const selectedIds = selectedItems.map((item, index) => keyExtractor(item, index))
      onSelectionChange(selectedIds, selectedItems)
    },
    [onSelectionChange, data, keyExtractor]
  )

  const toggleSelect = useCallback(
    (id: string, additive = true) => {
      setSelectedIds((prev) => {
        const next = additive ? { ...prev, [id]: !prev[id] } : { [id]: !prev[id] }
        emitSelectionChange(next)
        return next
      })
    },
    [emitSelectionChange]
  )

  const selectAll = useCallback(() => {
    setSelectedIds((_) => {
      const all: Record<string, boolean> = {}
      data.forEach((item, index) => {
        const id = keyExtractor(item, index)
        all[id] = true
      })
      emitSelectionChange(all)
      return all
    })
  }, [data, keyExtractor, emitSelectionChange])

  const clearSelection = useCallback(() => {
    setSelectedIds(() => {
      const empty: Record<string, boolean> = {}
      emitSelectionChange(empty)
      return empty
    })
  }, [emitSelectionChange])

  const controller: VirtualizedListController<TItem> = useMemo(
    () => ({
      data,
      selectedIds,
      isAllSelected,
      hasSelection,
      selectedCount,
      toggleSelect,
      selectAll,
      clearSelection
    }),
    [
      data,
      selectedIds,
      isAllSelected,
      hasSelection,
      selectedCount,
      toggleSelect,
      selectAll,
      clearSelection
    ]
  )

  useEffect(() => {
    onController?.(controller)
  }, [controller, onController])

  const effectiveColumns = useMemo(() => {
    if (numColumns > 1 && minItemWidth && containerWidth) {
      const cols = Math.max(1, Math.floor((containerWidth + gap) / (minItemWidth + gap)))
      return Math.max(1, Math.min(cols, numColumns))
    }
    return Math.max(1, numColumns)
  }, [numColumns, minItemWidth, containerWidth, gap])

  const rowCount = useMemo(
    () => Math.ceil(data.length / effectiveColumns),
    [data.length, effectiveColumns]
  )

  const estimateRowSize = useCallback(() => {
    return estimateItemHeight + gap
  }, [estimateItemHeight, gap])

  const getScrollElement = useCallback(() => {
    if (!scrollRef.current) return null

    const viewport = scrollRef.current.querySelector("[data-radix-scroll-area-viewport]")
    if (viewport) {
      return viewport as HTMLElement
    }

    return scrollRef.current
  }, [scrollRef])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    estimateSize: estimateRowSize,
    getScrollElement,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10
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
            {virtualRows.map((virtualRow) => {
              const fromIndex = virtualRow.index * effectiveColumns
              const toIndex = Math.min(fromIndex + effectiveColumns, data.length)
              const rowItems = data.slice(fromIndex, toIndex)

              return (
                <div
                  key={virtualRow.key}
                  data-index={virtualRow.index}
                  ref={rowVirtualizer.measureElement}
                  className={cn("absolute left-0 right-0")}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                    minHeight: estimateItemHeight
                  }}
                >
                  <div
                    className={cn("grid", rowClassName)}
                    style={{
                      gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
                      ...rowStyle
                    }}
                  >
                    {rowItems.map((item, idx) => {
                      const index = fromIndex + idx
                      const id = keyExtractor(item, index)
                      const selected = Boolean(selectedIds[id])
                      const toggle = () => toggleSelect(id, true)

                      return (
                        <div
                          key={id}
                          className={cn("group relative")}
                          style={{
                            marginBottom: gap > 0 ? `${gap}px` : undefined,
                            marginRight: effectiveColumns > 1 && gap > 0 ? `${gap}px` : undefined
                          }}
                        >
                          {renderItem({ item, index, selected, toggle })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Fade>
    </div>
  )
}

export { VirtualizedList }
