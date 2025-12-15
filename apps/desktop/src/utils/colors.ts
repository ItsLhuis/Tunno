import ColorThief from "colorthief"

import { generateColorPalette, type Palette } from "@repo/utils"

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
