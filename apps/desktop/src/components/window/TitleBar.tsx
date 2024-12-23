import * as React from "react"

import { cn } from "@lib/utils"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"

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
    const [isWindowFocused, setIsWindowFocused] = React.useState<boolean>(false)

    React.useEffect(() => {
      async function initializeWindowFocus() {
        const focused = await getCurrentWindow().isFocused()
        setIsWindowFocused(focused)
      }

      initializeWindowFocus()

      const initializeFocusListener = async () => {
        const focusListener = await listen("tauri://focus", async () => {
          const focused = await getCurrentWindow().isFocused()
          setIsWindowFocused(focused)
        })

        const blurListener = await listen("tauri://blur", async () => {
          setIsWindowFocused(false)
        })

        return { focusListener, blurListener }
      }

      let unlisten: { focusListener: () => void; blurListener: () => void }

      initializeFocusListener().then((listeners) => {
        unlisten = listeners
      })

      return () => {
        if (unlisten) {
          unlisten.focusListener()
          unlisten.blurListener()
        }
      }
    }, [])

    return (
      <div
        data-tauri-drag-region
        className={cn(
          "flex items-center flex-nowrap min-h-9 z-50",
          isWindowFocused ? "" : "text-muted-foreground",
          className
        )}
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
