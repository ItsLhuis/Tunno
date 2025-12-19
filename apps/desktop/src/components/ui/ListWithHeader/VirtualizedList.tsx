"use client"

import { useCallback, useEffect, useRef, useState, type ComponentType, type RefObject } from "react"

import { cn } from "@lib/utils"

import { useScroll } from "./hooks"

import { Container } from "@components/ui/Container"
import { Fade } from "@components/ui/Fade"
import { ScrollArea } from "@components/ui/ScrollArea"

import { type SharedScrollContainerProps } from "./types"

import { type Virtualizer } from "@tanstack/react-virtual"

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
    onScrollRef?: (ref: RefObject<HTMLDivElement | null>) => void
    onController?: (controller: VirtualizedListController<TItem>) => void
    onVirtualizer?: (virtualizer: Virtualizer<HTMLElement, Element>) => void
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
  onVirtualizer,
  ...props
}: VirtualizedListWithHeadersProps<TItem>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const [headerHeight, setHeaderHeight] = useState(0)
  const [controller, setController] = useState<VirtualizedListController<TItem> | null>(null)

  const { isScrolled } = useScroll({
    scrollRef,
    headerHeight
  })

  const calculateHeaderHeight = useCallback(() => {
    if (!headerRef.current) return
    setHeaderHeight(headerRef.current.getBoundingClientRect().height + stickHeaderThreshold)
  }, [stickHeaderThreshold])

  useEffect(() => {
    calculateHeaderHeight()
  }, [])

  useEffect(() => {
    if (controller) {
      const timer = setTimeout(calculateHeaderHeight, 100)
      return () => clearTimeout(timer)
    }
  }, [controller, calculateHeaderHeight])

  useEffect(() => {
    if (onScrollRef && scrollRef.current) {
      onScrollRef(scrollRef)
    }
  }, [onScrollRef])

  useEffect(() => {
    if (onController && controller) {
      onController(controller)
    }
  }, [onController, controller])

  const isListEmpty = props.data.length === 0

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn("bg-background relative size-full flex-1", containerClassName)}
    >
      <div className={cn("flex w-full flex-1 flex-col", isListEmpty && "h-full")}>
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "border-border bg-background/50 absolute inset-x-0 top-0 z-50 border-b backdrop-blur-sm",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && controller && (
            <Container className="px-9">
              <StickyHeaderComponent list={controller} />
            </Container>
          )}
        </Fade>
        <div ref={headerRef} className="relative">
          {controller && (
            <Container>
              <HeaderComponent list={controller} />
              {ListHeaderComponent && <ListHeaderComponent list={controller} />}
            </Container>
          )}
        </div>
        <div className="relative flex-1">
          <Container className={cn("h-full p-9 pt-0", className)}>
            <VirtualizedList
              {...(props as VirtualizedListProps<TItem>)}
              scrollRef={scrollRef}
              containerClassName={cn(isListEmpty && "h-full")}
              ListEmptyComponent={ListEmptyComponent}
              ListFooterComponent={ListFooterComponent}
              onController={setController}
              onVirtualizer={onVirtualizer}
            />
          </Container>
        </div>
      </div>
    </ScrollArea>
  )
}

export { VirtualizedListWithHeaders }
