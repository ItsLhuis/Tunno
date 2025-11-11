"use client"

import { useMemo, useState, type ComponentProps } from "react"

import { cn } from "@lib/utils"

import * as SliderPrimitive from "@radix-ui/react-slider"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"
import { Typography } from "@components/ui/Typography"

type SliderProps = ComponentProps<typeof SliderPrimitive.Root> & {
  formatTooltip?: (value: number) => string
}

const Slider = ({
  onValueChange,
  formatTooltip,
  className,
  value,
  defaultValue,
  min = 0,
  max = 100,
  ...props
}: SliderProps) => {
  const [internalValue, setInternalValue] = useState<number[]>(defaultValue || [0])

  const currentValue = value || internalValue

  const [tooltipOpen, setTooltipOpen] = useState(false)

  const formatValue = formatTooltip || ((value: number) => value.toString())

  const _values = useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  )

  return (
    <TooltipProvider delayDuration={0}>
      <SliderPrimitive.Root
        data-slot="slider"
        className={cn(
          "group relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        value={currentValue}
        defaultValue={defaultValue}
        min={min}
        max={max}
        onValueChange={(newValue) => {
          setTooltipOpen(true)
          if (!value) {
            setInternalValue(newValue)
          }
          if (onValueChange) onValueChange(newValue)
        }}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-primary/20 relative h-1 w-full grow overflow-hidden rounded-full transition-colors data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <Tooltip key={index} open={tooltipOpen}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                data-slot="slider-thumb"
                onBlur={() => setTooltipOpen(false)}
                className="border-primary/50 bg-primary block size-3 rounded-full border opacity-0 transition-opacity ease-in-out group-hover:opacity-100 hover:opacity-100 focus:opacity-100 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
              />
            </TooltipTrigger>
            <TooltipContent>
              <Typography variant="span" affects="small">
                {formatValue(currentValue[index] || currentValue[0])}
              </Typography>
            </TooltipContent>
          </Tooltip>
        ))}
      </SliderPrimitive.Root>
    </TooltipProvider>
  )
}

export { Slider }
