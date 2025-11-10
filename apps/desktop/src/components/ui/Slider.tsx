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
  ref,
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
        ref={ref}
        className={cn(
          "group relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[disabled]:opacity-50",
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
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20 transition-colors data-[orientation=horizontal]:h-1 data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-1">
          <SliderPrimitive.Range className="absolute h-full bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
        </SliderPrimitive.Track>
        {Array.from({ length: _values.length }, (_, index) => (
          <Tooltip key={index} open={tooltipOpen}>
            <TooltipTrigger asChild>
              <SliderPrimitive.Thumb
                onBlur={() => setTooltipOpen(false)}
                className="block h-3 w-3 rounded-full border border-primary/50 bg-primary opacity-0 transition-opacity ease-in-out hover:opacity-100 focus:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group-hover:opacity-100"
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
