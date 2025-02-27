"use client"

import { type HTMLAttributes } from "react"

import { cn } from "@lib/utils"

import { Icon } from "@components/ui/Icon"

function Spinner({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-spin flex items-center justify-center [&_svg]:size-5 text-muted-foreground",
        className
      )}
      {...props}
    >
      <Icon name="Loader" className="text-primary" />
    </div>
  )
}
Spinner.displayName = "Spinner"

export { Spinner }
