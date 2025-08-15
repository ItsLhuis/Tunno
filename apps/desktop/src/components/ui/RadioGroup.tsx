import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import {
  Indicator as RadioGroupIndicator,
  Item as RadioGroupItemPrimitive,
  Root as RadioGroupRoot
} from "@radix-ui/react-radio-group"

import { Icon } from "@components/ui/Icon"

const RadioGroup = forwardRef<
  ElementRef<typeof RadioGroupRoot>,
  ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => {
  return <RadioGroupRoot className={cn("grid gap-2", className)} {...props} ref={ref} />
})

const RadioGroupItem = forwardRef<
  ElementRef<typeof RadioGroupItemPrimitive>,
  ComponentPropsWithoutRef<typeof RadioGroupItemPrimitive>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupItemPrimitive
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 cursor-default rounded-full border border-primary text-primary transition-opacity focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupIndicator className="flex items-center justify-center">
        <Icon name="Circle" className="h-2 w-2 fill-primary" />
      </RadioGroupIndicator>
    </RadioGroupItemPrimitive>
  )
})

export { RadioGroup, RadioGroupItem }
