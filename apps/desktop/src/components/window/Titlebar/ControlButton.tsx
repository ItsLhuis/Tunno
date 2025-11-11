import { type ComponentProps } from "react"

import { cn } from "@lib/utils"

const ControlButton = ({ className, children, ...props }: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "inline-flex cursor-default items-center justify-center transition-colors focus:ring-0 focus:outline-hidden",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { ControlButton }
