"use client"

import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react"

import { cn } from "@lib/utils"

import * as SeparatorPrimitive from "@radix-ui/react-separator"

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0 bg-border transition-colors",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
))

export { Separator }
