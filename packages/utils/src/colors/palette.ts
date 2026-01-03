import { clampChroma, converter, formatCss, wcagContrast } from "culori"

type RGBTuple = [number, number, number]

type Oklch = { l: number; c: number; h?: number }

export type ColorFormat = "oklch" | "rgb"

export type Palette = {
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  primary: string
  primaryForeground: string
  accent: string
  accentForeground: string
}

const toOklch = converter("oklch")
const toRgb = converter("rgb")

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rLinear, gLinear, bLinear] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

export function getContrastRatio(colorA: string, colorB: string): number {
  return wcagContrast(colorA, colorB)
}

function rgbToOklch(r: number, g: number, b: number): Oklch {
  const oklch = toOklch({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 })

  if (!oklch || oklch.mode !== "oklch") {
    return { l: 0.5, c: 0 }
  }

  return {
    l: oklch.l ?? 0.5,
    c: oklch.c ?? 0,
    h: oklch.h
  }
}

function oklchToRgb(oklch: Oklch): RGBTuple {
  const rgb = toRgb({ mode: "oklch", l: oklch.l, c: oklch.c, h: oklch.h ?? 0 })

  if (!rgb || rgb.mode !== "rgb") {
    return [128, 128, 128]
  }

  return [
    Math.max(0, Math.min(255, Math.round((rgb.r ?? 0.5) * 255))),
    Math.max(0, Math.min(255, Math.round((rgb.g ?? 0.5) * 255))),
    Math.max(0, Math.min(255, Math.round((rgb.b ?? 0.5) * 255)))
  ]
}

function getContrastRatioFromRgb(rgb1: RGBTuple, rgb2: RGBTuple): number {
  const l1 = getRelativeLuminance(...rgb1)
  const l2 = getRelativeLuminance(...rgb2)

  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1]

  return (lighter + 0.05) / (darker + 0.05)
}

function generateContrastColor(
  baseRgb: RGBTuple,
  targetOklch: Oklch,
  minContrast: number,
  preferDarker: boolean = false
): Oklch {
  let result = { ...targetOklch }
  let resultRgb = oklchToRgb(result)

  if (getContrastRatioFromRgb(baseRgb, resultRgb) >= minContrast) {
    return result
  }

  const baseLum = getRelativeLuminance(...baseRgb)
  const isBackgroundLight = baseLum > 0.5
  const shouldDarken = preferDarker || isBackgroundLight

  for (let i = 0; i < 50; i++) {
    const adjustment = (i + 1) * 0.02
    const newL = shouldDarken
      ? Math.max(0, result.l - adjustment)
      : Math.min(1, result.l + adjustment)

    result = { l: newL, c: result.c, h: result.h }
    resultRgb = oklchToRgb(result)

    if (getContrastRatioFromRgb(baseRgb, resultRgb) >= minContrast) {
      return result
    }
  }

  return baseLum > 0.5 ? { l: 0.1, c: 0 } : { l: 0.95, c: 0 }
}

export function ensureReadableOnBackground(
  foreground: string,
  background: string,
  minRatio: number
): string {
  const fgOklch = toOklch(foreground)
  if (!fgOklch || fgOklch.mode !== "oklch") {
    return foreground
  }

  const bgRgb = toRgb(background)
  if (!bgRgb || bgRgb.mode !== "rgb") {
    return foreground
  }

  const bgTuple: RGBTuple = [
    Math.round((bgRgb.r ?? 0) * 255),
    Math.round((bgRgb.g ?? 0) * 255),
    Math.round((bgRgb.b ?? 0) * 255)
  ]

  const fgOklchObj: Oklch = {
    l: fgOklch.l ?? 0.5,
    c: fgOklch.c ?? 0,
    h: fgOklch.h
  }

  const result = generateContrastColor(bgTuple, fgOklchObj, minRatio)
  const resultRgb = oklchToRgb(result)
  const clamped = clampChroma({ mode: "oklch", ...result }, "oklch")

  return (
    formatCss(clamped) ??
    formatCss({ mode: "rgb", r: resultRgb[0] / 255, g: resultRgb[1] / 255, b: resultRgb[2] / 255 })
  )
}

