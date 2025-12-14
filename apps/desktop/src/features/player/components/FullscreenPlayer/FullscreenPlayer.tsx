import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { createGradient } from "@utils/colors"

import { Fade, IconButton } from "@components/ui"

import { NextSongPreview } from "./NextSongPreview"
import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { ToggleFavorite } from "./ToggleFavorite"
import { TrackInfo } from "./TrackInfo"

import { AnimatePresence, LayoutGroup, motion } from "motion/react"

import { type Palette } from "@repo/utils"

const FullscreenPlayer = () => {
  const { t } = useTranslation()

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  const [showControls, setShowControls] = useState(true)

  const cssVariables = usePaletteCssVariables(palette)

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
      className="relative h-screen w-screen overflow-hidden"
      style={cssVariables as React.CSSProperties}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
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
          <div className="flex size-full flex-col items-center justify-end gap-[3vh]">
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
                  transition={{ duration: 0.4, ease: "easeOut" }}
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
          </div>
        </LayoutGroup>
        <NextSongPreview />
      </div>
    </div>
  )
}

export { FullscreenPlayer }
