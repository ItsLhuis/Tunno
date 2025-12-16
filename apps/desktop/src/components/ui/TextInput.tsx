"use client"

import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

const TextInput = ({ className, type, ...props }: ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground bg-sidebar/75 border-input focus-visible:border-primary aria-invalid:border-destructive h-9 w-full min-w-0 rounded border px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
      autoComplete="off"
    />
  )
}

export { TextInput }
