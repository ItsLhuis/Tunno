"use client"

import { useCallback, useEffect, useRef, useState, type ComponentType } from "react"

import { cn } from "@lib/utils"

import { useScroll } from "./hooks"

import { Fade } from "@components/ui/Fade"
import { ScrollArea } from "@components/ui/ScrollArea"

import { type SharedScrollContainerProps } from "./types"

import {
  VirtualizedList,
  type VirtualizedListController,
  type VirtualizedListProps
} from "@components/ui/VirtualizedList"

export type VirtualizedListWithHeadersProps<TItem> = Omit<
  VirtualizedListProps<TItem>,
  "containerClassName" | "scrollRef"
> &
  SharedScrollContainerProps & {
    HeaderComponent: ComponentType<{ list: VirtualizedListController<TItem> }>
    StickyHeaderComponent?: ComponentType<{ list: VirtualizedListController<TItem> }>
    ListHeaderComponent?: ComponentType<{ list: VirtualizedListController<TItem> }>
    ListFooterComponent?: ComponentType<{ list: VirtualizedListController<TItem> }>
    ListEmptyComponent?: ComponentType
    stickyHeaderContainerClassName?: string
    containerClassName?: string
    onScrollRef?: (ref: React.RefObject<HTMLDivElement>) => void
    onController?: (controller: VirtualizedListController<TItem>) => void
  }

const VirtualizedListWithHeaders = <TItem,>({
  HeaderComponent,
  StickyHeaderComponent,
  ListHeaderComponent,
  ListFooterComponent,
  ListEmptyComponent,
  stickyHeaderContainerClassName,
  stickHeaderThreshold = 0,
  containerClassName,
  className,
  onScrollRef,
  onController,
  ...props
}: VirtualizedListWithHeadersProps<TItem>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const [headerHeight, setHeaderHeight] = useState<number>(0)
  const [controller, setController] = useState<VirtualizedListController<TItem> | null>(null)

  const { isScrolled } = useScroll({
    scrollRef,
    headerHeight
  })

  const calculateHeaderHeight = useCallback(() => {
    let totalHeight = 0
    if (headerRef.current) {
      totalHeight += headerRef.current.getBoundingClientRect().height
    }
    setHeaderHeight(totalHeight + stickHeaderThreshold)
  }, [stickHeaderThreshold])

  useEffect(() => {
    calculateHeaderHeight()

    if (controller) {
      const timer = setTimeout(calculateHeaderHeight, 100)
      return () => clearTimeout(timer)
    }
  }, [calculateHeaderHeight, controller])

  // Expose scroll ref to parent
  useEffect(() => {
    if (onScrollRef && scrollRef.current) {
      onScrollRef(scrollRef)
    }
  }, [onScrollRef])

  // Expose controller to parent
  useEffect(() => {
    if (onController && controller) {
      onController(controller)
    }
  }, [onController, controller])

  const isListEmpty = props.data.length === 0

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn("h-full w-full flex-1 bg-background", containerClassName, "relative")}
    >
      <div className={cn("flex w-full flex-1 flex-col", isListEmpty && "h-full")}>
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "absolute left-0 right-0 top-0 z-50 flex w-full flex-1 flex-col border-b border-border bg-background/50 px-9 backdrop-blur",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && controller && <StickyHeaderComponent list={controller} />}
        </Fade>
        <div ref={headerRef}>
          {controller && <HeaderComponent list={controller} />}
          {controller && ListHeaderComponent && <ListHeaderComponent list={controller} />}
        </div>
        <div className={cn("relative flex-1", className)}>
          <VirtualizedList
            {...(props as VirtualizedListProps<TItem>)}
            scrollRef={scrollRef}
            containerClassName={cn(isListEmpty && "h-full")}
            ListEmptyComponent={ListEmptyComponent}
            ListFooterComponent={ListFooterComponent}
            onController={(controller) => setController(controller)}
          />
        </div>
      </div>
    </ScrollArea>
  )
}

export { VirtualizedListWithHeaders }
