import { parseToRgb, rgb } from "polished"

type RGBTuple = [number, number, number]

type LCH = { l: number; c: number; h: number }

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

function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rLinear, gLinear, bLinear] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

export function getContrastRatio(colorA: string, colorB: string): number {
  const rgbA = parseToRgb(colorA)
  const rgbB = parseToRgb(colorB)

  const l1 = getRelativeLuminance(rgbA.red, rgbA.green, rgbA.blue)
  const l2 = getRelativeLuminance(rgbB.red, rgbB.green, rgbB.blue)

  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1]

  return (lighter + 0.05) / (darker + 0.05)
}

function rgbToLch(r: number, g: number, b: number): LCH {
  const [rLinear, gLinear, bLinear] = [r, g, b].map((val) => {
    const v = val / 255
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })

  const x = rLinear * 0.4124564 + gLinear * 0.3575761 + bLinear * 0.1804375
  const y = rLinear * 0.2126729 + gLinear * 0.7151522 + bLinear * 0.072175
  const z = rLinear * 0.0193339 + gLinear * 0.119192 + bLinear * 0.9503041

  const xn = x / 0.95047
  const yn = y / 1.0
  const zn = z / 1.08883

  const fx = xn > 0.008856 ? Math.pow(xn, 1 / 3) : 7.787 * xn + 16 / 116
  const fy = yn > 0.008856 ? Math.pow(yn, 1 / 3) : 7.787 * yn + 16 / 116
  const fz = zn > 0.008856 ? Math.pow(zn, 1 / 3) : 7.787 * zn + 16 / 116

  const l = 116 * fy - 16
  const a = 500 * (fx - fy)
  const b_ = 200 * (fy - fz)

  const c = Math.sqrt(a * a + b_ * b_)
  const h = (Math.atan2(b_, a) * 180) / Math.PI

  return {
    l: Math.max(0, Math.min(100, l)),
    c: Math.max(0, c),
    h: h < 0 ? h + 360 : h
  }
}

