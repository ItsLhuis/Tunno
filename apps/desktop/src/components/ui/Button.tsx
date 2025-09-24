import { forwardRef, type ButtonHTMLAttributes, type ComponentProps } from "react"

import { cn } from "@lib/utils"

import { cva, type VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"

import { Fade } from "@components/ui/Fade"
import { Spinner } from "@components/ui/Spinner"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@components/ui/Tooltip"

const buttonVariants = cva(
  "cursor-default inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
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

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    tooltip?: string | ComponentProps<typeof TooltipContent>
    isLoading?: boolean
  }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
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
    },
    ref
  ) => {
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
        className={cn(buttonVariants({ variant, size, className }))}
        type={type}
        ref={ref}
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
)

export { Button, buttonVariants }
