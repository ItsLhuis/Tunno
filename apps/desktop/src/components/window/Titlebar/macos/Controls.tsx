import { useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { Close, Full, Maximize, Minimize } from "./icons"

import { ControlButton } from "../ControlButton"

type MacOsProps = {
  onClose: () => void
  onMinimize?: () => void
  onFullSceen?: () => void
  onMaximize?: () => void
  orientation?: "horizontal" | "vertical"
}

const MacOs = ({
  onClose,
  onMinimize,
  onFullSceen,
  onMaximize,
  orientation = "horizontal"
}: MacOsProps) => {
  const isVertical = orientation === "vertical"

  const [isAltKeyPressed, setIsAltKeyPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const lastKeyPressedIcon = isAltKeyPressed ? <Maximize /> : <Full />

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.altKey) setIsAltKeyPressed(true)
  }

  const handleKeyUp = (e: KeyboardEvent) => {
    if (!e.altKey) setIsAltKeyPressed(false)
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  const macOsButtonClassName =
    "h-3 w-3 flex content-center items-center justify-center self-center rounded-full border border-black/[.12] text-center text-black/60 dark:border-none [&_svg]:size-auto"

  const hasFullscreenOrMaximize = onFullSceen || onMaximize

  return (
    <div
      className={cn(
        "ml-3 mr-1 flex h-full items-center text-black active:text-black dark:text-black",
        isVertical ? "m-0 mt-3 flex-col space-y-2" : "space-x-2"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ControlButton
        onClick={onClose}
        aria-label="Close"
        className={cn(macOsButtonClassName, "bg-[#ff544d] hover:bg-[#ff544d] active:bg-[#bf403a]")}
      >
        {isHovered && <Close />}
      </ControlButton>
      {onMinimize && (
        <ControlButton
          onClick={onMinimize}
          aria-label="Minimize"
          className={cn(
            macOsButtonClassName,
            "bg-[#ffbd2e] hover:bg-[#ffbd2e] active:bg-[#bf9122]"
          )}
        >
          {isHovered && <Minimize />}
        </ControlButton>
      )}
      {hasFullscreenOrMaximize && (
        <ControlButton
          onClick={isAltKeyPressed && onMaximize ? onMaximize : onFullSceen}
          aria-label="FullScreen"
          className={cn(
            macOsButtonClassName,
            "bg-[#28c93f] hover:bg-[#28c93f] active:bg-[#1e9930]"
          )}
        >
          {isHovered && lastKeyPressedIcon}
        </ControlButton>
      )}
    </div>
  )
}

export { MacOs }
