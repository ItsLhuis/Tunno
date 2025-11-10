import ColorThief from "colorthief"

import { adjustHue, darken, desaturate, lighten, parseToHsl, saturate } from "polished"

import { generateColorPalette, type Palette } from "@repo/utils"

export function rgbToHslString(rgb: string): string | null {
  try {
    const hsl = parseToHsl(rgb)
    return `${Math.round(hsl.hue || 0)} ${Math.round(hsl.saturation * 100)}% ${Math.round(hsl.lightness * 100)}%`
  } catch {
    return null
  }
}

export function createGradient(color: string): string {
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

export function paletteToCssVariables(palette: Palette | null): Record<string, string> {
  if (!palette) return {}

  const entries = Object.entries({
    "--background": palette.background ? rgbToHslString(palette.background) : null,
    "--foreground": palette.foreground ? rgbToHslString(palette.foreground) : null,
    "--muted": palette.muted ? rgbToHslString(palette.muted) : null,
    "--muted-foreground": palette.mutedForeground ? rgbToHslString(palette.mutedForeground) : null,
    "--primary": palette.primary ? rgbToHslString(palette.primary) : null,
    "--primary-foreground": palette.primaryForeground
      ? rgbToHslString(palette.primaryForeground)
      : null,
    "--accent": palette.accent ? rgbToHslString(palette.accent) : null,
    "--accent-foreground": palette.accentForeground
      ? rgbToHslString(palette.accentForeground)
      : null
  }).filter((entry): entry is [string, string] => entry[1] !== null)

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
