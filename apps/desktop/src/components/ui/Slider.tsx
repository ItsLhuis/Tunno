import { forwardRef, useState, type ElementRef, type ComponentPropsWithoutRef } from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@lib/utils"

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@components/ui/Tooltip"

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ onMouseEnter, onMouseLeave, onValueChange, className, ...props }, ref) => {
  const [value, setValue] = useState<number[]>(props.defaultValue || [0])

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const [isHovered, setIsHovered] = useState<boolean>(false)

  return (
    <TooltipProvider delayDuration={0}>
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        onMouseEnter={(e) => {
          setIsHovered(true)
          if (onMouseEnter) onMouseEnter(e)
        }}
        onMouseLeave={(e) => {
          setIsHovered(false)
          if (onMouseLeave) onMouseLeave(e)
        }}
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
                "block h-3 w-3 rounded-full border border-primary/50 bg-primary shadow transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                isHovered ? "animate-fade-in" : "animate-fade-out"
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
