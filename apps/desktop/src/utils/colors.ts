import ColorThief from "colorthief"

import { generateColorPalette, type Palette } from "@repo/utils"

/**
 * Converts a `Palette` object into a record of CSS variable declarations.
 *
 * This utility generates CSS custom properties (e.g., `--background: #RRGGBB;`)
 * from a given color palette, making it easy to apply dynamic theming
 * in web contexts.
 *
 * @param palette - The color `Palette` object to convert, or `null`.
 * @returns A `Record` mapping CSS variable names to their color values, or an empty object if no palette is provided.
 */
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

/**
 * Extracts a single dominant color from an HTML image element using `colorthief`.
 *
 * @param image - The `HTMLImageElement` from which to extract the color.
 * @returns A color string (e.g., "rgb(R, G, B)") representing the dominant color, or `null` if extraction fails.
 */
export function extractColorFromImage(image: HTMLImageElement): string | null {
  try {
    const colorThief = new ColorThief()
    const color = colorThief.getColor(image) as [number, number, number]
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
  } catch {
    return null
  }
}

/**
 * Extracts a dominant color from an HTML image element and generates a full color palette (shades) from it.
 * This is useful for theming or dynamic styling based on album art or other images.
 *
 * @param image - The `HTMLImageElement` from which to extract the palette.
 * @returns A `Palette` object (containing various shades) or `null` if extraction or palette generation fails.
 */
export function extractPaletteFromImage(image: HTMLImageElement): Palette | null {
  try {
    const colorThief = new ColorThief()
    const color = colorThief.getColor(image) as [number, number, number]
    // generateColorPalette expects an RGB tuple and a format string (defaults to rgb).
    return generateColorPalette(color)
  } catch {
    return null
  }
}
