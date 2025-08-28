import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from "react"

import { cn } from "@lib/utils"

import { Check } from "lucide-react"

import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

const Checkbox = forwardRef<
  ElementRef<typeof CheckboxPrimitive.Root>,
  ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer flex h-4 w-4 shrink-0 cursor-default items-center justify-center rounded-sm border border-foreground/30 transition-colors focus-visible:bg-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator>
      <Check className="h-3 w-3" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

export { Checkbox }

