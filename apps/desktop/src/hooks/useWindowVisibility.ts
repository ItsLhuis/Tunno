import { useEffect, useState } from "react"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"

/**
 * Custom hook to track the visibility state of the current Tauri window.
 *
 * This hook leverages the Tauri API to listen for window focus and blur events,
 * updating its state to reflect whether the window is currently visible to the user.
 *
 * @returns A boolean indicating whether the current window is visible (`true`) or not (`false`).
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isWindowVisible = useWindowVisibility();
 *
 *   return (
 *     <div>
 *       <p>Window is currently: {isWindowVisible ? "Visible" : "Hidden"}</p>
 *       {!isWindowVisible && <p>Content paused because window is not active.</p>}
 *     </div>
 *   );
 * }
 * ```
 */
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
