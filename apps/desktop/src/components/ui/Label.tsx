import { type ComponentProps } from "react"

import * as LabelPrimitive from "@radix-ui/react-label"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed transition-opacity peer-disabled:opacity-70"
)

const Label = ({
  className,
  ref,
  ...props
}: ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>) => {
  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
}

export { Label }
