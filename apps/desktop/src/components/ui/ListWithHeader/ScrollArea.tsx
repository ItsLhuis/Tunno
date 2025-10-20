import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type RefObject
} from "react"

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
    scrollRef?: RefObject<HTMLDivElement>
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
  scrollRef: externalScrollRef,
  ...props
}: ScrollAreaWithHeadersProps) => {
  const internalScrollRef = useRef<HTMLDivElement | null>(null)

  const scrollRef = externalScrollRef || internalScrollRef

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
      className={cn(
        "h-full w-full flex-1 bg-background [&>div>div]:!flex",
        containerClassName,
        "relative"
      )}
      style={style}
    >
      <div className="flex w-full flex-1 flex-col">
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "absolute left-0 right-0 top-0 z-50 flex w-full flex-1 flex-col border-b border-border bg-background/50 px-9 backdrop-blur transition-[background-color,border-color,padding]",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && StickyHeaderComponent()}
        </Fade>
        <div ref={headerRef}>
          {HeaderComponent()}
          {ListHeaderComponent && ListHeaderComponent()}
        </div>
        <div className="flex h-full flex-1 flex-col">
          <div className={cn("flex flex-col p-9 pt-3", className)} {...props}>
            {children}
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export { ScrollAreaWithHeaders }
