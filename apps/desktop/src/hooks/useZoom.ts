import { useCallback, useEffect } from "react"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow"

const ZOOM_STEP = 0.1
const MIN_ZOOM = 0.5
const MAX_ZOOM = 1.5

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
