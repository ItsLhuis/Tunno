import { memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import { VirtualizedItem } from "./VirtualizedItem"

import { type VirtualRowProps } from "../types"

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
  measureRef
}: VirtualRowProps<TItem>) {
  const fromIndex = virtualRow.index * effectiveColumns
  const toIndex = Math.min(fromIndex + effectiveColumns, data.length)

  const transformStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${virtualRow.start}px, 0)`,
      paddingBottom: `${gap}px`,
      contain: "layout style paint" as const,
      backfaceVisibility: "hidden" as const,
      WebkitBackfaceVisibility: "hidden" as const
    }),
    [virtualRow.start, gap]
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

      result.push({
        key: id,
        item,
        index,
        id
      })
    }
    return result
  }, [fromIndex, toIndex, data, keyExtractor])

  return (
    <div
      key={virtualRow.key}
      data-index={virtualRow.index}
      ref={measureRef}
      className={cn("absolute right-0 left-0")}
      style={transformStyle}
    >
      <div className={cn("grid", rowClassName)} style={gridStyle}>
        {items.map((item) => (
          <VirtualizedItem
            key={item.key}
            item={item.item}
            index={item.index}
            id={item.id}
            renderItem={renderItem}
            isSelected={selectedIds.has(item.id)}
            onToggle={onToggleItem}
            itemId={item.id}
          />
        ))}
      </div>
    </div>
  )
}) as <TItem>(props: VirtualRowProps<TItem>) => ReactElement

export { VirtualRow }
