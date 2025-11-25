import { converter, formatRgb, interpolate, parse } from "culori"

/**
 * Adds opacity to an RGB color
 *
 * @param color - RGB color string (e.g., "rgb(255, 0, 0)")
 * @param opacityValue - Opacity from 0 to 1
 * @returns RGBA color string (e.g., "rgba(255, 0, 0, 0.5)")
 */
export function withOpacity(color: string, opacityValue: number): string {
  "worklet"

  const opacity = Math.max(0, Math.min(1, opacityValue))

  if (color.startsWith("rgba(")) {
    return color.replace(/[\d.]+\)$/, `${opacity})`)
  }

  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`)
  }

  return color
}

/**
 * Lightens an RGB color by a given amount using culori
 *
 * @param color - RGB color string (e.g., "rgb(255, 0, 0)")
 * @param amount - Amount to lighten (0 to 1, where 1 is white)
 * @returns Lightened RGB string
 */
export function lighten(color: string, amount: number): string {
  "worklet"

  try {
    const parsed = parse(color)

    if (!parsed) return color

    const toLch = converter("lch")
    const lch = toLch(parsed)

    if (!lch) return color

    const lightened = {
      ...lch,
      l: Math.min(100, lch.l + amount * 100)
    }

    const result = formatRgb(lightened)

    return result || color
  } catch {
    return color
  }
}

/**
 * Darkens an RGB color by a given amount using culori
 *
 * @param color - RGB color string (e.g., "rgb(255, 0, 0)")
 * @param amount - Amount to darken (0 to 1, where 1 is black)
 * @returns Darkened RGB string
 */
export function darken(color: string, amount: number): string {
  "worklet"

  try {
    const parsed = parse(color)

    if (!parsed) return color

    const toLch = converter("lch")
    const lch = toLch(parsed)

    if (!lch) return color

    const darkened = {
      ...lch,
      l: Math.max(0, lch.l - amount * 100)
    }

    const result = formatRgb(darkened)
    return result || color
  } catch {
    return color
  }
}

/**
 * Adds opacity/alpha to an RGB color (alias for withOpacity)
 *
 * @param color - RGB color string (e.g., "rgb(255, 0, 0)")
 * @param opacity - Opacity value (0 to 1)
 * @returns RGBA string with opacity
 */
export function alpha(color: string, opacity: number): string {
  "worklet"

  return withOpacity(color, opacity)
}

/**
 * Mixes two RGB colors together using culori interpolation
 *
 * @param color1 - First RGB string
 * @param color2 - Second RGB string
 * @param weight - Weight of first color (0 to 1, default 0.5 for equal mix)
 * @returns Mixed RGB string
 */
export function mix(color1: string, color2: string, weight: number = 0.5): string {
  "worklet"

  try {
    const clampedWeight = Math.max(0, Math.min(1, weight))
    const interpolator = interpolate([color1, color2], "rgb")

    const mixed = interpolator(1 - clampedWeight)

    const result = formatRgb(mixed)

    return result || color1
  } catch {
    return color1
  }
}
