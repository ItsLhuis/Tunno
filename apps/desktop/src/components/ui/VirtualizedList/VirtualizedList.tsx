"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react"

import { useVirtualizer } from "@tanstack/react-virtual"

import { createSelectionManager, useSelection } from "@repo/utils"

import { useEndReached, useResponsiveColumns } from "./hooks"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"

import { VirtualRow } from "./components"

import { type VirtualizedListProps } from "./types"

const VirtualizedList = <TItem,>({
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
  onVirtualizer,
  onEndReached,
  onEndReachedThreshold = 0.1,
  scrollRef: externalScrollRef,
  className,
  ...props
}: VirtualizedListProps<TItem>) => {
  const internalScrollRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = externalScrollRef || internalScrollRef
  const previousScrollRefRef = useRef(externalScrollRef)

  const hasMeasuredRef = useRef(false)

  const isGridLayout = layout === "grid"

  const keyExtractorRef = useRef(keyExtractor)

  keyExtractorRef.current = keyExtractor

  const selectionManager = useMemo(
    () => createSelectionManager((item, index) => keyExtractorRef.current(item, index ?? 0), data),
    []
  )

  useEffect(() => {
    selectionManager.setData(data)
  }, [selectionManager, data])

  const { selectedIds, controller, handleToggleItem } = useSelection(
    selectionManager,
    onSelectionChange
  )

  const { effectiveColumns, gridContainerRef } = useResponsiveColumns(isGridLayout, gridBreakpoints)

  const { getScrollElement, resetEndReached } = useEndReached(
    scrollRef,
    onEndReached,
    onEndReachedThreshold
  )

  const rowCount = useMemo(
    () => Math.ceil(data.length / effectiveColumns),
    [data.length, effectiveColumns]
  )

  const estimateSize = useCallback(() => estimateItemHeight + gap, [estimateItemHeight, gap])

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement,
    estimateSize,
    overscan: 10,
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

  useLayoutEffect(() => {
    onController?.(controller)
  }, [controller, onController])

  useLayoutEffect(() => {
    onVirtualizer?.(rowVirtualizer)
  }, [rowVirtualizer, onVirtualizer])

  useEffect(() => {
    resetEndReached()
  }, [data, resetEndReached])

  useEffect(() => {
    if (!externalScrollRef) return

    if (previousScrollRefRef.current !== externalScrollRef) {
      hasMeasuredRef.current = false
      previousScrollRefRef.current = externalScrollRef
    }

    let mounted = true
    let retryCount = 0
    const maxRetries = 5
    let timeoutId: NodeJS.Timeout | null = null

    const checkAndMeasure = () => {
      if (!mounted) return

      const scrollElement = getScrollElement()

      if (scrollElement?.isConnected) {
        if (!hasMeasuredRef.current) {
          const checkRows = () => {
            if (!mounted) return

            const currentRows = rowVirtualizer.getVirtualItems()

            if (currentRows.length === 0 && data.length > 0) {
              rowVirtualizer.measure()
              hasMeasuredRef.current = true
            } else if (currentRows.length > 0) {
              hasMeasuredRef.current = true
            }
          }

          requestAnimationFrame(checkRows)
        }
        retryCount = 0
        return
      }

      if (retryCount < maxRetries) {
        retryCount++
        const delay = Math.min(50 * retryCount, 200)
        timeoutId = setTimeout(checkAndMeasure, delay)
      }
    }

    const rafId = requestAnimationFrame(() => {
      if (mounted) {
        checkAndMeasure()
      }
    })

    return () => {
      mounted = false
      cancelAnimationFrame(rafId)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [getScrollElement, rowVirtualizer, externalScrollRef, data.length])

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
