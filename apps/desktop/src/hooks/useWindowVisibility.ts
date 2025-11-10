import { useEffect, useState } from "react"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"

export function useWindowVisibility() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const window = getCurrentWindow()

    const initializeVisibility = async () => {
      const visible = await window.isVisible()
      setIsVisible(visible)
    }

    initializeVisibility()

    const setupListeners = async () => {
      const unlistenFocus = await listen("tauri://focus", async () => {
        const visible = await window.isVisible()
        setIsVisible(visible)
      })

      const unlistenBlur = await listen("tauri://blur", async () => {
        const visible = await window.isVisible()
        setIsVisible(visible)
      })

      return () => {
        unlistenFocus()
        unlistenBlur()
      }
    }

    let cleanup: (() => void) | undefined

    setupListeners().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return isVisible
}
