import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { usePaletteCssVariables } from "../../hooks/usePaletteCssVariables"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { createGradient } from "../../utils"

import { IconButton } from "@components/ui"

import { NextSongPreview } from "./NextSongPreview"
import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { ToggleFavorite } from "./ToggleFavorite"
import { TrackInfo } from "./TrackInfo"

import { motion } from "motion/react"

import { type Palette } from "@repo/utils"

const FullscreenPlayer = () => {
  const { t } = useTranslation()

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

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
    <motion.div
      className="text-foreground flex h-screen w-screen flex-col items-center justify-center overflow-hidden p-[6vh]"
      animate={{
        backgroundImage: gradientBackground
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={cssVariables as React.CSSProperties}
    >
      <div className="absolute top-[2vh] right-[2vh] z-10">
        <IconButton
          name="Minimize2"
          tooltip={t("common.exitFullScreen")}
          variant="ghost"
          className="shrink-0"
          onClick={handleExitFullscreen}
        />
      </div>
      <div className="flex size-full flex-col items-center justify-end gap-[3vh]">
        <div className="flex w-full flex-col items-center justify-center gap-[6vh]">
          <TrackInfo onPaletteChange={setPalette} onDominantColorChange={setDominantColor} />
          <PlaybackProgress />
        </div>
        <div className="flex items-center justify-center gap-[1vh]">
          <ToggleFavorite />
          <PlaybackControls />
          <PlaybackVolumeControl />
        </div>
      </div>
      <NextSongPreview />
    </motion.div>
  )
}

export { FullscreenPlayer }
