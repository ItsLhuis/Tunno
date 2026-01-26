import { memo, useMemo, type ReactElement, type Ref } from "react"

import { cn } from "@lib/utils"

import { type VirtualizedItemProps } from "../types"

const ITEM_STYLE = {
  contain: "layout style paint" as const,
  backfaceVisibility: "hidden" as const,
  WebkitBackfaceVisibility: "hidden" as const
} as const

const VirtualizedItem = memo(function VirtualizedItem<T>({
  item,
  index,
  id,
  renderItem,
  isSelected,
  onToggle,
  itemId,
  ref
}: VirtualizedItemProps<T> & { ref?: Ref<HTMLDivElement> }) {
  const handleToggle = useMemo(() => () => onToggle(itemId, true), [onToggle, itemId])

  return (
    <div
      ref={ref}
      className={cn("group relative")}
      style={ITEM_STYLE}
      data-virtualized-item
      data-item-id={id}
    >
      {renderItem({ item, index, selected: isSelected, toggle: handleToggle })}
    </div>
  )
}) as <T>(props: VirtualizedItemProps<T> & { ref?: Ref<HTMLDivElement> }) => ReactElement

export { VirtualizedItem }
