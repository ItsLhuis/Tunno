"use client"

import { forwardRef, useState, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"
import { Typography } from "@components/ui/Typography"

type SliderProps = ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
  formatTooltip?: (value: number) => string
}

const Slider = forwardRef<ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ onValueChange, formatTooltip, className, value, defaultValue, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState<number[]>(defaultValue || [0])

    const currentValue = value || internalValue

    const [tooltipOpen, setTooltipOpen] = useState<boolean>(false)

    const formatValue = formatTooltip || ((value: number) => value.toString())

    return (
      <TooltipProvider delayDuration={0}>
        <SliderPrimitive.Root
          ref={ref}
          className={cn(
            "group relative flex w-full touch-none select-none items-center",
            className
          )}
          value={currentValue}
          onValueChange={(newValue) => {
            setTooltipOpen(true)
            if (!value) {
              setInternalValue(newValue)
            }
            if (onValueChange) onValueChange(newValue)
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
                className="block h-3 w-3 rounded-full border border-primary/50 bg-primary opacity-0 transition-opacity ease-in-out hover:opacity-100 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:opacity-100"
              />
            </TooltipTrigger>
            <TooltipContent>
              <Typography variant="span" affects="small">
                {formatValue(currentValue[0])}
              </Typography>
            </TooltipContent>
          </Tooltip>
        </SliderPrimitive.Root>
      </TooltipProvider>
    )
  }
)

export { Slider }
