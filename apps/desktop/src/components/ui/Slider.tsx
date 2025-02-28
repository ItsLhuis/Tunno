import { forwardRef, useRef, useState, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"

const Slider = forwardRef<
  ElementRef<typeof SliderPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ onMouseEnter, onMouseLeave, onFocus, onBlur, onValueChange, className, ...props }, ref) => {
  const [value, setValue] = useState<number[]>(props.defaultValue || [0])

  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

  const hoverDelay = useRef<NodeJS.Timeout | null>(null)

  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isFocused, setIsFocused] = useState<boolean>(false)

  return (
    <TooltipProvider delayDuration={0}>
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        onMouseEnter={(e) => {
          if (hoverDelay.current) clearTimeout(hoverDelay.current)
          setIsHovered(true)
          if (onMouseEnter) onMouseEnter(e)
        }}
        onMouseLeave={(e) => {
          if (!isFocused) hoverDelay.current = setTimeout(() => setIsHovered(false), 300)
          if (onMouseLeave) onMouseLeave(e)
        }}
        onFocus={(e) => {
          if (hoverDelay.current) clearTimeout(hoverDelay.current)
          setIsHovered(true)
          setIsFocused(true)
          if (onFocus) onFocus(e)
        }}
        onBlur={(e) => {
          setIsFocused(false)
          hoverDelay.current = setTimeout(() => setIsHovered(false), 300)
          if (onBlur) onBlur(e)
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
