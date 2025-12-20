import {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type RefObject
} from "react"

import { cn } from "@lib/utils"

import { Button, type ButtonProps } from "@components/ui/Button"
import { Fade } from "@components/ui/Fade"
import { Icon } from "@components/ui/Icon"
import { ScopedTheme } from "./ScopedTheme"

type CarouselApi = {
  scrollTo: (index: number, smooth?: boolean) => void
  canScrollPrev: () => boolean
  canScrollNext: () => boolean
}

type CarouselProps = {
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
  registerItem: (id: string, element: HTMLDivElement) => void
  unregisterItem: (id: string) => void
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = ({
  orientation = "horizontal",
  setApi,
  className,
  children,
  ...props
}: ComponentProps<"div"> & CarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const itemsRef = useRef<Map<string, HTMLDivElement>>(new Map())

  const updateScrollState = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    if (orientation === "horizontal") {
      const { scrollLeft, scrollWidth, clientWidth } = container
      setCanScrollPrev(scrollLeft > 1)
      setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 1)
    } else {
      const { scrollTop, scrollHeight, clientHeight } = container
      setCanScrollPrev(scrollTop > 1)
      setCanScrollNext(scrollTop < scrollHeight - clientHeight - 1)
    }
  }, [orientation])

  const getItemPositions = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return []

    const items = Array.from(itemsRef.current.values())
    return items
      .map((item) => ({
        element: item,
        offset: orientation === "horizontal" ? item.offsetLeft : item.offsetTop,
        size: orientation === "horizontal" ? item.offsetWidth : item.offsetHeight
      }))
      .sort((a, b) => a.offset - b.offset)
  }, [orientation])

  const scrollPrev = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const positions = getItemPositions()
    if (positions.length === 0) return

    const currentScroll = orientation === "horizontal" ? container.scrollLeft : container.scrollTop
    const targetItem = [...positions].reverse().find((item) => item.offset < currentScroll - 5)

    if (targetItem) {
      container.scrollTo({
        [orientation === "horizontal" ? "left" : "top"]: targetItem.offset,
        behavior: "smooth"
      })
    }
  }, [getItemPositions, orientation])

  const scrollNext = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const positions = getItemPositions()
    if (positions.length === 0) return

    const currentScroll = orientation === "horizontal" ? container.scrollLeft : container.scrollTop
    const targetItem = positions.find((item) => item.offset > currentScroll + 5)

    if (targetItem) {
      container.scrollTo({
        [orientation === "horizontal" ? "left" : "top"]: targetItem.offset,
        behavior: "smooth"
      })
    }
  }, [getItemPositions, orientation])

  const registerItem = useCallback(
    (id: string, element: HTMLDivElement) => {
      itemsRef.current.set(id, element)
      updateScrollState()
    },
    [updateScrollState]
  )

  const unregisterItem = useCallback(
    (id: string) => {
      itemsRef.current.delete(id)
      updateScrollState()
    },
    [updateScrollState]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowLeft" || (orientation === "vertical" && event.key === "ArrowUp")) {
        event.preventDefault()
        scrollPrev()
      } else if (
        event.key === "ArrowRight" ||
        (orientation === "vertical" && event.key === "ArrowDown")
      ) {
        event.preventDefault()
        scrollNext()
      }
    },
    [scrollPrev, scrollNext, orientation]
  )

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    updateScrollState()
    const resizeObserver = new ResizeObserver(updateScrollState)
    resizeObserver.observe(container)

    container.addEventListener("scroll", updateScrollState)

    return () => {
      resizeObserver.disconnect()
      container.removeEventListener("scroll", updateScrollState)
    }
  }, [updateScrollState])

  useEffect(() => {
    if (!setApi) return

    const api: CarouselApi = {
      scrollTo: (index: number, smooth = true) => {
        const positions = getItemPositions()
        if (positions[index]) {
          scrollContainerRef.current?.scrollTo({
            [orientation === "horizontal" ? "left" : "top"]: positions[index].offset,
            behavior: smooth ? "smooth" : "auto"
          })
        }
      },
      canScrollPrev: () => canScrollPrev,
      canScrollNext: () => canScrollNext
    }

    setApi(api)
  }, [setApi, getItemPositions, orientation, canScrollPrev, canScrollNext])

  return (
    <CarouselContext.Provider
      value={{
        scrollContainerRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
        registerItem,
        unregisterItem
      }}
    >
      <div
        onKeyDownCapture={handleKeyDown}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
        data-slot="carousel"
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

type CarouselContentProps = ComponentProps<"div"> & {
  containerClassName?: string
  fadeSize?: string
  showFade?: boolean
}

const CarouselContent = ({
  className,
  containerClassName,
  fadeSize = "3rem",
  showFade = true,
  ...props
}: CarouselContentProps) => {
  const { scrollContainerRef, orientation, canScrollPrev, canScrollNext } = useCarousel()

  const getMaskImage = () => {
    if (!showFade) return "none"

    const isHorizontal = orientation === "horizontal"
    const direction = isHorizontal ? "to right" : "to bottom"

    if (canScrollPrev && canScrollNext) {
      return `linear-gradient(${direction}, transparent 0, #000 ${fadeSize}, #000 calc(100% - ${fadeSize}), transparent 100%)`
    } else if (canScrollPrev) {
      return `linear-gradient(${direction}, transparent 0, #000 ${fadeSize}, #000 100%)`
    } else if (canScrollNext) {
      return `linear-gradient(${direction}, #000 0, #000 calc(100% - ${fadeSize}), transparent 100%)`
    }

    return "none"
  }

  const maskImage = getMaskImage()

  return (
    <div
      ref={scrollContainerRef}
      className={cn(
        "scrollbar-hide",
        orientation === "horizontal"
          ? "overflow-x-auto overflow-y-hidden"
          : "flex-col overflow-x-hidden overflow-y-auto",
        containerClassName
      )}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        maskImage
      }}
    >
      <div
        className={cn("flex", orientation === "horizontal" ? "gap-3" : "flex-col gap-3", className)}
        data-slot="carousel-content"
        {...props}
      />
    </div>
  )
}

