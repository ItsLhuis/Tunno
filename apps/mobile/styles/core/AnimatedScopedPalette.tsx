import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react"

import { ThemeContext, useTheme } from "./context"

import { useSharedValue, withTiming, type SharedValue } from "react-native-reanimated"

import { durationTokens } from "../tokens/animations"

import { type Theme, type ThemeColorKey } from "./types"

import { type Palette } from "@repo/utils"

const DEFAULT_ANIMATION_DURATION = durationTokens[300]

type AnimatedPaletteColors = {
  background: SharedValue<string>
  foreground: SharedValue<string>
  muted: SharedValue<string>
  mutedForeground: SharedValue<string>
  primary: SharedValue<string>
  primaryForeground: SharedValue<string>
  accent: SharedValue<string>
  accentForeground: SharedValue<string>
}

type AnimatedScopedPaletteContextValue = {
  palette: Partial<Palette> | null
  animatedColors: AnimatedPaletteColors
  duration: number
}

const AnimatedScopedPaletteContext = createContext<AnimatedScopedPaletteContextValue | null>(null)

type AnimatedScopedPaletteProps = {
  children: ReactNode
  palette: Partial<Palette> | null | undefined
  duration?: number
}

/**
 * Provides animated scoped color palette to a subtree of components
 *
 * Like ScopedPalette, but transitions colors smoothly when palette changes.
 * Child components using useAnimatedPaletteColor() will receive animated colors.
 *
 * @param children - React children
 * @param palette - Palette object with color overrides (from generateColorPalette)
 * @param duration - Animation duration in ms (default: 300)
 *
 * @example
 * ```tsx
 * const { palette } = useImageColorAndPalette({ imageUri })
 *
 * <AnimatedScopedPalette palette={palette}>
 *   <AnimatedBackground>
 *     <AnimatedText colorKey="foreground">Animated text</AnimatedText>
 *   </AnimatedBackground>
 * </AnimatedScopedPalette>
 * ```
 */
export function AnimatedScopedPalette({
  children,
  palette,
  duration = DEFAULT_ANIMATION_DURATION
}: AnimatedScopedPaletteProps) {
  const { theme, runtime, themeMode, setThemeMode } = useTheme()

  const background = useSharedValue(palette?.background ?? theme.colors.background)
  const foreground = useSharedValue(palette?.foreground ?? theme.colors.foreground)
  const muted = useSharedValue(palette?.muted ?? theme.colors.muted)
  const mutedForeground = useSharedValue(palette?.mutedForeground ?? theme.colors.mutedForeground)
  const primary = useSharedValue(palette?.primary ?? theme.colors.primary)
  const primaryForeground = useSharedValue(
    palette?.primaryForeground ?? theme.colors.primaryForeground
  )
  const accent = useSharedValue(palette?.accent ?? theme.colors.accent)
  const accentForeground = useSharedValue(
    palette?.accentForeground ?? theme.colors.accentForeground
  )

  useEffect(() => {
    background.value = withTiming(palette?.background ?? theme.colors.background, { duration })
    foreground.value = withTiming(palette?.foreground ?? theme.colors.foreground, { duration })
    muted.value = withTiming(palette?.muted ?? theme.colors.muted, { duration })
    mutedForeground.value = withTiming(palette?.mutedForeground ?? theme.colors.mutedForeground, {
      duration
    })
    primary.value = withTiming(palette?.primary ?? theme.colors.primary, { duration })
    primaryForeground.value = withTiming(
      palette?.primaryForeground ?? theme.colors.primaryForeground,
      { duration }
    )
    accent.value = withTiming(palette?.accent ?? theme.colors.accent, { duration })
    accentForeground.value = withTiming(
      palette?.accentForeground ?? theme.colors.accentForeground,
      { duration }
    )
  }, [
    palette,
    theme.colors,
    duration,
    background,
    foreground,
    muted,
    mutedForeground,
    primary,
    primaryForeground,
    accent,
    accentForeground
  ])

  const animatedColors = useMemo<AnimatedPaletteColors>(
    () => ({
      background,
      foreground,
      muted,
      mutedForeground,
      primary,
      primaryForeground,
      accent,
      accentForeground
    }),
    [
      background,
      foreground,
      muted,
      mutedForeground,
      primary,
      primaryForeground,
      accent,
      accentForeground
    ]
  )

  const scopedTheme = useMemo<Theme>(() => {
    if (!palette) return theme

    const paletteColorOverrides: Partial<Record<ThemeColorKey, string>> = {}

    if (palette.background) paletteColorOverrides.background = palette.background
    if (palette.foreground) paletteColorOverrides.foreground = palette.foreground
    if (palette.muted) paletteColorOverrides.muted = palette.muted
    if (palette.mutedForeground) paletteColorOverrides.mutedForeground = palette.mutedForeground
    if (palette.primary) paletteColorOverrides.primary = palette.primary
    if (palette.primaryForeground)
      paletteColorOverrides.primaryForeground = palette.primaryForeground
    if (palette.accent) paletteColorOverrides.accent = palette.accent
    if (palette.accentForeground) paletteColorOverrides.accentForeground = palette.accentForeground

    return {
      ...theme,
      colors: {
        ...theme.colors,
        ...paletteColorOverrides
      }
    }
  }, [theme, palette])

  const themeContextValue = useMemo(
    () => ({
      theme: scopedTheme,
      runtime,
      themeMode,
      setThemeMode
    }),
    [scopedTheme, runtime, themeMode, setThemeMode]
  )

  const animatedContextValue = useMemo<AnimatedScopedPaletteContextValue>(
    () => ({
      palette: palette ?? null,
      animatedColors,
      duration
    }),
    [palette, animatedColors, duration]
  )

  return (
    <AnimatedScopedPaletteContext.Provider value={animatedContextValue}>
      <ThemeContext.Provider value={themeContextValue}>{children}</ThemeContext.Provider>
    </AnimatedScopedPaletteContext.Provider>
  )
}

