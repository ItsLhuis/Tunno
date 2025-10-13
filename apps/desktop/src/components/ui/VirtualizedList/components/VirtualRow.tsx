import { memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import { VirtualizedItem } from "./VirtualizedItem"

import { motion } from "motion/react"

import type { VirtualRowProps } from "../types"

const VirtualRow = memo(function VirtualRow<TItem>({
  virtualRow,
  data,
  effectiveColumns,
  keyExtractor,
  renderItem,
  gap,
  rowClassName,
  rowStyle,
  selectedIds,
  onToggleItem,
  totalRows,
  measureRef,
  transitionConfig,
  shouldAnimate = true
}: VirtualRowProps<TItem> & {
  transitionConfig?: any
  shouldAnimate?: boolean
}) {
  const fromIndex = virtualRow.index * effectiveColumns
  const toIndex = Math.min(fromIndex + effectiveColumns, data.length)
  const isLastRow = virtualRow.index === totalRows - 1

  const transformStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${virtualRow.start}px, 0)`,
      willChange: shouldAnimate ? "transform" : "auto",
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const,
      contain: "layout style paint" as const
    }),
    [virtualRow.start, shouldAnimate]
  )

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
      gap: gap,
      ...rowStyle
    }),
    [effectiveColumns, gap, rowStyle]
  )

  const items = useMemo(() => {
    const result = []
    for (let idx = 0; idx < toIndex - fromIndex; idx++) {
      const index = fromIndex + idx
      const item = data[index]
      const id = keyExtractor(item, index)
      const isSelected = selectedIds.has(id)

      result.push({
        key: id,
        item,
        index,
        id,
        isSelected
      })
    }
    return result
  }, [fromIndex, toIndex, data, keyExtractor, selectedIds])

  const motionTransition = useMemo(() => {
    if (!shouldAnimate) return { duration: 0 }

    return {
      duration: transitionConfig?.duration || 0.3,
      ease: transitionConfig?.ease || [0.25, 0.46, 0.45, 0.94],
      type: "tween" as const,
      staggerChildren: transitionConfig?.stagger || 0.02
    }
  }, [shouldAnimate, transitionConfig])

  return (
    <div
      key={virtualRow.key}
      data-index={virtualRow.index}
      ref={measureRef}
      className={cn("absolute left-0 right-0")}
      style={transformStyle}
    >
      <motion.div
        layout={shouldAnimate}
        transition={motionTransition}
        className={cn("grid", rowClassName)}
        style={{
          ...gridStyle,
          willChange: shouldAnimate ? "transform" : "auto"
        }}
      >
        {items.map((item) => (
          <VirtualizedItem
            key={item.key}
            item={item.item}
            index={item.index}
            id={item.id}
            renderItem={renderItem}
            isSelected={item.isSelected}
            onToggle={onToggleItem}
            itemId={item.id}
            isLastRow={isLastRow}
            gap={gap}
            transitionConfig={transitionConfig}
            shouldAnimate={shouldAnimate}
          />
        ))}
      </motion.div>
    </div>
  )
}) as <TItem>(props: VirtualRowProps<TItem> & { transitionConfig?: any }) => ReactElement

export { VirtualRow }
