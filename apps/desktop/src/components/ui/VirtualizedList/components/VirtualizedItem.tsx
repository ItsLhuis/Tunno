import { forwardRef, memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import type { VirtualizedItemProps } from "../types"

const VirtualizedItem = memo(
  forwardRef<HTMLDivElement, VirtualizedItemProps<any>>(function VirtualizedItem(
    { item, index, id, renderItem, isSelected, onToggle, itemId },
    ref
  ) {
    const handleToggle = useMemo(() => () => onToggle(itemId), [onToggle, itemId])

    return (
      <div
        ref={ref}
        className={cn("group relative")}
        style={{
          contain: "layout style paint" as const,
          backfaceVisibility: "hidden" as const,
          WebkitBackfaceVisibility: "hidden" as const
        }}
        data-virtualized-item
        data-item-id={id}
      >
        {renderItem({ item, index, selected: isSelected, toggle: handleToggle })}
      </div>
    )
  })
) as <T>(props: VirtualizedItemProps<T> & { ref?: React.Ref<HTMLDivElement> }) => ReactElement

export { VirtualizedItem }
