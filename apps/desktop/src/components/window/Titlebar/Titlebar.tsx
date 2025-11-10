import { Fragment, useEffect, useState, type ComponentProps, type ReactNode } from "react"

import { cn } from "@lib/utils"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"
import { platform } from "@tauri-apps/plugin-os"

import { Controls } from "./Controls"

export type TitlebarProps = ComponentProps<"div"> & {
  children?: ReactNode
  onMinimize?: () => void
  onMaximize?: () => void
  onFullSceen?: () => void
  onClose: () => void
  onFocusChange?: (isFocused: boolean) => void
  orientation?: "horizontal" | "vertical"
}

const Titlebar = ({
  className,
  children,
  onMinimize,
  onMaximize,
  onFullSceen,
  onClose,
  onFocusChange,
  orientation = "horizontal",
  ref,
  ...props
}: TitlebarProps) => {
  const currentPlatform = platform()

  const isMacOs = currentPlatform === "macos"
  const isVertical = orientation === "vertical"

  const [isWindowMaximized, setIsWindowMaximized] = useState(false)
  const [isWindowFocused, setIsWindowFocused] = useState(false)

  useEffect(() => {
    onFocusChange?.(isWindowFocused)
  }, [isWindowFocused, onFocusChange])

  useEffect(() => {
    const initializeTitlebarState = async () => {
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
        "z-50 flex h-full min-h-9 flex-nowrap items-center",
        !isMacOs && !isWindowFocused && "text-muted-foreground",
        className,
        !isVertical && isMacOs && "flex-row-reverse",
        isVertical && "h-full min-w-8 flex-col justify-start"
      )}
      ref={ref}
      {...props}
    >
      {isVertical ? (
        <Fragment>
          <div className="flex min-h-8 w-full items-stretch justify-center">
            <Controls
              platform={currentPlatform}
              isWindowFocused={isWindowFocused}
              isWindowMaximized={isWindowMaximized}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
              onFullSceen={onFullSceen}
              onClose={onClose}
              orientation="vertical"
            />
          </div>
          <div className="m-3 flex-1 overflow-hidden">{children}</div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="m-3 flex-1 overflow-hidden">{children}</div>
          <Controls
            platform={currentPlatform}
            isWindowFocused={isWindowFocused}
            isWindowMaximized={isWindowMaximized}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onFullSceen={onFullSceen}
            onClose={onClose}
            orientation="horizontal"
          />
        </Fragment>
      )}
    </div>
  )
}

export { Titlebar }
