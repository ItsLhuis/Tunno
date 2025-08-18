import { useCallback, useEffect, useRef, useState, type HTMLAttributes } from "react"

import { cn } from "@lib/utils"

import { useScroll } from "./hooks"

import { Fade } from "@components/ui/Fade"
import { ScrollArea } from "@components/ui/ScrollArea"

import { SharedScrollContainerProps } from "./types"

type ScrollAreaWithHeadersProps = HTMLAttributes<HTMLDivElement> &
  SharedScrollContainerProps & {
    HeaderComponent: () => React.ReactNode
    StickyHeaderComponent?: () => React.ReactNode
    ListHeaderComponent?: () => React.ReactNode
    stickyHeaderContainerClassName?: string
    stickHeaderThreshold?: number
    containerClassName?: string
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
  }

const ScrollAreaWithHeaders = ({
  HeaderComponent,
  StickyHeaderComponent,
  ListHeaderComponent,
  stickyHeaderContainerClassName,
  stickHeaderThreshold = 10,
  containerClassName,
  children,
  className,
  style,
  ...props
}: ScrollAreaWithHeadersProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const headerRef = useRef<HTMLDivElement | null>(null)

  const [headerHeight, setHeaderHeight] = useState<number>(0)

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
  }, [headerRef, stickHeaderThreshold])

  useEffect(() => {
    calculateHeaderHeight()
  }, [])

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn("h-full w-full flex-1", containerClassName)}
      style={style}
    >
      <div className={cn("relative flex w-full flex-1 flex-col")}>
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "sticky left-0 right-0 top-0 z-50 flex w-full flex-1 flex-col border-b border-border bg-background/60 px-9 backdrop-blur transition-[background-color,border-color,padding]",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && StickyHeaderComponent()}
        </Fade>
        <div ref={headerRef}>
          {HeaderComponent()}
          {ListHeaderComponent && ListHeaderComponent()}
        </div>
        <div className={cn("h-full p-9 pt-3 transition-[padding]", className)} {...props}>
          {children}
        </div>
      </div>
    </ScrollArea>
  )
}

export { ScrollAreaWithHeaders }
