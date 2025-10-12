import { forwardRef, memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import type { VirtualizedItemProps } from "../types"

const VirtualizedItem = memo(
  forwardRef<HTMLDivElement, VirtualizedItemProps<any>>(function VirtualizedItem(
    { item, index, id, renderItem, isSelected, onToggle, itemId, isLastRow, gap },
    ref
  ) {
    const style = useMemo(
      () => ({
        marginBottom: !isLastRow && gap > 0 ? `${gap}px` : undefined
      }),
      [isLastRow, gap]
    )

    const handleToggle = useMemo(() => () => onToggle(itemId), [onToggle, itemId])

    return (
      <div
        ref={ref}
        key={id}
        className={cn("group relative")}
        style={style}
        data-virtualized-item
        data-item-id={id}
      >
        {renderItem({ item, index, selected: isSelected, toggle: handleToggle })}
      </div>
    )
  })
) as (props: VirtualizedItemProps<any>) => ReactElement

export { VirtualizedItem }
