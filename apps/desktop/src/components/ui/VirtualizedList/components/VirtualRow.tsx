import { memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import { VirtualizedItem } from "./VirtualizedItem"

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
  measureRef
}: VirtualRowProps<TItem>) {
  const fromIndex = virtualRow.index * effectiveColumns
  const toIndex = Math.min(fromIndex + effectiveColumns, data.length)
  const isLastRow = virtualRow.index === totalRows - 1

  const transformStyle = useMemo(
    () => ({
      transform: `translate3d(0, ${virtualRow.start}px, 0)`
    }),
    [virtualRow.start]
  )

  const gridStyle = useMemo(
    () => ({
      gridTemplateColumns: `repeat(${effectiveColumns}, minmax(0, 1fr))`,
      gap: gap,
      ...rowStyle
    }),
    [effectiveColumns, gap, rowStyle]
  )

  return (
    <div
      key={virtualRow.key}
      data-index={virtualRow.index}
      ref={measureRef}
      className={cn("absolute left-0 right-0")}
      style={transformStyle}
    >
      <div className={cn("grid", rowClassName)} style={gridStyle}>
        {Array.from({ length: toIndex - fromIndex }, (_, idx) => {
          const index = fromIndex + idx
          const item = data[index]
          const id = keyExtractor(item, index)
          const isSelected = selectedIds.has(id)

          return (
            <VirtualizedItem
              key={id}
              item={item}
              index={index}
              id={id}
              renderItem={renderItem}
              isSelected={isSelected}
              onToggle={onToggleItem}
              itemId={id}
              isLastRow={isLastRow}
              gap={gap}
            />
          )
        })}
      </div>
    </div>
  )
}) as <TItem>(props: VirtualRowProps<TItem>) => ReactElement

export { VirtualRow }
