import { type Platform } from "@tauri-apps/plugin-os"

import Linux from "./linux/Controls"
import MacOs from "./macos/Controls"
import Windows from "./windows/Controls"

export type ConotrolsProps = {
  platform: Platform
  isWindowMaximized: boolean
  isWindowFocused: boolean
  onMinimize: () => void
  onMaximize: () => void
  onFullSceen: () => void
  onClose: () => void
}

function Controls({
  platform,
  isWindowMaximized,
  isWindowFocused,
  onMinimize,
  onMaximize,
  onFullSceen,
  onClose
}: ConotrolsProps) {
  const ControlsComp = (() => {
    switch (platform) {
      case "windows":
        return (
          <Windows
            isWindowMaximized={isWindowMaximized}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
        )
      case "linux":
        return (
          <Linux
            isWindowMaximized={isWindowMaximized}
            isWindowFocused={isWindowFocused}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
        )
      case "macos":
        return (
          <MacOs
            onClose={onClose}
            onMinimize={onMinimize}
            onFullSceen={onFullSceen}
            onMaximize={onMaximize}
          />
        )
      default:
        return (
          <Windows
            isWindowMaximized={isWindowMaximized}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
        )
    }
  })()

  return ControlsComp
}

export default Controls
