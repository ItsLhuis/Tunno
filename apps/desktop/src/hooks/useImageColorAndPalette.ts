import { useEffect, useRef, useState } from "react"

import { extractColorFromImage, extractPaletteFromImage } from "../utils/colors"

import { type Palette } from "@repo/utils"

/**
 * Options for the {@link useImageColorAndPalette} hook.
 */
type UseImageColorAndPaletteOptions = {
  imageSrc: string | null
  enabled?: boolean
}

/**
 * Custom hook that extracts the dominant color and a full color palette from an HTML image element.
 *
 * This hook is designed to work with `<img>` elements, taking an `imageSrc` and returning
 * the `dominantColor` and a generated `palette` along with a `ref` that should be attached
 * to the `<img>` element. It waits for the image to load before attempting to extract colors.
 * This can be used for dynamic theming or UI adaptation based on album art or other images.
 *
 * @param options - Configuration options for the hook.
 * @param options.imageSrc - The source URL of the image to analyze.
 * @param options.enabled - If `false`, color extraction will be skipped.
 * @returns An object containing:
 *          - `dominantColor`: The most dominant color from the image (e.g., hex string) or `null`.
 *          - `palette`: A generated `Palette` object (containing various shades) or `null`.
 *          - `imageRef`: A `ref` that must be attached to the `<img>` element for color extraction to work.
 *
 * @example
 * ```tsx
 * function MyComponent({ albumArtUrl }) {
 *   const { dominantColor, palette, imageRef } = useImageColorAndPalette({ imageSrc: albumArtUrl });
 *
 *   return (
 *     <div style={{ backgroundColor: dominantColor || 'gray' }}>
 *       <img ref={imageRef} src={albumArtUrl} alt="Album Art" style={{ display: 'none' }} />
 *       <p style={{ color: palette?.foreground }}>Album Title</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useImageColorAndPalette({
  imageSrc,
  enabled = true
}: UseImageColorAndPaletteOptions) {
  const [dominantColor, setDominantColor] = useState<string | null>(null)
  const [palette, setPalette] = useState<Palette | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageSrc || !imageRef.current || !enabled) {
      setDominantColor(null)
      setPalette(null)
      return
    }

    const image = imageRef.current

    const handleImageLoad = () => {
      const color = extractColorFromImage(image)
      const extractedPalette = extractPaletteFromImage(image)

      setDominantColor(color)
      setPalette(extractedPalette)
    }

    if (image.complete && image.naturalWidth > 0) {
      handleImageLoad()
    } else {
      image.addEventListener("load", handleImageLoad)
      return () => {
        image.removeEventListener("load", handleImageLoad)
      }
    }
  }, [imageSrc, enabled])

  return { dominantColor, palette, imageRef }
}
