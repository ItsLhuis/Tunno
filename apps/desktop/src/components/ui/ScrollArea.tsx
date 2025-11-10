import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

const ScrollArea = ({
  className,
  children,
  scrollHideDelay = 300,
  ref,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.Root>) => {
  return (
    <ScrollAreaPrimitive.Root
      className={cn("relative overflow-hidden scroll-smooth", className)}
      scrollHideDelay={scrollHideDelay}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={ref}
        className={cn(
          "h-full w-full rounded-[inherit] [&>div]:h-full",
          "[&::-webkit-scrollbar]:hidden",
          "[-ms-overflow-style:none]",
          "[scrollbar-width:none]"
        )}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

const ScrollBar = ({
  className,
  orientation = "vertical",
  ref,
  ...props
}: ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "z-50 flex touch-none select-none transition-colors",
        "data-[state=hidden]:animate-fade-out data-[state=visible]:animate-fade-in",
        orientation === "vertical" && "h-full w-3.5 border-l border-l-transparent p-1",
        orientation === "horizontal" && "h-3.5 flex-col border-t border-t-transparent p-1",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-foreground/20 transition-colors hover:bg-foreground/40" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
