"use client"

import { type ComponentType } from "react"

import * as LucideIcons from "lucide-react"
import { type LucideProps } from "lucide-react"

import { cn } from "@lib/utils"

export type IconProps = LucideProps & {
  name: keyof typeof LucideIcons
  isFilled?: boolean
}

function Icon({ name, isFilled = false, className }: IconProps) {
  const LucideIcon = (LucideIcons[name] ?? LucideIcons["Info"]) as ComponentType<LucideProps>

  return <LucideIcon className={cn("size-4", isFilled && "fill-current", className)} />
}
Icon.displayName = "Icon"

export { Icon }
