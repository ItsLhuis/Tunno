import * as React from "react"

import { cn } from "@lib/utils"

import { Button } from "@components/ui"

import {
  Subtract12Regular,
  Square12Regular,
  SquareMultiple16Regular,
  Dismiss12Regular
} from "@fluentui/react-icons"

export interface TitleBarProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  isMaximize?: boolean
}

const TitleBar = React.forwardRef<HTMLDivElement, TitleBarProps>(
  ({ className, children, onMinimize, onMaximize, onClose, isMaximize, ...props }, ref) => {
    return (
      <div
        data-tauri-drag-region
        className={cn(
          "relative flex items-center justify-between text-neutral-100 select-none min-h-9",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        <div className="absolute top-0 bottom-0 right-0 flex items-center z-50 ">
          {onMinimize && (
            <Button
              variant="ghost"
              onClick={onMinimize}
              aria-label="Minimize"
              className="h-full rounded-none"
            >
              <Subtract12Regular />
            </Button>
          )}
          {onMaximize && (
            <Button
              variant="ghost"
              onClick={onMaximize}
              aria-label={isMaximize ? "Restore" : "Maximize"}
              className="h-full rounded-none"
            >
              {isMaximize ? <SquareMultiple16Regular /> : <Square12Regular />}
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              onClick={onClose}
              aria-label="Close"
              className="h-full rounded-none hover:bg-destructive hover:active:bg-destructive/70 hover:text-white"
            >
              <Dismiss12Regular />
            </Button>
          )}
        </div>
      </div>
    )
  }
)

TitleBar.displayName = "TitleBar"

export { TitleBar }
