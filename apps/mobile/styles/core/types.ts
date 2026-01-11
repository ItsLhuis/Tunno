import { type DimensionValue, type ImageStyle, type TextStyle, type ViewStyle } from "react-native"

import { type DurationAlias, type EasingAlias } from "../tokens/animations"
import { type BorderRadiusAlias, type BorderWidthAlias } from "../tokens/borders"
import { type Breakpoint } from "../tokens/breakpoints"
import { type OpacityAlias } from "../tokens/opacity"
import { colors, type PaletteColorKey } from "../tokens/palette"
import { type ShadowAlias, type ShadowValue } from "../tokens/shadows"
import { type SizeAlias, type SpacingAlias } from "../tokens/spacing"
import {
  fontWeightTokens,
  type FontSizeAlias,
  type FontWeightAlias,
  type LetterSpacingAlias,
  type LineHeightAlias
} from "../tokens/typography"

type FontWeightValue = (typeof fontWeightTokens)[FontWeightAlias]

/**
 * React Native style type combining View, Text, and Image styles
 */
export type Style = ViewStyle | TextStyle | ImageStyle

/**
 * Style type compatible with React Native StyleSheet
 */
export type CompatibleStyle = any

/**
 * Named styles object where each key maps to a Style
 */
export type NamedStyles<T> = {
  [P in keyof T]: Style
}

/**
 * Semantic color keys available in the theme
 */
export type ThemeColorKey =
  | "background"
  | "foreground"
  | "card"
  | "cardForeground"
  | "popover"
  | "popoverForeground"
  | "primary"
  | "primaryForeground"
  | "secondary"
  | "secondaryForeground"
  | "muted"
  | "mutedForeground"
  | "accent"
  | "accentForeground"
  | "destructive"
  | "destructiveForeground"
  | "border"
  | "input"
  | "ring"
  | "chart1"
  | "chart2"
  | "chart3"
  | "chart4"
  | "chart5"
  | "tabbar"
  | "tabbarForeground"
  | "tabbarPrimary"
  | "tabbarPrimaryForeground"
  | "tabbarAccent"
  | "tabbarAccentForeground"
  | "tabbarBorder"
  | "tabbarRing"
  | "info"
  | "infoForeground"
  | "infoBorder"
  | "success"
  | "successForeground"
  | "successBorder"
  | "warning"
  | "warningForeground"
  | "warningBorder"
  | "error"
  | "errorForeground"
  | "errorBorder"

/**
 * Union of theme color keys and palette color keys (e.g., "red-500")
 */
export type ColorKey = ThemeColorKey | PaletteColorKey

/**
 * Safe area insets for device notches and system UI
 */
export type SafeAreaInsets = {
  top: number
  bottom: number
  left: number
  right: number
}

/**
 * Screen dimensions in pixels
 */
export type Dimensions = {
  width: number
  height: number
}

/**
 * Platform information from React Native
 */
export type PlatformInfo = {
  OS: "ios" | "android" | "windows" | "macos" | "web"
  Version: number | string
}

/**
 * Runtime values available in style factories
 *
 * Includes device dimensions, safe area insets, breakpoints,
 * accessibility settings, platform information, and current theme mode
 */
export type RuntimeValues = {
  insets: SafeAreaInsets
  dimensions: Dimensions
  platform: PlatformInfo
  breakpoint: Breakpoint
  breakpoints: Record<Breakpoint, boolean>
  orientation: "portrait" | "landscape"
  colorScheme: "light" | "dark" | null
  fontScale: number
  reduceMotion: boolean
  isRTL: boolean
}

/**
 * Flexible theme colors object (for custom themes)
 */
export type ThemeColors = {
  [key: string]: string
}

/**
 * Complete theme object with colors, tokens, and utility functions
 *
 * Provides access to design tokens (spacing, typography, colors, etc.)
 * and utility functions for style generation
 */
export type Theme = {
  colors: Record<ThemeColorKey, string>
  palette: typeof colors
  space: (value?: SpacingAlias | number | "px" | "0") => number
  size: (value?: SizeAlias | number) => DimensionValue
  fontSize: (value?: FontSizeAlias) => number
  lineHeight: (value?: LineHeightAlias) => number
  fontWeight: (value?: FontWeightAlias) => FontWeightValue
  letterSpacing: (value?: LetterSpacingAlias) => number
  radius: (value?: BorderRadiusAlias) => number
  borderWidth: (value?: BorderWidthAlias) => number
  opacity: (value?: OpacityAlias) => number
  shadow: (value?: ShadowAlias) => ShadowValue
  duration: (value?: DurationAlias) => number
  easing: (value?: EasingAlias) => string
  withOpacity: (color: string, opacity: OpacityAlias | number) => string
  platform: {
    select: <T>(options: { ios?: T; android?: T; web?: T; default: T }) => T
  }
  lighten: (color: string, amount: number) => string
  darken: (color: string, amount: number) => string
  alpha: (color: string, opacity: OpacityAlias | number) => string
  mix: (color1: string, color2: string, weight?: number) => string
}