/**
 * Hook to access animated palette context
 *
 * @returns The animated palette context if inside AnimatedScopedPalette, null otherwise
 */
export function useAnimatedScopedPalette(): AnimatedScopedPaletteContextValue | null {
  return useContext(AnimatedScopedPaletteContext)
}

type AnimatedPaletteColorKey = keyof AnimatedPaletteColors

/**
 * Hook to get a specific animated color from the palette
 *
 * @param colorKey - The color key to get (background, foreground, primary, etc.)
 * @returns SharedValue containing the animated color string
 *
 * @example
 * ```tsx
 * const backgroundColor = useAnimatedPaletteColor('background')
 *
 * const animatedStyle = useAnimatedStyle(() => ({
 *   backgroundColor: backgroundColor.value
 * }))
 * ```
 */
export function useAnimatedPaletteColor(colorKey: AnimatedPaletteColorKey): SharedValue<string> {
  const context = useContext(AnimatedScopedPaletteContext)

  const { theme } = useTheme()

  const fallbackColor = useSharedValue(theme.colors[colorKey])

  useEffect(() => {
    fallbackColor.value = theme.colors[colorKey]
  }, [theme.colors, colorKey, fallbackColor])

  if (context) {
    return context.animatedColors[colorKey]
  }

  return fallbackColor
}

/**
 * Hook to get all animated colors from the palette
 *
 * @returns Object with all animated color SharedValues
 *
 * @example
 * ```tsx
 * const colors = useAnimatedPaletteColors()
 *
 * const animatedStyle = useAnimatedStyle(() => ({
 *   backgroundColor: colors.background.value,
 *   color: colors.foreground.value
 * }))
 * ```
 */
export function useAnimatedPaletteColors(): AnimatedPaletteColors {
  const context = useContext(AnimatedScopedPaletteContext)

  const { theme } = useTheme()

  const background = useSharedValue(theme.colors.background)
  const foreground = useSharedValue(theme.colors.foreground)
  const muted = useSharedValue(theme.colors.muted)
  const mutedForeground = useSharedValue(theme.colors.mutedForeground)
  const primary = useSharedValue(theme.colors.primary)
  const primaryForeground = useSharedValue(theme.colors.primaryForeground)
  const accent = useSharedValue(theme.colors.accent)
  const accentForeground = useSharedValue(theme.colors.accentForeground)

  useEffect(() => {
    background.value = theme.colors.background
    foreground.value = theme.colors.foreground
    muted.value = theme.colors.muted
    mutedForeground.value = theme.colors.mutedForeground
    primary.value = theme.colors.primary
    primaryForeground.value = theme.colors.primaryForeground
    accent.value = theme.colors.accent
    accentForeground.value = theme.colors.accentForeground
  }, [
    theme.colors,
    background,
    foreground,
    muted,
    mutedForeground,
    primary,
    primaryForeground,
    accent,
    accentForeground
  ])

  if (context) {
    return context.animatedColors
  }

  return useMemo(
    () => ({
      background,
      foreground,
      muted,
      mutedForeground,
      primary,
      primaryForeground,
      accent,
      accentForeground
    }),
    [
      background,
      foreground,
      muted,
      mutedForeground,
      primary,
      primaryForeground,
      accent,
      accentForeground
    ]
  )
}

export type { AnimatedPaletteColorKey, AnimatedPaletteColors }
