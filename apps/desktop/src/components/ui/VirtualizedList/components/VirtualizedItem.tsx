import { forwardRef, memo, useMemo, type ReactElement } from "react"

import { cn } from "@lib/utils"

import { motion } from "motion/react"

import type { VirtualizedItemProps } from "../types"

const VirtualizedItem = memo(
  forwardRef<
    HTMLDivElement,
    VirtualizedItemProps<any> & {
      transitionConfig?: any
      shouldAnimate?: boolean
    }
  >(function VirtualizedItem(
    {
      item,
      index,
      id,
      renderItem,
      isSelected,
      onToggle,
      itemId,
      isLastRow,
      gap,
      transitionConfig,
      shouldAnimate = true
    },
    ref
  ) {
    const style = useMemo(
      () => ({
        marginBottom: !isLastRow && gap > 0 ? `${gap}px` : undefined
      }),
      [isLastRow, gap]
    )

    const handleToggle = useMemo(() => () => onToggle(itemId), [onToggle, itemId])

    const motionTransition = useMemo(() => {
      if (!shouldAnimate) return { duration: 0 }

      return {
        layout: {
          duration: transitionConfig?.duration || 0.3,
          ease: transitionConfig?.ease || [0.25, 0.46, 0.45, 0.94],
          type: "tween" as const
        },
        opacity: {
          duration: (transitionConfig?.duration || 0.3) * 0.8,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      }
    }, [shouldAnimate, transitionConfig])

    const motionStyle = useMemo(
      () => ({
        ...style,
        willChange: shouldAnimate ? "transform, opacity" : "auto",
        backfaceVisibility: "hidden" as const,
        WebkitBackfaceVisibility: "hidden" as const,
        contain: "layout style paint" as const
      }),
      [style, shouldAnimate]
    )

    return (
      <motion.div
        ref={ref}
        layout={shouldAnimate}
        layoutId={shouldAnimate ? id : undefined}
        transition={motionTransition}
        className={cn("group relative")}
        style={motionStyle}
        data-virtualized-item
        data-item-id={id}
      >
        {renderItem({ item, index, selected: isSelected, toggle: handleToggle })}
      </motion.div>
    )
  })
) as <T>(
  props: VirtualizedItemProps<T> & { transitionConfig?: any } & { ref?: React.Ref<HTMLDivElement> }
) => ReactElement

export { VirtualizedItem }
