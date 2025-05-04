"use client"

import { type HTMLAttributes } from "react"

import { cn } from "@lib/utils"

import { Icon } from "@components/ui/Icon"

function Loader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex animate-spin items-center justify-center text-muted-foreground [&_svg]:size-5",
        className
      )}
      {...props}
    >
      <Icon name="Loader" className="text-primary" />
    </div>
  )
}
Loader.displayName = "Loader"

export { Loader }
