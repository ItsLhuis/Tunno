import {
  ComponentProps,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type KeyboardEvent
} from "react"

import { cn } from "@lib/utils"

import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"

import { Button } from "@components/ui/Button"
import { Fade } from "@components/ui/Fade"
import { Icon } from "@components/ui/Icon"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

const Carousel = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & CarouselProps>(
  ({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y"
      },
      plugins
    )
    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext]
    )

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on("reInit", onSelect)
      api.on("select", onSelect)

      return () => {
        api?.off("select", onSelect)
      }
    }, [api, onSelect])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  }
)

const CarouselContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { containerClassName?: string }
>(({ className, containerClassName, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  return (
    <div ref={carouselRef} className={cn(containerClassName, "overflow-hidden")}>
      <div
        ref={ref}
        className={cn("flex", orientation === "horizontal" ? "-ml-3" : "-mt-3 flex-col", className)}
        {...props}
      />
    </div>
  )
})

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel()

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-1" : "pt-1",
          className
        )}
        {...props}
      />
    )
  }
)

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Fade
        show={canScrollPrev}
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2"
        )}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn(
            "h-8 w-8 rounded-full",
            orientation === "vertical" && "rotate-90",
            className
          )}
          disabled={!canScrollPrev}
          onClick={scrollPrev}
          {...props}
        >
          <Icon name="ArrowLeft" />
        </Button>
      </Fade>
    )
  }
)

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Fade
        show={canScrollNext}
        className={cn(
          "absolute",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2"
        )}
      >
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className={cn(
            "h-8 w-8 rounded-full",
            orientation === "vertical" && "rotate-90",
            className
          )}
          disabled={!canScrollNext}
          onClick={scrollNext}
          {...props}
        >
          <Icon name="ArrowRight" />
        </Button>
      </Fade>
    )
  }
)

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi }
