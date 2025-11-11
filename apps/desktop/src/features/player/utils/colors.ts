import ColorThief from "colorthief"

import { clampChroma, converter, formatCss } from "culori"

import { generateColorPalette, type Palette } from "@repo/utils"

const toOklch = converter("oklch")

export function createGradient(color: string): string {
  try {
    const oklch = toOklch(color)
    if (!oklch || oklch.mode !== "oklch") {
      return color
    }

    const { l, c, h } = oklch
    const baseH = h ?? 0

    const adjustColor = (lightnessDelta: number, chromaDelta: number, hueDelta: number) => {
      const newL = Math.max(0, Math.min(1, (l ?? 0.5) + lightnessDelta))
      const newC = Math.max(0, Math.min(0.4, (c ?? 0) + chromaDelta))
      const newH = h !== undefined ? (baseH + hueDelta + 360) % 360 : undefined

      const adjusted = clampChroma({ mode: "oklch", l: newL, c: newC, h: newH }, "oklch")

      return formatCss(adjusted) ?? color
    }

    const bottom = adjustColor(0.12, 0.08, 8)
    const lowerMid = adjustColor(0.06, 0.05, 5)
    const midLower = adjustColor(-0.02, 0.02, 2)
    const center = adjustColor(-0.03, 0, 1)
    const midUpper = adjustColor(-0.08, -0.03, -3)
    const upperMid = adjustColor(-0.16, -0.06, -6)
    const top = adjustColor(-0.28, -0.09, -9)

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

export function paletteToCssVariables(palette: Palette | null): Record<string, string> {
  if (!palette) return {}

  const entries = Object.entries({
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--primary": palette.primary,
    "--primary-foreground": palette.primaryForeground,
    "--accent": palette.accent,
    "--accent-foreground": palette.accentForeground
  }).filter((entry): entry is [string, string] => entry[1] !== null && entry[1] !== undefined)

  return Object.fromEntries(entries)
}

export function extractColorFromImage(image: HTMLImageElement): string | null {
  try {
    const colorThief = new ColorThief()
    const color = colorThief.getColor(image) as [number, number, number]
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  } catch {
    return null
  }
}

export function extractPaletteFromImage(image: HTMLImageElement): Palette | null {
  try {
    const colorThief = new ColorThief()
    const color = colorThief.getColor(image) as [number, number, number]
    return generateColorPalette(color)
  } catch {
    return null
  }
}
