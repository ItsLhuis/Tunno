"use no memo"

import { Locales, type LocaleKeys } from "@repo/i18n"

import { type ColorProp } from "react-native-android-widget"

/**
 * All possible translation keys for the widget.
 * These map directly to keys in the `common` section of translations.
 */
export type WidgetTranslationKey = "noSongPlaying" | "unknownArtist"

/**
 * Fallback strings for when translations are unavailable
 */
const FALLBACK_STRINGS: Record<WidgetTranslationKey, string> = {
  noSongPlaying: "No song playing",
  unknownArtist: "Unknown Artist"
}

/**
 * Get a translated string for the widget.
 * Widgets cannot use React hooks, so this function accesses translations directly.
 */
export function getTranslation(key: WidgetTranslationKey, language: string): string {
  try {
    const locale = Locales[language as LocaleKeys]
    if (!locale) return FALLBACK_STRINGS[key]

    return locale.translations.common[key] ?? FALLBACK_STRINGS[key]
  } catch {
    return FALLBACK_STRINGS[key]
  }
}

/**
 * Converts an RGB string (rgb(r, g, b)) to RGBA ColorProp format.
 */
export function rgbToRgba(rgb: string, alpha: number = 1): ColorProp {
  if (!rgb) return `rgba(0, 0, 0, ${alpha})` as ColorProp

  if (rgb.startsWith("rgba")) {
    const match = rgb.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
    if (match) {
      return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})` as ColorProp
    }
  }

  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)
  if (!match) return `rgba(0, 0, 0, ${alpha})` as ColorProp

  return `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${alpha})` as ColorProp
}

/**
 * Converts a hex color (#RRGGBB) to RGBA ColorProp format.
 */
export function hexToRgba(hex: string, alpha: number = 1): ColorProp {
  if (!hex) return `rgba(0, 0, 0, ${alpha})` as ColorProp

  const color = hex.replace("#", "")
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})` as ColorProp
}

/**
 * Converts any color format (hex, rgb, rgba) to RGBA ColorProp format.
 */
export function toRgbaColorProp(color: string, alpha?: number): ColorProp {
  if (!color) return "rgba(0, 0, 0, 1)" as ColorProp

  if (color.startsWith("rgba(")) {
    if (alpha === undefined) return color as ColorProp
    return rgbToRgba(color, alpha)
  }

  if (color.startsWith("#")) {
    return hexToRgba(color, alpha ?? 1)
  }

  if (color.startsWith("rgb(")) {
    return rgbToRgba(color, alpha ?? 1)
  }

  return color as ColorProp
}

/**
 * Determines if a color is light or dark based on luminance.
 */
export function isLightColor(hex: string): boolean {
  if (!hex) return false

  const color = hex.replace("#", "")
  const r = parseInt(color.substring(0, 2), 16)
  const g = parseInt(color.substring(2, 4), 16)
  const b = parseInt(color.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  return luminance > 0.5
}
