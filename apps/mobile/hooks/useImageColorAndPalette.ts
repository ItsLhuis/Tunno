import { useEffect, useState } from "react"

import { extractColorFromImage, extractPaletteFromImage } from "@utils/colors"

import { type Palette } from "@repo/utils"

/**
 * Options for the {@link useImageColorAndPalette} hook.
 */
type UseImageColorAndPaletteOptions = {
  imageUri: string | null | undefined
  enabled?: boolean
}

/**
 * Custom hook that extracts the dominant color and a full color palette from a given image URI.
 * This can be used for dynamic theming or UI adaptation based on album art or other images.
 *
 * The extraction process is asynchronous and can be enabled/disabled. It also handles caching
 * internally via the underlying utility functions.
 *
 * @param options - Configuration options for the hook.
 * @param options.imageUri - The URI of the image to analyze. If `null` or `undefined`, no colors will be extracted.
 * @param options.enabled - If `false`, color extraction will be skipped. Defaults to `true`.
 * @returns An object containing:
 *          - `dominantColor`: The most dominant color from the image (e.g., hex string) or `null`.
 *          - `palette`: A generated `Palette` object (containing various shades) or `null`.
 *          - `isLoading`: A boolean indicating whether the color extraction is currently in progress.
 *
 * @example
 * ```tsx
 * const { dominantColor, palette, isLoading } = useImageColorAndPalette({
 *   imageUri: albumArtworkUri,
 *   enabled: showDynamicColors
 * });
 *
 * if (isLoading) {
 *   return <ActivityIndicator />;
 * }
 *
 * return (
 *   <View style={{ backgroundColor: dominantColor || 'gray' }}>
 *     <Text style={{ color: palette?.foreground }}>Album Title</Text>
 *   </View>
 * );
 * ```
 */
export function useImageColorAndPalette({
  imageUri,
  enabled = true
}: UseImageColorAndPaletteOptions) {
  const [isLoading, setIsLoading] = useState(false)

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  useEffect(() => {
    if (!imageUri || !enabled) {
      setDominantColor(null)
      setPalette(null)
      return
    }

    let cancelled = false // Flag to prevent state updates on unmounted component

    const extractColors = async () => {
      setIsLoading(true)

      try {
        const [color, extractedPalette] = await Promise.all([
          extractColorFromImage(imageUri),
          extractPaletteFromImage(imageUri)
        ])

        if (!cancelled) {
          setDominantColor(color)
          setPalette(extractedPalette)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    extractColors()

    return () => {
      cancelled = true // Set cancelled flag when component unmounts or dependencies change
    }
  }, [imageUri, enabled])

  return { dominantColor, palette, isLoading }
}
