import { type ButtonHTMLAttributes } from "react"

import { cn } from "@lib/utils"

function ControlButton({ className, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "cursor-default inline-flex items-center justify-center focus:outline-none focus:ring-0 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
ControlButton.displayName = "ControlButton"

export { ControlButton }
