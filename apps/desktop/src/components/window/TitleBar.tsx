import * as React from "react"

import { cn } from "@lib/utils"

import { listen } from "@tauri-apps/api/event"

import { platform } from "@tauri-apps/plugin-os"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { Button } from "@/components/ui"

import { Minimize, Maximize, Restore, Close } from "./icons"

export type TitlebarProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode
  onMinimize?: () => void
  onMaximize?: () => void
  onClose?: () => void
  isMaximize?: boolean
}

const Titlebar = React.forwardRef<HTMLDivElement, TitlebarProps>(
  ({ className, children, onMinimize, onMaximize, onClose, isMaximize, ...props }, ref) => {
    const os = platform()

    const isMacOs = os === "macos"

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
          !isWindowFocused && "text-muted-foreground",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="flex-1 overflow-hidden m-3">{children}</div>
        {!isMacOs && (
          <div className="h-full flex items-center shrink-0">
            {onMinimize && (
              <Button
                variant="ghost"
                onClick={onMinimize}
                aria-label="Minimize"
                className="h-full rounded-none"
              >
                <Minimize />
              </Button>
            )}
            {onMaximize && (
              <Button
                variant="ghost"
                onClick={onMaximize}
                aria-label={isMaximize ? "Restore" : "Maximize"}
                className="h-full rounded-none"
              >
                {isMaximize ? <Restore /> : <Maximize />}
              </Button>
            )}
            {onClose && (
              <Button
                variant="ghost"
                onClick={onClose}
                aria-label="Close"
                className={
                  "h-full rounded-none hover:bg-[#c42b1c] hover:text-white focus-visible:bg-[#c42b1c] focus-visible:text-white active:bg-[#c42b1c]/90 active:text-white"
                }
              >
                <Close />
              </Button>
            )}
          </div>
        )}
      </div>
    )
  }
)
Titlebar.displayName = "Titlebar"

export { Titlebar }
