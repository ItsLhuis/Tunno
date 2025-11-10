import { type ComponentProps } from "react"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

type BadgeProps = ComponentProps<"div"> & VariantProps<typeof badgeVariants>

const badgeVariants = cva(
  "inline-flex items-center rounded border px-1 py-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        muted: "border-transparent bg-muted text-muted-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        info: "border-transparent bg-info text-info-foreground",
        warning: "border-transparent bg-warning text-warning-foreground",
        error: "border-transparent bg-error text-error-foreground",
        success: "border-transparent bg-success text-success-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
