"use client"

import { type ComponentProps } from "react"

import * as LabelPrimitive from "@radix-ui/react-label"

import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@lib/utils"

const labelVariants = cva(
  "flex gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:opacity-50 transition-opacity"
)

export type LabelProps = ComponentProps<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>

const Label = ({ className, ...props }: LabelProps) => {
  return (
    <LabelPrimitive.Root data-slot="label" className={cn(labelVariants(), className)} {...props} />
  )
}

export { Label }
