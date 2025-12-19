import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject
} from "react"

import { cn } from "@lib/utils"

import { useScroll } from "./hooks"

import { Container } from "@components/ui/Container"
import { Fade } from "@components/ui/Fade"
import { ScrollArea } from "@components/ui/ScrollArea"

import { SharedScrollContainerProps } from "./types"

type ScrollAreaWithHeadersProps = ComponentProps<"div"> &
  SharedScrollContainerProps & {
    HeaderComponent: () => ReactNode
    StickyHeaderComponent?: () => ReactNode
    ListHeaderComponent?: () => ReactNode
    stickyHeaderContainerClassName?: string
    stickHeaderThreshold?: number
    containerClassName?: string
    children: ReactNode
    scrollRef?: RefObject<HTMLDivElement | null>
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
  const [headerHeight, setHeaderHeight] = useState(0)

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

  return (
    <ScrollArea
      ref={scrollRef}
      className={cn(
        "bg-background relative size-full flex-1 [&>div>div]:flex!",
        containerClassName
      )}
      style={style}
    >
      <div className="flex w-full flex-1 flex-col">
        <Fade
          show={isScrolled && Boolean(StickyHeaderComponent)}
          mode="popLayout"
          className={cn(
            "border-border bg-background/50 absolute inset-x-0 top-0 z-50 border-b backdrop-blur-sm",
            stickyHeaderContainerClassName
          )}
        >
          {StickyHeaderComponent && (
            <Container className="px-9">{StickyHeaderComponent()}</Container>
          )}
        </Fade>
        <div ref={headerRef} className="relative">
          <Container>
            {HeaderComponent()}
            {ListHeaderComponent && ListHeaderComponent()}
          </Container>
        </div>
        <div className="flex h-full flex-1 flex-col">
          <Container className={cn("p-9 pt-3", className)} {...props}>
            {children}
          </Container>
        </div>
      </div>
    </ScrollArea>
  )
}

export { ScrollAreaWithHeaders }
