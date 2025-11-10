import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

const ControlButton = ({ className, children, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "inline-flex cursor-default items-center justify-center transition-colors focus:outline-none focus:ring-0",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { ControlButton }
