"use client"

import { type ComponentProps } from "react"

import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@lib/utils"

const Switch = ({ className, ...props }: ComponentProps<typeof SwitchPrimitives.Root>) => {
  return (
    <SwitchPrimitives.Root
      data-slot="switch"
      className={cn(
        "peer focus-visible:border-primary data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80 inline-flex h-5 w-9 shrink-0 cursor-default items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block h-4 w-4 rounded-full transition-transform duration-150 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitives.Root>
  )
}

export { Switch }