/**
 * Context passed to style sheet factories
 *
 * Contains the current theme and runtime values for responsive styling
 */
export type StyleSheetContext = {
  theme: Theme
  runtime: RuntimeValues
}

/**
 * Symbol used to mark variant functions
 */
export const VARIANT_MARKER = Symbol("variant")

/**
 * Base variant configuration with optional base styles
 */
export type BaseVariantConfig = {
  base?: Style
}

/**
 * Variants configuration mapping variant keys to option objects
 */
export type VariantsConfig = {
  [variantKey: string]: {
    [optionKey: string]: Style
  }
}

/**
 * Default variant values applied when props are not provided
 */
export type DefaultVariants<V extends VariantsConfig> = {
  [K in keyof V]?: keyof V[K] | boolean
}

/**
 * Compound variant that applies styles when multiple conditions match
 */
export type CompoundVariant<V extends VariantsConfig = VariantsConfig> = Partial<{
  [K in keyof V]: keyof V[K] | boolean
}> & {
  style: Style
}

/**
 * Complete variant configuration
 *
 * Supports base styles, multiple variant dimensions, default values,
 * and compound variants for complex styling logic
 */
export type VariantConfig<V extends VariantsConfig = VariantsConfig> = {
  base?: Style
  variants?: V
  defaultVariants?: DefaultVariants<V>
  compoundVariants?: CompoundVariant<V>[]
}

/**
 * Props type for variant functions
 *
 * Derived from variants config and default variants
 */
export type VariantProps<
  V extends VariantsConfig,
  D extends DefaultVariants<V> = Record<string, never>
> = {
  [K in keyof V]: K extends keyof D ? keyof V[K] | boolean | undefined : keyof V[K] | boolean
}

/**
 * Variant function that accepts props and returns a style
 */
export type VariantFunction<V extends VariantsConfig, D extends DefaultVariants<V>> = (
  props?: Partial<VariantProps<V, D>>
) => CompatibleStyle

/**
 * Marked variant function with internal metadata
 */
export type MarkedVariantFunction<
  V extends VariantsConfig,
  D extends DefaultVariants<V>
> = VariantFunction<V, D> & {
  [VARIANT_MARKER]: true
  config: VariantConfig<V>
}

/**
 * Style function that accepts arguments and returns a style
 * Uses Record<string, any> to allow more flexible return types
 * that will be validated at runtime by React Native
 */
export type StyleFunction = (...args: any[]) => Record<string, any>

/**
 * Single style definition - can be a static style, variant function, or style factory
 */
export type StyleDefinition = Style | StyleFunction | MarkedVariantFunction<any, any>

/**
 * Style sheet definition object mapping keys to style definitions
 */
export type StyleSheetDefinition = Record<string, StyleDefinition>

/**
 * Factory function that creates a style sheet from context
 *
 * @param context - Theme and runtime values
 * @returns Style sheet definition
 */
export type StyleSheetFactory<T extends StyleSheetDefinition = StyleSheetDefinition> = (
  context: StyleSheetContext
) => T

/**
 * Processed style type - converts variant functions and factories to callable functions
 * Uses CompatibleStyle for maximum flexibility across View, Text, and Image components
 * Preserves MarkedVariantFunction metadata for type extraction
 */
export type ProcessedStyle<T> =
  T extends MarkedVariantFunction<infer V, infer D>
    ? MarkedVariantFunction<V, D>
    : T extends (...args: infer Args) => any
      ? (...args: Args) => CompatibleStyle
      : CompatibleStyle

/**
 * Processed style sheet with all functions ready to use
 */
export type ProcessedStyleSheet<T extends StyleSheetDefinition> = {
  [K in keyof T]: ProcessedStyle<T[K]>
}

/**
 * Theme mode preference
 */
export type ThemeMode = "light" | "dark" | "system"

/**
 * Extracts variant props from a marked variant function
 *
 * Automatically infers available variant options from a createVariant result,
 * eliminating the need to manually define variant prop types.
 *
 * @template T - The marked variant function type
 *
 * @example
 * ```ts
 * const buttonStyles = createVariant({
 *   variants: {
 *     size: { sm: {...}, md: {...}, lg: {...} },
 *     variant: { primary: {...}, secondary: {...}, destructive: {...} }
 *   }
 * })
 *
 * type ButtonProps = ExtractVariantProps<typeof buttonStyles>
 * // Result: { size?: 'sm' | 'md' | 'lg', variant?: 'primary' | 'secondary' | 'destructive' }
 * ```
 */
export type ExtractVariantProps<T> =
  T extends MarkedVariantFunction<infer V, any>
    ? {
        [K in keyof V]?: keyof V[K] | boolean
      }
    : never

/**
 * Extracts values from a specific variant dimension
 *
 * Useful when you need a type for a single variant key rather than all props.
 *
 * @template T - The marked variant function type
 * @template Key - The variant key to extract values from
 *
 * @example
 * ```ts
 * const buttonStyles = createVariant({
 *   variants: {
 *     size: { sm: {...}, md: {...}, lg: {...} },
 *     variant: { primary: {...}, secondary: {...} }
 *   }
 * })
 *
 * type ButtonSize = ExtractVariantValues<typeof buttonStyles, 'size'>
 * // Result: 'sm' | 'md' | 'lg'
 *
 * type ButtonVariant = ExtractVariantValues<typeof buttonStyles, 'variant'>
 * // Result: 'primary' | 'secondary'
 * ```
 */
export type ExtractVariantValues<T, Key extends string> =
  T extends MarkedVariantFunction<infer V, any>
    ? Key extends keyof V
      ? keyof V[Key]
      : never
    : never

/**
 * Safe return type helper - extracts return type from function or returns type as-is
 */
type SafeReturnType<T> = T extends (...args: any[]) => infer R ? R : T

/**
 * Helper to extract keys from a variant option object while preserving literal types
 * Uses distributive conditional types and string literal preservation
 */
type ExtractVariantKeys<T> =
  T extends Record<infer K, any> ? (K extends "true" | "false" ? boolean : K) : never

/**
 * Extracts all variant dimensions from a style definition
 * Preserves literal types for autocomplete and type safety
 *
 * Uses the 'config' property instead of MarkedVariantFunction pattern matching
 * to handle intersection types correctly
 */
type ExtractStyleVariants<T> = T extends { config: VariantConfig<infer V> }
  ? {
      [K in keyof V]?: ExtractVariantKeys<V[K]> | undefined
    }
  : T extends MarkedVariantFunction<infer V, any>
    ? {
        [K in keyof V]?: ExtractVariantKeys<V[K]> | undefined
      }
    : never

/**
 * Extracts variants from a specific style in a stylesheet
 *
 * Similar to Unistyles' UnistylesVariants but more ergonomic.
 * Automatically infers all variant props from a style definition.
 *
 * @template T - StyleSheetFactory or style object
 * @template K - Key of the style to extract variants from
 *
 * @example
 * ```ts
 * const buttonStyles = createStyleSheet(({ theme }) => ({
 *   button: createVariant({
 *     variants: {
 *       variant: { default: {...}, primary: {...} },
 *       size: { sm: {...}, md: {...}, lg: {...} }
 *     }
 *   })
 * }))
 *
 * type ButtonProps = StyleVariants<typeof buttonStyles, "button">
 * // Result: { variant?: 'default' | 'primary', size?: 'sm' | 'md' | 'lg' }
 * ```
 */
export type StyleVariants<T, K extends keyof SafeReturnType<T>> = ExtractStyleVariants<
  SafeReturnType<T>[K]
>

/**
 * Extracts variants from all styles in a stylesheet (union type)
 *
 * @template T - StyleSheetFactory or style object
 *
 * @example
 * ```ts
 * const styles = createStyleSheet(({ theme }) => ({
 *   button: createVariant({ variants: { size: { sm: {...}, md: {...} } } }),
 *   text: createVariant({ variants: { weight: { normal: {...}, bold: {...} } } })
 * }))
 *
 * type AllVariants = StyleVariantsAll<typeof styles>
 * // Result: { size?: 'sm' | 'md' } | { weight?: 'normal' | 'bold' }
 * ```
 */
export type StyleVariantsAll<T> = {
  [K in keyof SafeReturnType<T>]: ExtractStyleVariants<SafeReturnType<T>[K]>
}[keyof SafeReturnType<T>]
