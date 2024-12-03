import * as React from "react"

import { cn } from "@lib/utils"

import { Button } from "@/components/ui"

import { MinimizeIcon, MaximizeIcon, RestoreIcon, CloseIcon } from "./win/icons"

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
        className={cn("flex items-center flex-nowrap min-h-9", className)}
        ref={ref}
        {...props}
      >
        <div className="flex-1 overflow-hidden">{children}</div>
        <div className="h-full flex items-center flex-shrink-0">
          {onMinimize && (
            <Button
              variant="ghost"
              onClick={onMinimize}
              aria-label="Minimize"
              className="h-full rounded-none"
              tabIndex={-1}
            >
              <MinimizeIcon />
            </Button>
          )}
          {onMaximize && (
            <Button
              variant="ghost"
              onClick={onMaximize}
              aria-label={isMaximize ? "Restore" : "Maximize"}
              className="h-full rounded-none"
              tabIndex={-1}
            >
              {isMaximize ? <RestoreIcon /> : <MaximizeIcon />}
            </Button>
          )}
          {onClose && (
            <Button
              variant="ghost"
              onClick={onClose}
              aria-label="Close"
              className="h-full rounded-none hover:bg-destructive hover:text-destructive-foreground"
              tabIndex={-1}
            >
              <CloseIcon />
            </Button>
          )}
        </div>
      </div>
    )
  }
)

TitleBar.displayName = "TitleBar"

export { TitleBar }
