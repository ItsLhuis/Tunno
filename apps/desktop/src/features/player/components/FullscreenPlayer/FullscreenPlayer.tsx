import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { IconButton } from "@components/ui"

import { adjustHue, darken, desaturate, lighten, parseToHsl, saturate } from "polished"

import { NextSongPreview } from "./NextSongPreview"
import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { ToggleFavorite } from "./ToggleFavorite"
import { TrackInfo } from "./TrackInfo"

import { motion } from "motion/react"

import { type Palette } from "@repo/utils"

const rgbToHslString = (rgb: string): string | null => {
  try {
    const hsl = parseToHsl(rgb)
    return `${Math.round(hsl.hue || 0)} ${Math.round(hsl.saturation * 100)}% ${Math.round(hsl.lightness * 100)}%`
  } catch {
    return null
  }
}

const createGradient = (color: string): string => {
  try {
    const bottom = saturate(0.08, adjustHue(8, lighten(0.12, color)))
    const lowerMid = saturate(0.05, adjustHue(5, lighten(0.06, color)))

    const midLower = saturate(0.02, adjustHue(2, darken(0.02, color)))
    const center = adjustHue(1, darken(0.03, color))

    const midUpper = desaturate(0.03, adjustHue(-3, darken(0.08, color)))
    const upperMid = desaturate(0.06, adjustHue(-6, darken(0.16, color)))

    const top = desaturate(0.09, adjustHue(-9, darken(0.28, color)))

    return `linear-gradient(to top,
      ${bottom} 0%,
      ${lowerMid} 16%,
      ${midLower} 30%,
      ${center} 46%,
      ${midUpper} 60%,
      ${upperMid} 76%,
      ${top} 100%)`
  } catch {
    return color
  }
}

const FullscreenPlayer = () => {
  const { t } = useTranslation()

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  useEffect(() => {
    const root = document.documentElement

    if (palette) {
      const variables = {
        "--background": palette.background ? rgbToHslString(palette.background) : null,
        "--foreground": palette.foreground ? rgbToHslString(palette.foreground) : null,
        "--muted": palette.muted ? rgbToHslString(palette.muted) : null,
        "--muted-foreground": palette.mutedForeground
          ? rgbToHslString(palette.mutedForeground)
          : null,
        "--primary": palette.primary ? rgbToHslString(palette.primary) : null,
        "--primary-foreground": palette.primaryForeground
          ? rgbToHslString(palette.primaryForeground)
          : null,
        "--accent": palette.accent ? rgbToHslString(palette.accent) : null,
        "--accent-foreground": palette.accentForeground
          ? rgbToHslString(palette.accentForeground)
          : null
      }

      Object.entries(variables).forEach(([key, value]) => {
        if (value) {
          root.style.setProperty(key, value)
        }
      })

      return () => {
        Object.keys(variables).forEach((key) => {
          root.style.removeProperty(key)
        })
      }
    }
  }, [palette])

  const cssVariables = palette
    ? Object.fromEntries(
        Object.entries({
          "--background": palette.background ? rgbToHslString(palette.background) : null,
          "--foreground": palette.foreground ? rgbToHslString(palette.foreground) : null,
          "--muted": palette.muted ? rgbToHslString(palette.muted) : null,
          "--muted-foreground": palette.mutedForeground
            ? rgbToHslString(palette.mutedForeground)
            : null,
          "--primary": palette.primary ? rgbToHslString(palette.primary) : null,
          "--primary-foreground": palette.primaryForeground
            ? rgbToHslString(palette.primaryForeground)
            : null,
          "--accent": palette.accent ? rgbToHslString(palette.accent) : null,
          "--accent-foreground": palette.accentForeground
            ? rgbToHslString(palette.accentForeground)
            : null
        }).filter(([, value]) => value !== null)
      )
    : {}

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
      className="flex h-screen w-screen flex-col items-center justify-center overflow-hidden p-[6vh] text-foreground"
      animate={{
        backgroundImage: gradientBackground
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={cssVariables as React.CSSProperties}
    >
      <div className="absolute right-[2vh] top-[2vh] z-10">
        <IconButton
          name="Minimize2"
          tooltip={t("common.exitFullScreen")}
          variant="ghost"
          className="shrink-0"
          onClick={handleExitFullscreen}
        />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-end gap-[3vh]">
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
