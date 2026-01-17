"use no memo"

import { Locales, type LocaleKeys } from "@repo/i18n"

import { type ColorProp } from "react-native-android-widget"

/**
 * All possible translation keys for the widget.
 */
export type WidgetTranslationKey = "noSongPlaying" | "unknownArtist" | "openToStart"

/**
 * Fallback strings for when translations are unavailable.
 */
const FALLBACK_STRINGS: Record<WidgetTranslationKey, string> = {
  noSongPlaying: "No song playing",
  unknownArtist: "Unknown Artist",
  openToStart: "Open Tunno to start"
}

/**
 * Get a translated string for the widget.
 */
export function getTranslation(key: WidgetTranslationKey, language: string): string {
  try {
    const locale = Locales[language as LocaleKeys]
    if (!locale) return FALLBACK_STRINGS[key]

    const translations = locale.translations.common
    return translations[key] ?? FALLBACK_STRINGS[key]
  } catch {
    return FALLBACK_STRINGS[key]
  }
}

/**
 * Converts an RGB string to RGBA ColorProp format.
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
 * Widget size type based on dimensions.
 */
export type WidgetSize = "tiny" | "small" | "medium" | "large"

/**
 * Determines the widget size based on its dimensions.
 */
export function getWidgetSize(width: number, height: number): WidgetSize {
  const isOneRow = height < 120

  const hasTwoColumns = width < 200
  const hasFourOrMoreColumns = width >= 300

  if (isOneRow) {
    if (hasTwoColumns) return "tiny"
    return "small"
  }

  if (hasFourOrMoreColumns) return "large"

  return "medium"
}
