import { useCallback, useEffect } from "react"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

/**
 * The increment/decrement step for zoom level changes.
 */
const ZOOM_STEP = 0.1
/**
 * The minimum allowed zoom level.
 */
const MIN_ZOOM = 0.5
/**
 * The maximum allowed zoom level.
 */
const MAX_ZOOM = 1.5

/**
 * Custom hook to manage the zoom level of the Tauri webview.
 *
 * This hook provides functionality to zoom in, zoom out, and reset the zoom level
 * of the application's webview. It integrates with keyboard shortcuts (Ctrl/Cmd +/-, 0)
 * and persists the zoom level using the `useSettingsStore`.
 *
 * @returns An object containing the current `zoomLevel`, `setZoomLevel` action,
 *          `zoomIn`, `zoomOut`, `resetZoom` functions, and `MIN_ZOOM`, `MAX_ZOOM`, `ZOOM_STEP` constants.
 *
 * @example
 * ```tsx
 * function ZoomControls() {
 *   const { zoomLevel, zoomIn, zoomOut, resetZoom } = useZoom();
 *
 *   return (
 *     <div>
 *       <p>Current Zoom: {(zoomLevel * 100).toFixed(0)}%</p>
 *       <button onClick={zoomIn}>Zoom In</button>
 *       <button onClick={zoomOut}>Zoom Out</button>
 *       <button onClick={resetZoom}>Reset Zoom</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useZoom() {
  const { zoomLevel, setZoomLevel } = useSettingsStore(
    useShallow((state) => ({ zoomLevel: state.zoomLevel, setZoomLevel: state.setZoomLevel }))
  )

  const applyZoom = useCallback(async (level: number) => {
    try {
      const webview = getCurrentWebviewWindow()
      await webview.setZoom(level)
    } catch (error) {
      console.error("useZoom: Error applying zoom:", error)
    }
  }, [])

  const zoomIn = useCallback(() => {
    const newLevel = Math.min(MAX_ZOOM, zoomLevel + ZOOM_STEP)
    setZoomLevel(newLevel)
  }, [zoomLevel, setZoomLevel])

  const zoomOut = useCallback(() => {
    const newLevel = Math.max(MIN_ZOOM, zoomLevel - ZOOM_STEP)
    setZoomLevel(newLevel)
  }, [zoomLevel, setZoomLevel])

  const resetZoom = useCallback(() => {
    setZoomLevel(1)
  }, [setZoomLevel])

  useEffect(() => {
    applyZoom(zoomLevel)
  }, [zoomLevel, applyZoom])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "=" || e.key === "+") {
          e.preventDefault()
          zoomIn()
        } else if (e.key === "-") {
          e.preventDefault()
          zoomOut()
        } else if (e.key === "0") {
          e.preventDefault()
          resetZoom()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [zoomIn, zoomOut, resetZoom])

  return {
    zoomLevel,
    setZoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    MIN_ZOOM,
    MAX_ZOOM,
    ZOOM_STEP
  }
}
