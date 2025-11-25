import { useEffect, useMemo, useState } from "react"

import {
  AccessibilityInfo,
  Dimensions,
  I18nManager,
  PixelRatio,
  Platform,
  useColorScheme
} from "react-native"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { breakpoints, type Breakpoint } from "../tokens/breakpoints"

import { type RuntimeValues } from "./types"

/**
 * Hook that provides runtime device and environment values
 *
 * Tracks and updates:
 * - Screen dimensions and orientation
 * - Safe area insets
 * - Current breakpoint and breakpoint map
 * - System color scheme
 * - Current theme mode (light/dark/system)
 * - Accessibility settings (font scale, reduce motion)
 * - RTL layout direction
 *
 * Values update automatically when device state changes.
 *
 * @returns Runtime values object
 */
export function useRuntimeValues(): RuntimeValues {
  const colorScheme = useColorScheme()

  const insets = useSafeAreaInsets()

  const [dimensions, setDimensions] = useState(() => {
    const { width, height } = Dimensions.get("window")
    return { width, height }
  })

  const [accessibility, setAccessibility] = useState({
    fontScale: PixelRatio.getFontScale(),
    reduceMotion: false
  })

  useEffect(() => {
    const dimensionSubscription = Dimensions.addEventListener("change", ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height
      })
    })

    const reduceMotionListener = AccessibilityInfo.addEventListener(
      "reduceMotionChanged",
      (enabled) => {
        setAccessibility((prev) => ({
          ...prev,
          reduceMotion: enabled
        }))
      }
    )

    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      setAccessibility((prev) => ({
        ...prev,
        reduceMotion: enabled
      }))
    })

    return () => {
      dimensionSubscription?.remove()
      reduceMotionListener?.remove()
    }
  }, [])

  const currentBreakpoint = useMemo((): Breakpoint => {
    const w = dimensions.width
    if (w >= breakpoints["2xl"]) return "2xl"
    if (w >= breakpoints.xl) return "xl"
    if (w >= breakpoints.lg) return "lg"
    if (w >= breakpoints.md) return "md"
    if (w >= breakpoints.sm) return "sm"
    return "xs"
  }, [dimensions.width])

  const breakpointsMap = useMemo(
    () => ({
      xs: dimensions.width >= breakpoints.xs,
      sm: dimensions.width >= breakpoints.sm,
      md: dimensions.width >= breakpoints.md,
      lg: dimensions.width >= breakpoints.lg,
      xl: dimensions.width >= breakpoints.xl,
      "2xl": dimensions.width >= breakpoints["2xl"]
    }),
    [dimensions.width]
  )

  const orientation = useMemo(
    () => (dimensions.width > dimensions.height ? "landscape" : "portrait"),
    [dimensions.width, dimensions.height]
  )

  return {
    insets,
    dimensions,
    platform: {
      OS: Platform.OS,
      Version: Platform.Version
    },
    breakpoint: currentBreakpoint,
    breakpoints: breakpointsMap,
    orientation,
    colorScheme: colorScheme ?? null,
    fontScale: accessibility.fontScale,
    reduceMotion: accessibility.reduceMotion,
    isRTL: I18nManager.isRTL
  }
}
