import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Viewport>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, scrollHideDelay = 300, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn("relative overflow-hidden scroll-smooth", className)}
    scrollHideDelay={scrollHideDelay}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      className="h-full w-full rounded-[inherit] [&>div]:h-full"
    >
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

const ScrollBar = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
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
))

export { ScrollArea, ScrollBar }
