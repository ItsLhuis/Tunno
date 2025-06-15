import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus:outline-none focus:ring-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/80 focus-visible:bg-primary/80",
        text: "font-bold text-primary hover:text-primary hover:bg-accent focus-visible:bg-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:text-destructive-foreground/90 hover:bg-destructive/80 focus-visible:bg-destructive/80",
        outline:
          "border border-input hover:text-accent-foreground hover:bg-accent focus-visible:bg-accent",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80",
        ghost: "hover:text-accent-foreground hover:bg-accent focus-visible:bg-accent",
        link: "text-muted-foreground hover:text-foreground focus-visible:text-foreground !h-auto !p-0"
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

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    tooltip?: string | ComponentProps<typeof TooltipContent>
  }

function Button({ className, variant, size, asChild = false, tooltip, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button"

  const button = (
    // @ts-ignore
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  const tooltipProps = typeof tooltip === "string" ? { children: tooltip } : tooltip

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="right" {...tooltipProps} />
      </Tooltip>
    </TooltipProvider>
  )
}

export { Button, buttonVariants }

