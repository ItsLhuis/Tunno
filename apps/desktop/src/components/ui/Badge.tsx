import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

const badgeVariants = cva(
  "inline-flex items-center rounded border px-1 py-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        muted: "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        info: "border-transparent bg-info text-info-foreground hover:bg-info/80",
        warning: "border-transparent bg-warning text-warning-foreground hover:bg-warning/80",
        error: "border-transparent bg-error text-error-foreground hover:bg-error/80",
        success: "border-transparent bg-success text-success-foreground hover:bg-success/80"
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
