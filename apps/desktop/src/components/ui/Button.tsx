import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@components/ui"

const buttonVariants = cva(
  "cursor-default inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,border-color,text-decoration-color,fill,stroke] disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/80 focus-visible:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:text-destructive-foreground/90 hover:bg-destructive/80 focus-visible:bg-destructive/80",
        outline:
          "border border-input bg-background hover:text-accent-foreground hover:bg-accent focus-visible:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80",
        ghost: "hover:text-accent-foreground hover:bg-accent focus-visible:bg-accent",
        link: "underline-offset-4 hover:underline focus-visible:underline !h-auto !p-0"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, tooltip, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"

    const button = (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      }
    }

    return (
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent side="right" {...tooltip} />
        </Tooltip>
      </TooltipProvider>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
