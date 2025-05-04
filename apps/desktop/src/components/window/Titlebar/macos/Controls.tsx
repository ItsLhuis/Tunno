import { useEffect, useState } from "react"

import { cn } from "@lib/utils"

import { Close, Full, Maximize, Minimize } from "./icons"

import { ControlButton } from "../ControlButton"

type MacOsProps = {
  onClose: () => void
  onMinimize: () => void
  onFullSceen: () => void
  onMaximize: () => void
}

function MacOs({ onClose, onMinimize, onFullSceen, onMaximize }: MacOsProps) {
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

  return (
    <div
      className="ml-3 flex h-full items-center space-x-2 text-black active:text-black dark:text-black"
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
      <ControlButton
        onClick={onMinimize}
        aria-label="Minimize"
        className={cn(macOsButtonClassName, "bg-[#ffbd2e] hover:bg-[#ffbd2e] active:bg-[#bf9122]")}
      >
        {isHovered && <Minimize />}
      </ControlButton>
      <ControlButton
        onClick={isAltKeyPressed ? onMaximize : onFullSceen}
        aria-label="FullScreen"
        className={cn(macOsButtonClassName, "bg-[#28c93f] hover:bg-[#28c93f] active:bg-[#1e9930]")}
      >
        {isHovered && lastKeyPressedIcon}
      </ControlButton>
    </div>
  )
}

export default MacOs
