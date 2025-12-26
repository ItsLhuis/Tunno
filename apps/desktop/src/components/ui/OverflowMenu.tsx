import {
  Children,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type MutableRefObject,
  type ReactNode
} from "react"

import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@components/ui/DropdownMenu"
import { IconButton } from "@components/ui/IconButton"
import { ScrollArea } from "@components/ui/ScrollArea"

export type OverflowMenuProps = Omit<ComponentProps<"div">, "children"> & {
  children: ReactNode
  className?: string
  triggerClassName?: string
  contentClassName?: string
  renderOverflowItem?: (item: ReactNode, index: number) => ReactNode
}

const OverflowMenu = ({
  children,
  className,
  triggerClassName,
  contentClassName,
  renderOverflowItem,
  ref,
  ...props
}: OverflowMenuProps) => {
  const { t } = useTranslation()

  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const resizeTimeoutRef = useRef<number | null>(null)

  const [containerWidth, setContainerWidth] = useState(0)
  const [childWidths, setChildWidths] = useState<number[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isMeasured, setIsMeasured] = useState(false)

  const childrenArray = useMemo(() => Children.toArray(children).filter(Boolean), [children])

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
          ;(containerRef as MutableRefObject<HTMLDivElement | null>).current = node
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
        className="pointer-events-none fixed -top-[9999px] -left-[9999px] flex items-center gap-2 opacity-0"
        aria-hidden="true"
      >
        {childrenArray}
      </div>
      {visibleItems}
      {hasOverflow && (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <IconButton
              name="MoreHorizontal"
              variant="link"
              className={cn("shrink-0", triggerClassName)}
              tooltip={t("common.more")}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="p-0">
            <ScrollArea className="flex max-h-[300px] flex-col">
              <div className={cn("p-1", contentClassName)}>
                {renderOverflowItem
                  ? overflowItems.map((item, index) => {
                      const originalIndex = visibleItems.length + index
                      return renderOverflowItem(item, originalIndex)
                    })
                  : overflowItems}
              </div>
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

export { OverflowMenu }
