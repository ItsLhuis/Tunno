"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react"

import { useVirtualizer } from "@tanstack/react-virtual"

import { useEndReached, useLayoutTransition, useResponsiveColumns, useSelection } from "./hooks"

import { cn } from "@lib/utils"

import { Fade } from "@components/ui/Fade"

import { VirtualRow } from "./components"

import { LayoutGroup } from "motion/react"

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
  layoutChangeAnimation,
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

  const { startTransition, isTransitioning, layoutKey, transitionConfig, shouldAnimate } =
    useLayoutTransition({
      duration: layoutChangeAnimation?.duration ? layoutChangeAnimation.duration / 1000 : 0.3,
      easing: layoutChangeAnimation?.easing || [0.3, 0, 0.2, 1],
      staggerChildren: 0.01,
      onStart: layoutChangeAnimation?.onStart,
      onEnd: layoutChangeAnimation?.onEnd,
      disableAnimations: false
    })

  const previousLayoutRef = useRef(layout)

  useLayoutEffect(() => {
    if (previousLayoutRef.current !== layout) {
      requestAnimationFrame(() => {
        startTransition()
      })
      previousLayoutRef.current = layout
    }
  }, [layout, startTransition])

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
      willChange: isTransitioning ? "transform" : "auto",
      transform: "translateZ(0)",
      contain: "layout style paint" as const,
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const
    }),
    [totalSize, isTransitioning]
  )

  return (
    <div
      ref={externalScrollRef ? undefined : internalScrollRef}
      className={containerClassName}
      style={{
        contain: "layout style paint",
        willChange: isTransitioning ? "transform" : "auto",
        backfaceVisibility: "hidden" as const,
        WebkitBackfaceVisibility: "hidden" as const,
        transform: "translateZ(0)"
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
            <div className="flex min-h-14 items-center justify-center">
              <ListEmptyComponent />
            </div>
          ) : null
        ) : (
          <LayoutGroup id={`virtualized-list-${layoutKey}`}>
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
                  transitionConfig={transitionConfig}
                  shouldAnimate={shouldAnimate}
                />
              ))}
            </div>
          </LayoutGroup>
        )}
      </Fade>
      {controller && ListFooterComponent && <ListFooterComponent list={controller} />}
    </div>
  )
}

export { VirtualizedList }
