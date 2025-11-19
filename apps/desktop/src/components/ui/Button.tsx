import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"

import { Fade } from "@components/ui/Fade"
import { Spinner } from "@components/ui/Spinner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"

const buttonVariants = cva(
  "cursor-default inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-transparent transition-colors focus-visible:border-primary! disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:text-primary-foreground/90 hover:bg-primary/80 focus-visible:bg-primary/80",
        text: "font-bold text-primary hover:text-primary hover:bg-accent focus-visible:bg-accent",
        destructive:
          "bg-destructive text-destructive-foreground hover:text-destructive-foreground/90 hover:bg-destructive/80 focus-visible:bg-destructive/80 bg-destructive/60",
        outline:
          "hover:text-accent-foreground hover:bg-accent bg-sidebar/75 border-input hover:bg-input/75 focus-visible:bg-accent border border-input focus-visible:border-primary!",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:bg-secondary/80",
        ghost:
          "hover:text-accent-foreground hover:bg-accent hover:bg-accent/50 focus-visible:bg-accent",
        link: "inline text-xs cursor-default leading-none border-0 hover:text-primary focus:outline-none focus-visible:text-primary focus-visible:border-0 [&>*]:hover:text-primary [&>*]:focus-visible:text-primary !h-auto !p-0"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    tooltip?: string | ComponentProps<typeof TooltipContent>
    isLoading?: boolean
  }

const Button = ({
  className,
  type = "button",
  variant,
  size,
  asChild = false,
  tooltip,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : "button"

  const buttonContent = (
    <div className="relative flex items-center justify-center">
      <Fade show={isLoading} className="absolute" initial={false} unmountOnExit={false}>
        <Spinner className="text-inherit" />
      </Fade>
      <Fade
        show={!isLoading}
        initial={false}
        unmountOnExit={false}
        className="flex items-center justify-center gap-2"
      >
        {children}
      </Fade>
    </div>
  )

  const button = (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      disabled={disabled || isLoading}
      {...props}
    >
      {asChild ? children : buttonContent}
    </Comp>
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
        <TooltipContent {...tooltip} />
      </Tooltip>
    </TooltipProvider>
  )
}

export { Button, buttonVariants }