function analyzeColor(oklch: Oklch): {
  saturationLevel: "desaturated" | "moderate" | "vibrant"
  needsBoost: boolean
} {
  let saturationLevel: "desaturated" | "moderate" | "vibrant"

  if (oklch.c < 0.05) saturationLevel = "desaturated"
  else if (oklch.c < 0.15) saturationLevel = "moderate"
  else saturationLevel = "vibrant"

  const needsBoost = oklch.c < 0.1

  return { saturationLevel, needsBoost }
}

function clampIntoGamut(oklch: Oklch): Oklch {
  const clamped = clampChroma({ mode: "oklch", ...oklch }, "oklch")

  if (!clamped || clamped.mode !== "oklch") {
    return oklch
  }

  return {
    l: clamped.l ?? oklch.l,
    c: clamped.c ?? oklch.c,
    h: clamped.h
  }
}

function formatColor(oklch: Oklch, format: ColorFormat): string {
  if (format === "rgb") {
    const rgb = oklchToRgb(oklch)
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  return (
    formatCss({ mode: "oklch", ...oklch }) ??
    `oklch(${oklch.l} ${oklch.c}${oklch.h !== undefined ? ` ${oklch.h}` : ""})`
  )
}

function formatColorFromRgb(rgb: RGBTuple, format: ColorFormat): string {
  if (format === "rgb") {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
  }

  const oklch = rgbToOklch(...rgb)

  return (
    formatCss({ mode: "oklch", ...oklch }) ??
    `oklch(${oklch.l} ${oklch.c}${oklch.h !== undefined ? ` ${oklch.h}` : ""})`
  )
}

export function generateColorPalette(rgbColor: RGBTuple, format: ColorFormat = "oklch"): Palette {
  const bgOklch = rgbToOklch(...rgbColor)
  const bgLum = getRelativeLuminance(...rgbColor)

  const isLight = bgLum > 0.5

  const { saturationLevel, needsBoost } = analyzeColor(bgOklch)

  const backgroundColor = formatColorFromRgb(rgbColor, format)

  const targetForegroundL = isLight ? 0.12 : 0.98
  const foregroundC = Math.min(bgOklch.c * 0.1, 0.02)

  let foregroundOklch = clampIntoGamut({ l: targetForegroundL, c: foregroundC, h: bgOklch.h })
  foregroundOklch = generateContrastColor(rgbColor, foregroundOklch, 8, isLight)
  const foreground = formatColor(foregroundOklch, format)

  const primaryHueShift = isLight ? (needsBoost ? -8 : -5) : needsBoost ? 8 : 5
  const primaryHue = bgOklch.h !== undefined ? (bgOklch.h + primaryHueShift + 360) % 360 : undefined

  let primaryChroma: number

  if (saturationLevel === "desaturated") {
    primaryChroma = 0.2
  } else if (saturationLevel === "moderate") {
    primaryChroma = Math.max(bgOklch.c * 1.4, 0.22)
  } else {
    primaryChroma = Math.max(bgOklch.c * 1.1, 0.24)
  }
  primaryChroma = Math.min(primaryChroma, 0.36)

  const primaryL = isLight
    ? Math.max(0.2, Math.min(0.4, bgOklch.l - 0.4))
    : Math.max(0.65, Math.min(0.85, bgOklch.l + 0.4))

  let primaryOklch = clampIntoGamut({ l: primaryL, c: primaryChroma, h: primaryHue })
  let primaryRgb = oklchToRgb(primaryOklch)

  const primaryContrast = getContrastRatioFromRgb(rgbColor, primaryRgb)
  if (primaryContrast < 3.5) {
    primaryOklch = generateContrastColor(rgbColor, primaryOklch, 3.5, isLight)
    primaryRgb = oklchToRgb(primaryOklch)
  }
  const primary = formatColor(primaryOklch, format)

  const primaryFgTarget: RGBTuple = primaryOklch.l > 0.55 ? [0, 0, 0] : [255, 255, 255]
  const primaryForegroundOklch = generateContrastColor(
    primaryRgb,
    rgbToOklch(...primaryFgTarget),
    4.5,
    primaryOklch.l > 0.55
  )
  const primaryForeground = formatColor(primaryForegroundOklch, format)

  const mutedL = isLight ? Math.max(bgOklch.l - 0.06, 0.9) : Math.min(bgOklch.l + 0.06, 0.18)
  const mutedC = Math.max(bgOklch.c * 0.25, 0.008)

  let mutedOklch = clampIntoGamut({ l: mutedL, c: mutedC, h: bgOklch.h })
  let mutedRgb = oklchToRgb(mutedOklch)

  const mutedContrast = getContrastRatioFromRgb(rgbColor, mutedRgb)
  if (mutedContrast < 1.15) {
    const adjustedL = isLight ? bgOklch.l - 0.12 : bgOklch.l + 0.12
    mutedOklch = clampIntoGamut({ l: adjustedL, c: mutedC, h: bgOklch.h })
    mutedRgb = oklchToRgb(mutedOklch)
  }
  const muted = formatColor(mutedOklch, format)

  const mutedForegroundL = isLight
    ? Math.max(0.35, Math.min(0.55, bgOklch.l - 0.35))
    : Math.min(0.65, Math.max(0.5, bgOklch.l + 0.35))
  const mutedFgC = Math.max(bgOklch.c * 0.4, 0.04)

  let mutedForegroundOklch = clampIntoGamut({ l: mutedForegroundL, c: mutedFgC, h: bgOklch.h })
  mutedForegroundOklch = generateContrastColor(mutedRgb, mutedForegroundOklch, 4.5, isLight)
  let mutedForegroundRgb = oklchToRgb(mutedForegroundOklch)

  if (getContrastRatioFromRgb(rgbColor, mutedForegroundRgb) < 2.8) {
    mutedForegroundOklch = generateContrastColor(rgbColor, mutedForegroundOklch, 2.8, isLight)
    mutedForegroundRgb = oklchToRgb(mutedForegroundOklch)
  }
  const mutedForeground = formatColor(mutedForegroundOklch, format)

  const accentHueShift = isLight ? -18 : 18
  const accentHue = bgOklch.h !== undefined ? (bgOklch.h + accentHueShift + 360) % 360 : undefined

  const accentChroma = needsBoost
    ? Math.max(bgOklch.c * 1.3, 0.1)
    : Math.max(bgOklch.c * 0.85, 0.08)

  const accentL = isLight ? Math.max(bgOklch.l - 0.1, 0.78) : Math.min(bgOklch.l + 0.1, 0.28)

  let accentOklch = clampIntoGamut({ l: accentL, c: accentChroma, h: accentHue })
  let accentRgb = oklchToRgb(accentOklch)

  const accentContrast = getContrastRatioFromRgb(rgbColor, accentRgb)
  if (accentContrast < 1.3) {
    const targetL = isLight ? accentL - 0.06 : accentL + 0.06
    accentOklch = clampIntoGamut({ l: targetL, c: accentChroma, h: accentHue })
    accentRgb = oklchToRgb(accentOklch)
  }

  if (getContrastRatioFromRgb(mutedRgb, accentRgb) < 1.2) {
    const targetL = isLight ? accentL - 0.04 : accentL + 0.04
    accentOklch = clampIntoGamut({ l: targetL, c: accentChroma, h: accentHue })
    accentRgb = oklchToRgb(accentOklch)
  }

  const accent = formatColor(accentOklch, format)

  const accentFgTarget: RGBTuple = accentOklch.l > 0.55 ? [0, 0, 0] : [255, 255, 255]
  const accentForegroundOklch = generateContrastColor(
    accentRgb,
    rgbToOklch(...accentFgTarget),
    4.5,
    accentOklch.l > 0.55
  )
  const accentForeground = formatColor(accentForegroundOklch, format)

  return {
    background: backgroundColor,
    foreground,
    muted,
    mutedForeground,
    primary,
    primaryForeground,
    accent,
    accentForeground
  }
}
