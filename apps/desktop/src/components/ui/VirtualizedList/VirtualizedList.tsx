"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react"

import { useVirtualizer } from "@tanstack/react-virtual"

import { useEndReached, useResponsiveColumns, useSelection } from "./hooks"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"

import { VirtualRow } from "./components"

import type { VirtualizedListProps } from "./types"

function VirtualizedList<TItem>({
  data,
  keyExtractor,
  renderItem,
  estimateItemHeight,
  layout = "list",
  gridBreakpoints = {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    "2xl": 6
  },
  gap = 0,
  minItemWidth,
  containerClassName,
  rowClassName = "",
  rowStyle = {},
  ListEmptyComponent,
  ListFooterComponent,
  onSelectionChange,
  onController,
  onEndReached,
  onEndReachedThreshold = 0.1,
  scrollRef: externalScrollRef,
  className,
  ...props
}: VirtualizedListProps<TItem>) {
  const internalScrollRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = externalScrollRef || internalScrollRef

  const isGridLayout = layout === "grid"

  const { selectedIds, controller, handleToggleItem } = useSelection(
    data,
    keyExtractor,
    onSelectionChange
  )

  const { effectiveColumns, gridContainerRef } = useResponsiveColumns(isGridLayout, gridBreakpoints)

  const { getScrollElement, resetEndReached } = useEndReached(
    scrollRef,
    onEndReached,
    onEndReachedThreshold
  )

  useLayoutEffect(() => {
    onController?.(controller)
  }, [controller, onController])

  useEffect(() => {
    resetEndReached()
  }, [data, resetEndReached])

  const rowCount = useMemo(
    () => Math.ceil(data.length / effectiveColumns),
    [data.length, effectiveColumns]
  )

  const estimateSize = useCallback(() => estimateItemHeight, [estimateItemHeight])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize,
    overscan: 5,
    measureElement:
      typeof window !== "undefined" && navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const isListEmpty = data.length === 0
  const totalSize = rowVirtualizer.getTotalSize()

  const containerStyle = useMemo(
    () => ({
      height: `${totalSize}px`,
      position: "relative" as const,
      contain: "layout style paint" as const,
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const
    }),
    [totalSize]
  )

  return (
    <div
      ref={externalScrollRef ? undefined : internalScrollRef}
      className={containerClassName}
      style={{
        contain: "layout style paint",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
      {...props}
    >
      <Fade
        key={String(isListEmpty)}
        ref={gridContainerRef}
        className={cn("relative", isListEmpty && "flex h-full items-center justify-center")}
      >
        {isListEmpty ? (
          ListEmptyComponent ? (
            <ListEmptyComponent />
          ) : null
        ) : (
          <div style={containerStyle}>
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
                selectedIds={selectedIds}
                onToggleItem={handleToggleItem}
                totalRows={rowCount}
                measureRef={rowVirtualizer.measureElement}
              />
            ))}
          </div>
        )}
      </Fade>
      {controller && ListFooterComponent && <ListFooterComponent list={controller} />}
    </div>
  )
}

export { VirtualizedList }
