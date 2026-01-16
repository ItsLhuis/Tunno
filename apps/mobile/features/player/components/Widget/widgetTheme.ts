"use no memo"

import { converter } from "culori"

import { generateColorPalette } from "@repo/utils"

import { darkTheme } from "@styles/themes/dark"
import { lightTheme } from "@styles/themes/light"

import { rgbToRgba } from "./widgetUtils"

import { type ColorProp } from "react-native-android-widget"

const toRgb = converter("rgb")

export type WidgetTheme = "light" | "dark"

export type WidgetPalette = {
  background: ColorProp
  foreground: ColorProp
  muted: ColorProp
  mutedForeground: ColorProp
  primary: ColorProp
  primaryForeground: ColorProp
  accent: ColorProp
  accentForeground: ColorProp
}

/**
 * Returns the widget color palette based on the theme.
 * Uses colors from the app's theme system for consistency.
 */
export function getWidgetPalette(theme: WidgetTheme): WidgetPalette {
  const appTheme = theme === "dark" ? darkTheme : lightTheme

  return {
    background: rgbToRgba(appTheme.colors.background),
    foreground: rgbToRgba(appTheme.colors.foreground),
    muted: rgbToRgba(appTheme.colors.muted),
    mutedForeground: rgbToRgba(appTheme.colors.mutedForeground),
    primary: rgbToRgba(appTheme.colors.primary),
    primaryForeground: rgbToRgba(appTheme.colors.primaryForeground),
    accent: rgbToRgba(appTheme.colors.accent),
    accentForeground: rgbToRgba(appTheme.colors.accentForeground)
  }
}

/**
 * Generates a widget palette based on theme and optional dominant color.
 * If dominantColor is provided, generates a full palette from it, otherwise uses theme colors.
 */
export function generateWidgetPalette(
  theme: WidgetTheme,
  dominantColor: string | null
): WidgetPalette {
  if (!dominantColor) {
    return getWidgetPalette(theme)
  }

  const rgb = toRgb(dominantColor)
  if (!rgb) {
    return getWidgetPalette(theme)
  }

  const palette = generateColorPalette(
    [
      Math.round((rgb.r ?? 0) * 255),
      Math.round((rgb.g ?? 0) * 255),
      Math.round((rgb.b ?? 0) * 255)
    ],
    "rgb"
  )

  return {
    background: rgbToRgba(palette.background),
    foreground: rgbToRgba(palette.foreground),
    muted: rgbToRgba(palette.muted),
    mutedForeground: rgbToRgba(palette.mutedForeground),
    primary: rgbToRgba(palette.primary),
    primaryForeground: rgbToRgba(palette.primaryForeground),
    accent: rgbToRgba(palette.accent),
    accentForeground: rgbToRgba(palette.accentForeground)
  }
}
