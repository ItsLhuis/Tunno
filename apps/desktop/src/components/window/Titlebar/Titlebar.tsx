import { useState, useEffect, forwardRef, type HTMLAttributes, type ReactNode } from "react"

import { cn } from "@lib/utils"

import { listen } from "@tauri-apps/api/event"

import { platform } from "@tauri-apps/plugin-os"
import { getCurrentWindow } from "@tauri-apps/api/window"

import Controls from "./Controls"

export type TitlebarProps = HTMLAttributes<HTMLDivElement> & {
  children?: ReactNode
  onMinimize: () => void
  onMaximize: () => void
  onFullSceen: () => void
  onClose: () => void
}

const Titlebar = forwardRef<HTMLDivElement, TitlebarProps>(
  ({ className, children, onMinimize, onMaximize, onFullSceen, onClose, ...props }, ref) => {
    const isMacOs = platform() === "macos"

    const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false)
    const [isWindowFocused, setIsWindowFocused] = useState<boolean>(false)

    useEffect(() => {
      async function initializeTitlebarState() {
        const maximized = await getCurrentWindow().isMaximized()
        setIsWindowMaximized(maximized)

        const focused = await getCurrentWindow().isFocused()
        setIsWindowFocused(focused)
      }

      initializeTitlebarState()

      const initializeTitlebarListener = async () => {
        const resizeListener = await listen("tauri://resize", async () => {
          const maximized = await getCurrentWindow().isMaximized()
          setIsWindowMaximized(maximized)
        })

        const focusListener = await listen("tauri://focus", async () => {
          const focused = await getCurrentWindow().isFocused()
          setIsWindowFocused(focused)
        })

        const blurListener = await listen("tauri://blur", async () => {
          setIsWindowFocused(false)
        })

        return { resizeListener, focusListener, blurListener }
      }

      let unlisten: {
        resizeListener: () => void
        focusListener: () => void
        blurListener: () => void
      }

      initializeTitlebarListener().then((listeners) => {
        unlisten = listeners
      })

      return () => {
        if (unlisten) {
          unlisten.resizeListener()
          unlisten.focusListener()
          unlisten.blurListener()
        }
      }
    }, [])

    return (
      <div
        data-tauri-drag-region
        className={cn(
          "flex items-center flex-nowrap h-full min-h-9 z-50",
          !isMacOs && !isWindowFocused && "text-muted-foreground",
          className,
          isMacOs && "flex-row-reverse"
        )}
        ref={ref}
        {...props}
      >
        <div className="flex-1 overflow-hidden m-3">{children}</div>
        <Controls
          platform={platform()}
          isWindowFocused={isWindowFocused}
          isWindowMaximized={isWindowMaximized}
          onMinimize={onMinimize}
          onMaximize={onMaximize}
          onFullSceen={onFullSceen}
          onClose={onClose}
        />
      </div>
    )
  }
)
Titlebar.displayName = "Titlebar"

export { Titlebar }
