import { type ImageStyle, type TextStyle, type ViewStyle } from "react-native"

import { type ColorName, type ColorShade, colors } from "../tokens/palette"

import { type ColorKey, type Theme, type ThemeColorKey } from "./types"

/**
 * Extends a base theme with custom overrides
 *
 * Allows deep customization of theme properties while maintaining type safety.
 *
 * @param base - Base theme to extend
 * @param overrides - Partial theme overrides to apply
 * @returns Extended theme with overrides applied
 *
 * @example
 * ```ts
 * const customTheme = extendTheme(lightTheme, {
 *   colors: {
 *     primary: 'rgb(255, 0, 0)'
 *   }
 * })
 * ```
 */
export function extendTheme(
  base: Theme,
  overrides: Partial<{
    colors: Partial<Record<ThemeColorKey, string>>
    [key: string]: unknown
  }>
): Theme {
  const extended = { ...base }

  if (overrides.colors) {
    extended.colors = {
      ...base.colors,
      ...overrides.colors
    }
  }

  for (const key in overrides) {
    if (key !== "colors" && key in base) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(extended as any)[key] = overrides[key]
    }
  }

  return extended
}

/**
 * Resolves a color key to its actual color value
 *
 * Supports both theme color keys (e.g., "primary") and palette color keys (e.g., "red-500").
 *
 * @param theme - Theme object with colors and palette
 * @param colorKey - Color key to resolve
 * @returns Resolved color string or undefined if not found
 *
 * @example
 * ```ts
 * resolveColor(theme, "primary") // "rgb(239, 68, 68)"
 * resolveColor(theme, "red-500") // "rgb(251, 44, 54)"
 * ```
 */
export function resolveColor(
  theme: { colors: Record<string, string>; palette: typeof colors },
  colorKey: ColorKey | undefined
): string | undefined {
  "worklet"

  if (!colorKey) {
    return undefined
  }

  if (colorKey in theme.colors) {
    return theme.colors[colorKey]
  }

  const paletteMatch = colorKey.match(/^([a-z]+)-(\d+)$/)

  if (paletteMatch) {
    const [, colorName, shade] = paletteMatch
    const colorNameTyped = colorName as ColorName

    if (colorNameTyped in theme.palette) {
      const palette = theme.palette[colorNameTyped]
      const shadeNum = shade as unknown as ColorShade

      if (shadeNum in palette) {
        return palette[shadeNum]
      }
    }
  }

  return undefined
}

/**
 * Creates color variants for style properties
 *
 * Generates a record of color variants that can be used in style definitions.
 * Each variant maps a color key to a style object with the specified property(ies) set to that color.
 *
 * @param theme - Theme object with colors and palette
 * @param property - CSS property name(s) to apply the color to
 * @returns Record mapping color keys to style objects
 *
 * @example
 * ```ts
 * const colorVariants = createColorVariants(theme, "color")
 * // { primary: { color: "rgb(239, 68, 68)" }, secondary: { color: "rgb(240, 240, 240)" }, ... }
 *
 * const multiPropertyVariants = createColorVariants(theme, ["color", "backgroundColor"])
 * // { primary: { color: "rgb(239, 68, 68)", backgroundColor: "rgb(239, 68, 68)" }, ... }
 * ```
 */
export function createColorVariants<T extends string | string[]>(
  theme: { colors: Record<string, string>; palette: typeof colors },
  property: T
): Record<
  ColorKey,
  T extends string[]
    ? { [K in T[number]]: string }
    : T extends string
      ? { [K in T]: string }
      : never
> {
  const properties = Array.isArray(property) ? property : [property]

  const variants = {} as Record<
    ColorKey,
    T extends string[]
      ? { [K in T[number]]: string }
      : T extends string
        ? { [K in T]: string }
        : never
  >

  for (const [colorKey, colorValue] of Object.entries(theme.colors)) {
    const style = {} as Record<string, string>

    for (const prop of properties) {
      style[prop as string] = colorValue
    }

    variants[colorKey as ColorKey] = style as T extends string[]
      ? { [K in T[number]]: string }
      : T extends string
        ? { [K in T]: string }
        : never
  }

  for (const [colorName, shades] of Object.entries(theme.palette)) {
    for (const [shade, colorValue] of Object.entries(shades)) {
      const key = `${colorName}-${shade}` as ColorKey
      const style = {} as Record<string, string>

      for (const prop of properties) {
        style[prop as string] = colorValue
      }

      variants[key] = style as T extends string[]
        ? { [K in T[number]]: string }
        : T extends string
          ? { [K in T]: string }
          : never
    }
  }

  return variants
}

/**
 * Type helper for ViewStyle objects in style functions
 *
 * Provides IntelliSense for ViewStyle properties when defining style functions.
 * Use this when returning dynamic styles from functions inside createStyleSheet.
 *
 * @param style - ViewStyle object
 * @returns The same style object with proper typing
 *
 * @example
 * ```ts
 * const styles = createStyleSheet(({ theme }) => ({
 *   container: (isActive: boolean) => viewStyle({
 *     flexDirection: "row",
 *     padding: theme.space("md"),
 *     backgroundColor: isActive ? theme.colors.primary : theme.colors.background
 *   })
 * }))
 * ```
 */
export function viewStyle<T extends ViewStyle>(style: T): T {
  return style
}

/**
 * Type helper for TextStyle objects in style functions
 *
 * Provides IntelliSense for TextStyle properties when defining style functions.
 * Use this when returning dynamic text styles from functions inside createStyleSheet.
 *
 * @param style - TextStyle object
 * @returns The same style object with proper typing
 *
 * @example
 * ```ts
 * const styles = createStyleSheet(({ theme }) => ({
 *   text: (size: 'sm' | 'lg') => textStyle({
 *     fontSize: size === 'sm' ? 14 : 18,
 *     color: theme.colors.foreground
 *   })
 * }))
 * ```
 */
export function textStyle<T extends TextStyle>(style: T): T {
  return style
}

/**
 * Type helper for ImageStyle objects in style functions
 *
 * Provides IntelliSense for ImageStyle properties when defining style functions.
 * Use this when returning dynamic image styles from functions inside createStyleSheet.
 *
 * @param style - ImageStyle object
 * @returns The same style object with proper typing
 *
 * @example
 * ```ts
 * const styles = createStyleSheet(({ theme }) => ({
 *   image: (rounded: boolean) => imageStyle({
 *     borderRadius: rounded ? theme.radius("full") : 0,
 *     resizeMode: "cover"
 *   })
 * }))
 * ```
 */
export function imageStyle<T extends ImageStyle>(style: T): T {
  return style
}
