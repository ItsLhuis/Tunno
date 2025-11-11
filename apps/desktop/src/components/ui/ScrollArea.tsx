"use client"

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
      data-slot="scroll-area"
      className={cn("relative overflow-hidden scroll-smooth", className)}
      scrollHideDelay={scrollHideDelay}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        ref={ref}
        data-slot="scroll-area-viewport"
        className={cn(
          "size-full rounded-[inherit] [&>div]:h-full",
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
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "z-50 flex touch-none transition-colors select-none",
        "data-[state=hidden]:animate-out data-[state=visible]:animate-in data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0",
        orientation === "vertical" && "h-full w-3.5 border-l border-l-transparent p-1",
        orientation === "horizontal" && "h-3.5 flex-col border-t border-t-transparent p-1",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-foreground/20 hover:bg-foreground/40 relative flex-1 rounded-full transition-colors"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
