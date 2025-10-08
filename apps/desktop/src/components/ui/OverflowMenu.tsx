import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode
} from "react"

import { cn } from "@lib/utils"

import { Button } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/Popover"

export type OverflowMenuProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  children: ReactNode
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

const OverflowMenu = forwardRef<HTMLDivElement, OverflowMenuProps>(
  ({ children, className, triggerClassName, contentClassName, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const measureRef = useRef<HTMLDivElement>(null)
    const resizeTimeoutRef = useRef<number | null>(null)

    const [containerWidth, setContainerWidth] = useState(0)
    const [childWidths, setChildWidths] = useState<number[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMeasured, setIsMeasured] = useState(false)

    const childrenArray = useMemo(
      () => React.Children.toArray(children).filter(Boolean),
      [children]
    )

    const measureChildren = useMemo(
      () => () => {
        if (!measureRef.current) return null

        const widths: number[] = []
        const children = measureRef.current.children

        if (children) {
          for (let i = 0; i < children.length; i++) {
            const child = children[i] as HTMLElement
            const styles = window.getComputedStyle(child)
            const marginLeft = parseFloat(styles.marginLeft) || 0
            const marginRight = parseFloat(styles.marginRight) || 0

            widths.push(child.offsetWidth + marginLeft + marginRight)
          }
        }

        return widths
      },
      []
    )

    useLayoutEffect(() => {
      if (!measureRef.current || childrenArray.length === 0) return

      const widths = measureChildren()
      if (widths) {
        setChildWidths(widths)
        setIsMeasured(true)
      }
    }, [childrenArray, measureChildren])

    useLayoutEffect(() => {
      if (!containerRef.current) return

      const updateContainerWidth = () => {
        if (containerRef.current) {
          setContainerWidth(containerRef.current.offsetWidth)
        }
      }

      updateContainerWidth()

      const resizeObserver = new ResizeObserver(() => {
        if (resizeTimeoutRef.current !== null) {
          cancelAnimationFrame(resizeTimeoutRef.current)
        }

        resizeTimeoutRef.current = requestAnimationFrame(() => {
          updateContainerWidth()
        })
      })

      resizeObserver.observe(containerRef.current)

      return () => {
        resizeObserver.disconnect()
        if (resizeTimeoutRef.current !== null) {
          cancelAnimationFrame(resizeTimeoutRef.current)
        }
      }
    }, [])

    useEffect(() => {
      if (!measureRef.current || childrenArray.length === 0 || !isMeasured) return

      const widths = measureChildren()
      if (widths && JSON.stringify(widths) !== JSON.stringify(childWidths)) {
        setChildWidths(widths)
      }
    }, [containerWidth, childrenArray, measureChildren, isMeasured, childWidths])

    const { visibleItems, overflowItems } = useMemo(() => {
      if (childWidths.length === 0 || containerWidth === 0 || !isMeasured) {
        return { visibleItems: [], overflowItems: [] }
      }

      const triggerWidth = 48
      const gapWidth = 8
      const availableWidth = containerWidth - triggerWidth - gapWidth

      let totalWidth = 0
      const visible: ReactNode[] = []
      const overflow: ReactNode[] = []

      for (let i = 0; i < childrenArray.length; i++) {
        const childWidth = childWidths[i] || 0
        const needsGap = i > 0 ? gapWidth : 0
        const itemTotalWidth = childWidth + needsGap

        if (totalWidth + itemTotalWidth <= availableWidth) {
          visible.push(childrenArray[i])
          totalWidth += itemTotalWidth
        } else {
          for (let j = i; j < childrenArray.length; j++) {
            overflow.push(childrenArray[j])
          }
          break
        }
      }

      return { visibleItems: visible, overflowItems: overflow }
    }, [childrenArray, childWidths, containerWidth, isMeasured])

    const hasOverflow = overflowItems.length > 0

    return (
      <div
        ref={(node) => {
          if (containerRef.current !== node) {
            ;(containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          }
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
        }}
        className={cn("flex w-full items-center truncate", className)}
        style={{ visibility: isMeasured ? "visible" : "hidden" }}
        {...props}
      >
        <div
          ref={measureRef}
          className="pointer-events-none fixed -left-[9999px] -top-[9999px] flex items-center gap-2 opacity-0"
          aria-hidden="true"
        >
          {childrenArray}
        </div>
        {visibleItems}
        {hasOverflow && (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button size="icon" variant="link" className={cn("shrink-0", triggerClassName)}>
                <Icon name="MoreVertical" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className={cn("p-2", contentClassName)}>
              <div className="flex flex-col gap-1">{overflowItems}</div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    )
  }
)

export { OverflowMenu }
