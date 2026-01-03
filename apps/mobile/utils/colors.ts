import { getColors, ImageColorsResult } from "react-native-image-colors"

import { generateColorPalette, type Palette } from "@repo/utils"

export type { ImageColorsResult }

type RGBTuple = [number, number, number]

function hexToRgb(hex: string): RGBTuple | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) return null

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

function getDominantColorFromResult(result: ImageColorsResult): string | null {
  switch (result.platform) {
    case "android":
      return result.dominant ?? result.vibrant ?? result.muted ?? null
    case "ios":
      return result.primary ?? result.secondary ?? result.background ?? null
    case "web":
      return result.dominant ?? result.vibrant ?? result.muted ?? null
    default:
      return null
  }
}

export async function extractColorFromImage(imageUri: string): Promise<string | null> {
  try {
    const result = await getColors(imageUri, {
      fallback: "#000000",
      cache: true,
      key: imageUri
    })

    return getDominantColorFromResult(result)
  } catch {
    return null
  }
}

export async function extractPaletteFromImage(imageUri: string): Promise<Palette | null> {
  try {
    const result = await getColors(imageUri, {
      fallback: "#000000",
      cache: true,
      key: imageUri
    })

    const dominantColor = getDominantColorFromResult(result)
    if (!dominantColor) return null

    const rgb = hexToRgb(dominantColor)
    if (!rgb) return null

    return generateColorPalette(rgb, "rgb")
  } catch {
    return null
  }
}

export async function extractAllColorsFromImage(
  imageUri: string
): Promise<ImageColorsResult | null> {
  try {
    return await getColors(imageUri, {
      fallback: "#000000",
      cache: true,
      key: imageUri
    })
  } catch {
    return null
  }
}
