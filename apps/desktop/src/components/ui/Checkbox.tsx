"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { Check } from "lucide-react"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

const Checkbox = ({ className, ...props }: ComponentProps<typeof CheckboxPrimitive.Root>) => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-foreground/30 focus-visible:bg-accent data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground bg-sidebar/75 data-[state=checked]:border-primary focus-visible:border-primary aria-invalid:border-destructive flex h-4 w-4 shrink-0 cursor-default items-center justify-center rounded-sm border transition-colors outline-none focus-visible:outline-hidden disabled:opacity-50",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center transition-none"
      >
        <Check className="text-primary-foreground size-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
