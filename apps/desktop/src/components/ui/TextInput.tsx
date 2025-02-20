import { forwardRef, type ComponentProps } from "react"

import { cn } from "@lib/utils"

const TextInput = forwardRef<HTMLInputElement, ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex shrink-0 h-9 w-full rounded-md border border-input bg-transparent selection:bg-primary selection:text-primary-foreground px-3 py-1 text-sm transition-[background-color,border-color,text-decoration-color,fill,stroke] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-within:border-primary focus-within:ring-primary focus-within:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
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
