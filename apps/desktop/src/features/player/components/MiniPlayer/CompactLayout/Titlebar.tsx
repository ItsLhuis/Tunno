import { useState } from "react"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { motion } from "motion/react"

import { cn } from "@lib/utils"

import { Titlebar as WindowTitlebar } from "@components/window/Titlebar"

const Titlebar = () => {
  const [isWindowFocused, setIsWindowFocused] = useState(false)

  const handleClose = async () => {
    const currentWindow = getCurrentWindow()
    await currentWindow.hide()
  }

  const handleFocusChange = (isFocused: boolean) => {
    setIsWindowFocused(isFocused)
  }

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        width: isWindowFocused ? "2.25rem" : "0px",
        opacity: isWindowFocused ? 1 : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "shrink-0 overflow-hidden bg-sidebar",
        isWindowFocused && "border-r border-border"
      )}
    >
      <WindowTitlebar
        onClose={handleClose}
        onFocusChange={handleFocusChange}
        orientation="vertical"
        className="h-8"
      />
    </motion.div>
  )
}

export { Titlebar }