const CarouselItem = ({ className, ...props }: ComponentProps<"div">) => {
  const { registerItem, unregisterItem } = useCarousel()

  const itemRef = useRef<HTMLDivElement>(null)

  const id = useId()

  useEffect(() => {
    const element = itemRef.current

    if (element) {
      registerItem(id, element)
    }

    return () => {
      unregisterItem(id)
    }
  }, [id, registerItem, unregisterItem])

  return (
    <div
      ref={itemRef}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn("min-w-0 shrink-0 grow-0", className)}
      {...props}
    />
  )
}

const CarouselPrevious = ({
  className,
  variant = "outline",
  size = "icon",
  ...props
}: ButtonProps) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Fade
      show={canScrollPrev}
      className={cn(
        "absolute",
        orientation === "horizontal"
          ? "top-1/2 left-12 -translate-y-1/2"
          : "top-12 left-1/2 -translate-x-1/2"
      )}
    >
      <ScopedTheme theme="dark">
        <Button
          data-slot="carousel-previous"
          variant={variant}
          size={size}
          className={cn(
            "size-8 rounded-full",
            orientation === "vertical" && "rotate-90",
            className,
            "bg-background/75 backdrop-blur-sm"
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          {...props}
        >
          <Icon name="ArrowLeft" />
        </Button>
      </ScopedTheme>
    </Fade>
  )
}

const CarouselNext = ({ className, variant = "outline", size = "icon", ...props }: ButtonProps) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Fade
      show={canScrollNext}
      className={cn(
        "absolute",
        orientation === "horizontal"
          ? "top-1/2 right-12 -translate-y-1/2"
          : "bottom-12 left-1/2 -translate-x-1/2"
      )}
    >
      <ScopedTheme theme="dark">
        <Button
          data-slot="carousel-next"
          variant={variant}
          size={size}
          className={cn(
            "size-8 rounded-full",
            orientation === "vertical" && "rotate-90",
            className,
            "bg-background/75 backdrop-blur-sm"
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <Icon name="ArrowRight" />
        </Button>
      </ScopedTheme>
    </Fade>
  )
}

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi }
