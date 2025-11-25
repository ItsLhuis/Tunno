import { useEffect, useMemo } from "react"

import { useSharedValue } from "react-native-reanimated"

import { useTheme } from "./context"

import { processStyleSheet } from "./processing"

import {
  type ProcessedStyleSheet,
  type RuntimeValues,
  type StyleSheetDefinition,
  type StyleSheetFactory,
  type Theme
} from "./types"

import { type Breakpoint } from "../tokens/breakpoints"

/**
 * Hook to create and memoize processed styles from a factory
 *
 * Processes the style sheet factory and returns styles ready to use.
 * Automatically re-processes when theme or runtime values change.
 *
 * @param factory - Style sheet factory function
 * @returns Processed style sheet with all functions ready to call
 *
 * @example
 * ```tsx
 * const styles = useStyles(({ theme }) => ({
 *   container: {
 *     padding: theme.space.md,
 *     backgroundColor: theme.colors.background
 *   },
 *   button: createVariant({
 *     variants: {
 *       size: { sm: { padding: theme.space.sm }, md: { padding: theme.space.md } }
 *     }
 *   })
 * }))
 *
 * <View style={styles.container} />
 * <View style={styles.button({ size: 'md' })} />
 * ```
 */
export function useStyles<T extends StyleSheetDefinition>(
  factory: StyleSheetFactory<T>
): ProcessedStyleSheet<T> {
  const { theme, runtime } = useTheme()

  const processedStyles = useMemo(() => {
    const definition = factory({ theme, runtime })
    return processStyleSheet(definition)
  }, [theme, runtime, factory])

  return processedStyles
}

/**
 * Hook to create a single memoized value from theme and runtime
 *
 * Useful for creating individual styles or computed values that depend
 * on theme/runtime. Recomputes when theme or runtime changes.
 *
 * @param factory - Function that creates value from theme and runtime
 * @returns Memoized value
 *
 * @example
 * ```tsx
 * const containerStyle = useStyle((theme) => ({
 *   padding: theme.space.lg,
 *   backgroundColor: theme.colors.card
 * }))
 * ```
 */
export function useStyle<T>(factory: (theme: Theme, runtime: RuntimeValues) => T): T {
  const { theme, runtime } = useTheme()

  return useMemo(() => {
    return factory(theme, runtime)
  }, [theme, runtime, factory])
}

/**
 * Hook to get the current breakpoint
 *
 * @returns Current active breakpoint
 *
 * @example
 * ```ts
 * const breakpoint = useBreakpoint()
 * // 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
 * ```
 */
export function useBreakpoint(): Breakpoint {
  const { runtime } = useTheme()
  return runtime.breakpoint
}

/**
 * Hook to get breakpoint boolean map
 *
 * @returns Map of breakpoint names to boolean values
 *
 * @example
 * ```ts
 * const breakpoints = useBreakpoints()
 * if (breakpoints.md) {
 *   // Screen is at least md size
 * }
 * ```
 */
export function useBreakpoints(): Record<Breakpoint, boolean> {
  const { runtime } = useTheme()
  return runtime.breakpoints
}

/**
 * Hook to get current device orientation
 *
 * @returns Current orientation
 *
 * @example
 * ```ts
 * const orientation = useOrientation()
 * // 'portrait' | 'landscape'
 * ```
 */
export function useOrientation(): "portrait" | "landscape" {
  const { runtime } = useTheme()
  return runtime.orientation
}

/**
 * Hook to get system color scheme
 *
 * @returns Current color scheme
 *
 * @example
 * ```ts
 * const colorScheme = useColorScheme()
 * // 'light' | 'dark' | null
 * ```
 */
export function useColorScheme(): "light" | "dark" | null {
  const { runtime } = useTheme()
  return runtime.colorScheme
}

/**
 * Hook to get animated theme as SharedValue for use in Reanimated worklets
 *
 * Returns a SharedValue that contains the current theme. Updates automatically
 * when theme changes. Can be used in useAnimatedStyle and other Reanimated worklets.
 *
 * @returns SharedValue containing the current theme
 *
 * @example
 * ```tsx
 * const animatedTheme = useAnimatedTheme()
 *
 * const animatedStyle = useAnimatedStyle(() => ({
 *   backgroundColor: animatedTheme.value.colors.primary,
 *   padding: animatedTheme.value.space('md')
 * }))
 * ```
 */
export function useAnimatedTheme() {
  const { theme } = useTheme()

  const animatedTheme = useSharedValue(theme)

  useEffect(() => {
    animatedTheme.value = theme
  }, [theme, animatedTheme])

  return animatedTheme
}
