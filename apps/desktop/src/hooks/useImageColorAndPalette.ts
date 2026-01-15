import { useEffect, useState } from "react"

import { extractColorFromImage, extractPaletteFromImage } from "../utils/colors"

import { type Palette } from "@repo/utils"

/**
 * Options for the {@link useImageColorAndPalette} hook.
 */
type UseImageColorAndPaletteOptions = {
  imageSrc: string | null | undefined
  enabled?: boolean
}

/**
 * Custom hook that extracts the dominant color and a full color palette from a given image source.
 * This can be used for dynamic theming or UI adaptation based on album art or other images.
 *
 * The extraction process is asynchronous and can be enabled/disabled.
 *
 * @param options - Configuration options for the hook.
 * @param options.imageSrc - The source URL of the image to analyze. If `null` or `undefined`, no colors will be extracted.
 * @param options.enabled - If `false`, color extraction will be skipped. Defaults to `true`.
 * @returns An object containing:
 *          - `dominantColor`: The most dominant color from the image (hex string) or `null`.
 *          - `palette`: A generated `Palette` object (containing various shades) or `null`.
 *          - `isLoading`: A boolean indicating whether the color extraction is currently in progress.
 *
 * @example
 * ```tsx
 * const { dominantColor, palette, isLoading } = useImageColorAndPalette({
 *   imageSrc: albumArtworkSrc,
 *   enabled: showDynamicColors
 * });
 *
 * if (isLoading) {
 *   return <Spinner />;
 * }
 *
 * return (
 *   <div style={{ backgroundColor: dominantColor || 'gray' }}>
 *     <p style={{ color: palette?.foreground }}>Album Title</p>
 *   </div>
 * );
 * ```
 */
export function useImageColorAndPalette({
  imageSrc,
  enabled = true
}: UseImageColorAndPaletteOptions) {
  const [isLoading, setIsLoading] = useState(false)

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  useEffect(() => {
    if (!imageSrc || !enabled) {
      setDominantColor(null)
      setPalette(null)
      return
    }

    let cancelled = false

    const extractColors = async () => {
      setIsLoading(true)

      try {
        const [color, extractedPalette] = await Promise.all([
          extractColorFromImage(imageSrc),
          extractPaletteFromImage(imageSrc)
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
      cancelled = true
    }
  }, [imageSrc, enabled])

  return { dominantColor, palette, isLoading }
}
