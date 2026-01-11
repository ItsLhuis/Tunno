import { getColors, ImageColorsResult } from "react-native-image-colors"

import { generateColorPalette, type Palette } from "@repo/utils"

/**
 * Re-export of `ImageColorsResult` type from `react-native-image-colors`.
 * This type describes the structure of the color data extracted from an image.
 */
export type { ImageColorsResult }

/**
 * A tuple representing an RGB color with three numerical components: red, green, and blue.
 * Each component is typically between 0 and 255.
 */
type RGBTuple = [number, number, number]

/**
 * Converts a hexadecimal color string to an RGB tuple.
 *
 * @param hex - The hexadecimal color string (e.g., "#RRGGBB" or "RRGGBB").
 * @returns An RGB tuple `[R, G, B]` if the conversion is successful, otherwise `null`.
 */
/**
 * Converts a hexadecimal color string to an RGB tuple.
 *
 * This function parses a hex color string (with or without a leading '#')
 * and returns its corresponding RGB components as an array.
 *
 * @param hex - The hexadecimal color string (e.g., "#RRGGBB" or "RRGGBB").
 * @returns An RGB tuple `[R, G, B]` if the conversion is successful, otherwise `null`.
 */
function hexToRgb(hex: string): RGBTuple | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) return null

  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
}

/**
 * Extracts a dominant or prominent color from an `ImageColorsResult` object.
 * Prioritizes dominant, vibrant, or primary colors depending on the platform.
 *
 * @param result - The `ImageColorsResult` object obtained from `react-native-image-colors`.
 * @returns A color string (e.g., hex or RGB) representing the dominant color, or `null` if none can be extracted.
 */
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

/**
 * Extracts a single dominant color from an image URI.
 *
 * @param imageUri - The URI of the image (e.g., local path or remote URL).
 * @returns A promise that resolves to a dominant color string (e.g., hex) or `null` if extraction fails.
 */
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

/**
 * Extracts a dominant color from an image and generates a full color palette (shades) from it.
 * This is useful for theming or dynamic styling based on album art, etc.
 *
 * @param imageUri - The URI of the image (e.g., local path or remote URL).
 * @returns A promise that resolves to a `Palette` object (containing various shades) or `null` if extraction or palette generation fails.
 */
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

    // generateColorPalette expects an RGB tuple and a format string.
    return generateColorPalette(rgb, "rgb")
  } catch {
    return null
  }
}

/**
 * Extracts all available color information from an image URI, returning the raw result from `react-native-image-colors`.
 * This can include dominant, vibrant, muted, light/dark variations depending on the platform's image color extraction capabilities.
 *
 * @param imageUri - The URI of the image (e.g., local path or remote URL).
 * @returns A promise that resolves to an `ImageColorsResult` object or `null` if extraction fails.
 */
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
