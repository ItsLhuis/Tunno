import { converter, formatHex } from "culori"

import { generateColorPalette, type Palette } from "@repo/utils"

/**
 * Maximum dimension for image analysis. Images are scaled down to this size
 * for performance while maintaining color accuracy.
 */
const MAX_ANALYSIS_SIZE = 100

/**
 * Color bin size for quantization. Lower values = more precision but slower.
 * 16 gives good granularity for accurate color extraction.
 */
const COLOR_BIN_SIZE = 16

/**
 * Minimum saturation threshold. Colors below this are considered "gray" and deprioritized.
 */
const MIN_SATURATION = 0.15

/**
 * Percentage of edges to ignore. Focuses analysis on the center of the image.
 */
const EDGE_CROP_PERCENT = 0.1

/**
 * Pixel sampling step. Higher values = faster but less accurate.
 * 2 means we sample every other pixel in both dimensions.
 */
const PIXEL_SAMPLE_STEP = 2

/**
 * Represents an RGB color tuple.
 */
type RGB = [number, number, number]

const toRgb = converter("rgb")

/**
 * Loads an image and returns it as an HTMLImageElement.
 */
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/**
 * Calculates the scaled dimensions maintaining aspect ratio.
 */
function getScaledDimensions(
  width: number,
  height: number,
  maxSize: number
): { width: number; height: number } {
  if (width <= maxSize && height <= maxSize) {
    return { width, height }
  }

  const ratio = Math.min(maxSize / width, maxSize / height)

  return {
    width: Math.round(width * ratio),
    height: Math.round(height * ratio)
  }
}

/**
 * Extracts pixel data from an image using Canvas API.
 */
function getImagePixels(img: HTMLImageElement): {
  data: Uint8ClampedArray
  width: number
  height: number
} {
  const { width, height } = getScaledDimensions(img.width, img.height, MAX_ANALYSIS_SIZE)

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d", { willReadFrequently: true })
  if (!ctx) throw new Error("Could not get canvas context")

  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = "high"
  ctx.drawImage(img, 0, 0, width, height)

  return {
    data: ctx.getImageData(0, 0, width, height).data,
    width,
    height
  }
}

/**
 * Checks if a pixel is in the edge crop area.
 */
function isInCropArea(x: number, y: number, width: number, height: number): boolean {
  const cropX = width * EDGE_CROP_PERCENT
  const cropY = height * EDGE_CROP_PERCENT

  return x < cropX || x > width - cropX || y < cropY || y > height - cropY
}

/**
 * Quantizes an RGB color to a bin for grouping similar colors.
 */
function quantizeColor(r: number, g: number, b: number): string {
  const qr = Math.floor(r / COLOR_BIN_SIZE) * COLOR_BIN_SIZE
  const qg = Math.floor(g / COLOR_BIN_SIZE) * COLOR_BIN_SIZE
  const qb = Math.floor(b / COLOR_BIN_SIZE) * COLOR_BIN_SIZE

  return `${qr},${qg},${qb}`
}

/**
 * Fast inline RGB to HSL conversion.
 * Returns [h (0-360), s (0-1), l (0-1)]
 */
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  const rNorm = r / 255
  const gNorm = g / 255
  const bNorm = b / 255

  const max = Math.max(rNorm, gNorm, bNorm)
  const min = Math.min(rNorm, gNorm, bNorm)
  const l = (max + min) / 2

  if (max === min) {
    return [0, 0, l]
  }

  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

  let h = 0
  if (max === rNorm) {
    h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) * 60
  } else if (max === gNorm) {
    h = ((bNorm - rNorm) / d + 2) * 60
  } else {
    h = ((rNorm - gNorm) / d + 4) * 60
  }

  return [h, s, l]
}

/**
 * Calculates a score for a color based on population, saturation, and lightness.
 * Approximates the Android Palette algorithm for better color extraction.
 */
function calculateColorScore(
  count: number,
  r: number,
  g: number,
  b: number,
  totalPixels: number
): number {
  const [h, s, l] = rgbToHsl(r, g, b)

  // Population weight (relative to total valid pixels)
  const populationWeight = count / totalPixels

  // Saturation score (prefer saturated colors, penalize grays)
  let saturationScore = 1
  if (s < MIN_SATURATION) {
    saturationScore = 0.2
  } else if (s < 0.3) {
    saturationScore = 0.6
  } else {
    saturationScore = 1 + (s - 0.3) * 1.5
  }

  // Lightness score (avoid extremes)
  let lightnessScore = 1
  if (l < 0.15 || l > 0.85) {
    lightnessScore = 0.3
  } else if (l < 0.25 || l > 0.75) {
    lightnessScore = 0.7
  }

  // Penalize skin tones (common in album covers with people)
  let skinTonePenalty = 1
  if (h >= 15 && h <= 50 && s >= 0.2 && s <= 0.6 && l >= 0.3 && l <= 0.7) {
    skinTonePenalty = 0.5
  }

  return populationWeight * saturationScore * lightnessScore * skinTonePenalty * 100
}