function lchToRgb(l: number, c: number, h: number): RGBTuple {
  const hRad = (h * Math.PI) / 180
  const a = c * Math.cos(hRad)
  const b = c * Math.sin(hRad)

  const fy = (l + 16) / 116
  const fx = a / 500 + fy
  const fz = fy - b / 200

  const xn = fx * fx * fx > 0.008856 ? fx * fx * fx : (fx - 16 / 116) / 7.787
  const yn = l > 7.9996 ? Math.pow(fy, 3) : l / 903.3
  const zn = fz * fz * fz > 0.008856 ? fz * fz * fz : (fz - 16 / 116) / 7.787

  const x = xn * 0.95047
  const y = yn * 1.0
  const z = zn * 1.08883

  let r = x * 3.2404542 - y * 1.5371385 - z * 0.4985314
  let g = -x * 0.969266 + y * 1.8760108 + z * 0.041556
  let b_ = x * 0.0556434 - y * 0.2040259 + z * 1.0572252

  r = r <= 0.0031308 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055
  g = g <= 0.0031308 ? 12.92 * g : 1.055 * Math.pow(g, 1 / 2.4) - 0.055
  b_ = b_ <= 0.0031308 ? 12.92 * b_ : 1.055 * Math.pow(b_, 1 / 2.4) - 0.055

  return [
    Math.max(0, Math.min(255, Math.round(r * 255))),
    Math.max(0, Math.min(255, Math.round(g * 255))),
    Math.max(0, Math.min(255, Math.round(b_ * 255)))
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
  targetRgb: RGBTuple,
  minContrast: number,
  preferDarker: boolean = false
): RGBTuple {
  let result = [...targetRgb] as RGBTuple

  if (getContrastRatioFromRgb(baseRgb, result) >= minContrast) {
    return result
  }

  const baseLum = getRelativeLuminance(...baseRgb)
  const isBackgroundLight = baseLum > 0.5
  const lch = rgbToLch(...targetRgb)

  const shouldDarken = preferDarker || isBackgroundLight

  for (let i = 0; i < 50; i++) {
    const adjustment = (i + 1) * 2
    const newL = shouldDarken ? Math.max(0, lch.l - adjustment) : Math.min(100, lch.l + adjustment)

    result = lchToRgb(newL, lch.c, lch.h)

    if (getContrastRatioFromRgb(baseRgb, result) >= minContrast) {
      return result
    }
  }

  return baseLum > 0.5 ? [0, 0, 0] : [255, 255, 255]
}

export function ensureReadableOnBackground(
  foreground: string,
  background: string,
  minRatio: number
): string {
  const bgRgb = parseToRgb(background)
  const fgRgb = parseToRgb(foreground)
  const bgTuple: RGBTuple = [bgRgb.red, bgRgb.green, bgRgb.blue]
  const fgTuple: RGBTuple = [fgRgb.red, fgRgb.green, fgRgb.blue]

  const result = generateContrastColor(bgTuple, fgTuple, minRatio)
  return rgb(...result)
}

function analyzeColor(lch: LCH): {
  saturationLevel: "desaturated" | "moderate" | "vibrant"
  needsBoost: boolean
} {
  let saturationLevel: "desaturated" | "moderate" | "vibrant"
  if (lch.c < 15) saturationLevel = "desaturated"
  else if (lch.c < 45) saturationLevel = "moderate"
  else saturationLevel = "vibrant"

  const needsBoost = lch.c < 30

  return { saturationLevel, needsBoost }
}

function clampIntoGamut(l: number, c: number, h: number, maxIterations: number = 20): RGBTuple {
  let currentC = c
  let step = c * 0.1

  for (let i = 0; i < maxIterations; i++) {
    const rgb = lchToRgb(l, currentC, h)
    const isInGamut = rgb.every((val) => val >= 0 && val <= 255)

    if (isInGamut) {
      const lchCheck = rgbToLch(...rgb)
      if (Math.abs(lchCheck.l - l) < 5 && Math.abs(lchCheck.h - h) < 10) {
        return rgb
      }
    }

    currentC -= step
    if (currentC < 0) {
      currentC = 0
      break
    }
  }

  return lchToRgb(l, currentC, h)
}

export function generateColorPalette(rgbColor: RGBTuple): Palette {
  const backgroundColor = rgb(rgbColor[0], rgbColor[1], rgbColor[2])
  const bgLum = getRelativeLuminance(...rgbColor)

  const isLight = bgLum > 0.5

  const bgLch = rgbToLch(...rgbColor)
  const { saturationLevel, needsBoost } = analyzeColor(bgLch)

  const targetForegroundL = isLight ? 12 : 98
  const foregroundC = Math.min(bgLch.c * 0.1, 5)

  let foregroundRgb = clampIntoGamut(targetForegroundL, foregroundC, bgLch.h)
  foregroundRgb = generateContrastColor(rgbColor, foregroundRgb, 8, isLight)

  const foreground = rgb(...foregroundRgb)

  const primaryHueShift = isLight ? (needsBoost ? -8 : -5) : needsBoost ? 8 : 5
  const primaryHue = (bgLch.h + primaryHueShift + 360) % 360

  let primaryChroma: number

  if (saturationLevel === "desaturated") {
    primaryChroma = 50
  } else if (saturationLevel === "moderate") {
    primaryChroma = Math.max(bgLch.c * 1.4, 55)
  } else {
    primaryChroma = Math.max(bgLch.c * 1.1, 60)
  }
  primaryChroma = Math.min(primaryChroma, 90)

  const primaryL = isLight
    ? Math.max(20, Math.min(40, bgLch.l - 40))
    : Math.max(65, Math.min(85, bgLch.l + 40))

  let primaryRgb = clampIntoGamut(primaryL, primaryChroma, primaryHue)

  const primaryContrast = getContrastRatioFromRgb(rgbColor, primaryRgb)
  if (primaryContrast < 3.5) {
    primaryRgb = generateContrastColor(rgbColor, primaryRgb, 3.5, isLight)
  }
  const primary = rgb(...primaryRgb)

  const primaryLch = rgbToLch(...primaryRgb)
  const primaryFgTarget: RGBTuple = primaryLch.l > 55 ? [0, 0, 0] : [255, 255, 255]
  const primaryForegroundRgb = generateContrastColor(
    primaryRgb,
    primaryFgTarget,
    4.5,
    primaryLch.l > 55
  )
  const primaryForeground = rgb(...primaryForegroundRgb)

  const mutedL = isLight ? Math.max(bgLch.l - 6, 90) : Math.min(bgLch.l + 6, 18)
  const mutedC = Math.max(bgLch.c * 0.25, 2)

  let mutedRgb = clampIntoGamut(mutedL, mutedC, bgLch.h)

  const mutedContrast = getContrastRatioFromRgb(rgbColor, mutedRgb)
  if (mutedContrast < 1.15) {
    const adjustedL = isLight ? bgLch.l - 12 : bgLch.l + 12
    mutedRgb = clampIntoGamut(adjustedL, mutedC, bgLch.h)
  }
  const muted = rgb(...mutedRgb)

  const mutedForegroundL = isLight
    ? Math.max(35, Math.min(55, bgLch.l - 35))
    : Math.min(65, Math.max(50, bgLch.l + 35))
  const mutedFgC = Math.max(bgLch.c * 0.4, 10)

  let mutedForegroundRgb = clampIntoGamut(mutedForegroundL, mutedFgC, bgLch.h)
  mutedForegroundRgb = generateContrastColor(mutedRgb, mutedForegroundRgb, 4.5, isLight)

  if (getContrastRatioFromRgb(rgbColor, mutedForegroundRgb) < 2.8) {
    mutedForegroundRgb = generateContrastColor(rgbColor, mutedForegroundRgb, 2.8, isLight)
  }
  const mutedForeground = rgb(...mutedForegroundRgb)

  const accentHueShift = isLight ? -18 : 18
  const accentHue = (bgLch.h + accentHueShift + 360) % 360

  const accentChroma = needsBoost ? Math.max(bgLch.c * 1.3, 25) : Math.max(bgLch.c * 0.85, 20)

  const accentL = isLight ? Math.max(bgLch.l - 10, 78) : Math.min(bgLch.l + 10, 28)

  let accentRgb = clampIntoGamut(accentL, accentChroma, accentHue)

  const accentContrast = getContrastRatioFromRgb(rgbColor, accentRgb)
  if (accentContrast < 1.3) {
    const targetL = isLight ? accentL - 6 : accentL + 6
    accentRgb = clampIntoGamut(targetL, accentChroma, accentHue)
  }

  if (getContrastRatioFromRgb(mutedRgb, accentRgb) < 1.2) {
    const targetL = isLight ? accentL - 4 : accentL + 4
    accentRgb = clampIntoGamut(targetL, accentChroma, accentHue)
  }

  const accent = rgb(...accentRgb)

  const accentLch = rgbToLch(...accentRgb)
  const accentFgTarget: RGBTuple = accentLch.l > 55 ? [0, 0, 0] : [255, 255, 255]
  const accentForegroundRgb = generateContrastColor(
    accentRgb,
    accentFgTarget,
    4.5,
    accentLch.l > 55
  )
  const accentForeground = rgb(...accentForegroundRgb)

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
