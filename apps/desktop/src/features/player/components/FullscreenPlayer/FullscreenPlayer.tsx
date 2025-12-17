import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { cn } from "@lib/utils"

import { Fade, IconButton } from "@components/ui"

import { NextSongPreview } from "./NextSongPreview"
import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { ToggleFavorite } from "./ToggleFavorite"
import { TrackInfo } from "./TrackInfo"

import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { createGradient } from "../../utils/colors"

import { type Palette } from "@repo/utils"

const INACTIVITY_TIMEOUT = 3000

const FullscreenPlayer = () => {
  const { t } = useTranslation()

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  const [showControls, setShowControls] = useState(true)
  const [isMouseInside, setIsMouseInside] = useState(true)

  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cssVariables = usePaletteCssVariables(palette)

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
    }

    setShowControls(true)

    inactivityTimerRef.current = setTimeout(() => {
      setShowControls(false)
    }, INACTIVITY_TIMEOUT)
  }, [])

  const handleMouseMove = useCallback(() => {
    if (isMouseInside) {
      resetInactivityTimer()
    }
  }, [isMouseInside, resetInactivityTimer])

  const handleMouseEnter = useCallback(() => {
    setIsMouseInside(true)
    resetInactivityTimer()
  }, [resetInactivityTimer])

  const handleMouseLeave = useCallback(() => {
    setIsMouseInside(false)
    setShowControls(false)

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    resetInactivityTimer()

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current)
      }
    }
  }, [resetInactivityTimer])

  useEffect(() => {
    const root = document.documentElement

    if (palette) {
      Object.entries(cssVariables).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(key, value)
        }
      })

      return () => {
        Object.keys(cssVariables).forEach((key) => {
          root.style.removeProperty(key)
        })
      }
    }
  }, [palette, cssVariables])

  const handleExitFullscreen = async () => {
    const fullscreenWindow = getCurrentWindow()
    const mainWindow = await WebviewWindow.getByLabel("main")

    if (mainWindow) {
      await fullscreenWindow.hide()
      await mainWindow.show()
      await mainWindow.setFocus()
    }
  }

  const gradientBackground = dominantColor ? createGradient(dominantColor) : undefined

  return (
    <div
      className={cn("relative h-screen w-screen overflow-hidden", !showControls && "cursor-none")}
      style={cssVariables as CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence>
        <motion.div
          key={dominantColor}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            backgroundImage: gradientBackground
          }}
        />
      </AnimatePresence>
      <div className="text-foreground absolute inset-0 flex flex-col items-center justify-center p-[6vh]">
        <Fade show={showControls} className="absolute top-[2vh] right-[2vh] z-10">
          <IconButton
            name="Minimize2"
            tooltip={t("common.exitFullScreen")}
            variant="ghost"
            className="shrink-0"
            onClick={handleExitFullscreen}
          />
        </Fade>
        <LayoutGroup>
          <motion.div layout className="flex size-full flex-col items-center justify-end gap-[3vh]">
            <TrackInfo onPaletteChange={setPalette} onDominantColorChange={setDominantColor} />
            <AnimatePresence mode="popLayout">
              {showControls && (
                <motion.div
                  key="controls"
                  layout
                  className="flex w-full flex-col items-center justify-center gap-[3vh]"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <PlaybackProgress />
                  <div className="flex items-center justify-center gap-[1vh]">
                    <ToggleFavorite />
                    <PlaybackControls />
                    <PlaybackVolumeControl />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <NextSongPreview />
      </div>
    </div>
  )
}

export { FullscreenPlayer }
