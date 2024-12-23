import React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

export const typographyVariants = cva("inline", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight",
      h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7 [&:not(:first-child)]:mt-6",
      blockquote: "border-l-4 pl-4 italic text-muted-foreground transition-[border-color]",
      code: "font-mono text-sm bg-muted rounded p-1 transition-[background-color]",
      pre: "font-mono text-sm bg-muted rounded p-2 overflow-x-auto transition-[background-color]",
      span: "text-xs"
    },
    affects: {
      default: "",
      lead: "text-xl text-muted-foreground",
      large: "text-lg",
      small: "text-sm leading-none",
      tiny: "text-xs leading-none",
      muted: "text-muted-foreground",
      bold: "font-bold",
      removePMargin: "[&:not(:first-child)]:mt-0"
    }
  },
  defaultVariants: {
    variant: "p",
    affects: "default"
  }
})

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  component?: React.ElementType
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, component: Comp = "p", affects, ...props }, ref) => {
    return (
      <Comp
        className={cn(typographyVariants({ variant, affects, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Typography.displayName = "Typography"

export { Typography }