/**
 * Extracts the dominant color from pixel data using color quantization.
 * Uses pixel sampling for better performance.
 */
function extractDominantFromPixels(
  pixels: Uint8ClampedArray,
  width: number,
  height: number
): RGB | null {
  const colorBins = new Map<string, { count: number; r: number; g: number; b: number }>()

  let totalValidPixels = 0

  // Sample pixels with step for better performance
  for (let y = 0; y < height; y += PIXEL_SAMPLE_STEP) {
    for (let x = 0; x < width; x += PIXEL_SAMPLE_STEP) {
      const i = (y * width + x) * 4
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]

      // Skip transparent pixels
      if (a < 200) continue

      // Skip edge pixels (focus on center of image)
      if (isInCropArea(x, y, width, height)) continue

      // Skip very dark or very light pixels
      const brightness = (r + g + b) / 3
      if (brightness < 20 || brightness > 235) continue

      totalValidPixels++

      const key = quantizeColor(r, g, b)
      const existing = colorBins.get(key)

      if (existing) {
        existing.count++
        existing.r += r
        existing.g += g
        existing.b += b
      } else {
        colorBins.set(key, { count: 1, r, g, b })
      }
    }
  }

  if (colorBins.size === 0 || totalValidPixels === 0) return null

  // Find the color with the highest score
  let bestColor: RGB | null = null
  let bestScore = -1

  for (const bin of colorBins.values()) {
    const avgR = Math.round(bin.r / bin.count)
    const avgG = Math.round(bin.g / bin.count)
    const avgB = Math.round(bin.b / bin.count)

    const score = calculateColorScore(bin.count, avgR, avgG, avgB, totalValidPixels)

    if (score > bestScore) {
      bestScore = score
      bestColor = [avgR, avgG, avgB]
    }
  }

  return bestColor
}

/**
 * Extracts the dominant color from an image source.
 */
async function extractDominantColor(src: string): Promise<string | null> {
  const img = await loadImage(src)
  const { data, width, height } = getImagePixels(img)
  const dominant = extractDominantFromPixels(data, width, height)

  if (!dominant) return null

  const [r, g, b] = dominant

  return formatHex({ mode: "rgb", r: r / 255, g: g / 255, b: b / 255 })
}

/**
 * Converts a `Palette` object into a record of CSS variable declarations.
 */
export function paletteToCssVariables(palette: Palette | null): Record<string, string> {
  if (!palette) return {}

  const entries = Object.entries({
    "--background": palette.background,
    "--foreground": palette.foreground,
    "--muted": palette.muted,
    "--muted-foreground": palette.mutedForeground,
    "--primary": palette.primary,
    "--primary-foreground": palette.primaryForeground,
    "--accent": palette.accent,
    "--accent-foreground": palette.accentForeground
  }).filter((entry): entry is [string, string] => entry[1] !== null && entry[1] !== undefined)

  return Object.fromEntries(entries)
}

/**
 * Converts any CSS color string to RGB tuple using culori.
 */
function colorToRgb(color: string): RGB | null {
  const rgb = toRgb(color)
  if (!rgb) return null

  return [
    Math.round((rgb.r ?? 0) * 255),
    Math.round((rgb.g ?? 0) * 255),
    Math.round((rgb.b ?? 0) * 255)
  ]
}

/**
 * Extracts a single dominant color from an image source.
 *
 * @param imageSrc - The source URL of the image.
 * @returns A promise resolving to a hex color string or `null` if extraction fails.
 */
export async function extractColorFromImage(imageSrc: string): Promise<string | null> {
  try {
    return await extractDominantColor(imageSrc)
  } catch {
    return null
  }
}

/**
 * Extracts a dominant color from an image source and generates a full color palette from it.
 *
 * @param imageSrc - The source URL of the image.
 * @returns A promise resolving to a `Palette` object or `null` if extraction fails.
 */
export async function extractPaletteFromImage(imageSrc: string): Promise<Palette | null> {
  try {
    const dominantColor = await extractDominantColor(imageSrc)
    if (!dominantColor) return null

    const rgb = colorToRgb(dominantColor)
    if (!rgb) return null

    return generateColorPalette(rgb)
  } catch {
    return null
  }
}
