import { type ButtonHTMLAttributes } from "react"

import { cn } from "@lib/utils"

function ControlButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
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
