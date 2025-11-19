"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import {
  Indicator as RadioGroupIndicator,
  Item as RadioGroupItemPrimitive,
  Root as RadioGroupRoot
} from "@radix-ui/react-radio-group"

import { Icon } from "@components/ui/Icon"

const RadioGroup = ({ className, ...props }: ComponentProps<typeof RadioGroupRoot>) => {
  return (
    <RadioGroupRoot data-slot="radio-group" className={cn("grid gap-2", className)} {...props} />
  )
}

const RadioGroupItem = ({
  className,
  ...props
}: ComponentProps<typeof RadioGroupItemPrimitive>) => {
  return (
    <RadioGroupItemPrimitive
      data-slot="radio-group-item"
      className={cn(
        "text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-sidebar/75 border-primary aspect-square h-4 w-4 shrink-0 cursor-default rounded-full border transition-[color,box-shadow,opacity] outline-none focus:outline-hidden focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupIndicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <Icon name="Circle" className="fill-primary size-2" />
      </RadioGroupIndicator>
    </RadioGroupItemPrimitive>
  )
}

export { RadioGroup, RadioGroupItem }
