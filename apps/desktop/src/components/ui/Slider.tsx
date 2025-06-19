import { forwardRef, useState, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ onValueChange, className, ...props }, ref) => {
  const [value, setValue] = useState<number[]>(props.defaultValue || [0])

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  return (
    <TooltipProvider delayDuration={0}>
      <SliderPrimitive.Root
        ref={ref}
        className={cn("group relative flex w-full touch-none select-none items-center", className)}
        onValueChange={(value) => {
          setTooltipOpen(true)
          setValue(value)
          if (onValueChange) onValueChange(value)
        }}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20 transition-colors">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        <Tooltip open={tooltipOpen}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb
              onBlur={() => setTooltipOpen(false)}
              className={cn(
                "block h-3 w-3 rounded-full border border-primary/50 bg-primary shadow",
                "transition-opacity duration-300 ease-in-out",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "disabled:pointer-events-none disabled:opacity-50",
                "opacity-0",
                "hover:opacity-100",
                "focus:opacity-100",
                "group-hover:opacity-100"
              )}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{value[0]}</p>
          </TooltipContent>
        </Tooltip>
      </SliderPrimitive.Root>
    </TooltipProvider>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
