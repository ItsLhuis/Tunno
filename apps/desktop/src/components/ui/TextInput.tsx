import { forwardRef, type ComponentProps } from "react"

import { cn } from "@lib/utils"

const TextInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full shrink-0 rounded-md border border-input bg-transparent px-3 py-1 text-sm transition-[background-color,border-color,text-decoration-color,fill,stroke] selection:bg-primary selection:text-primary-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
        autoComplete="off"
      />
    )
  }
)
TextInput.displayName = "TextInput"

export { TextInput }
