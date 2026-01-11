import { useEffect, useRef, useState } from "react"

import { extractColorFromImage } from "../utils/colors"

/**
 * Options for the {@link useImageColor} hook.
 */
type UseImageColorOptions = {
  imageSrc: string | null
  enabled?: boolean
}

/**
 * Custom hook that extracts the dominant color from an HTML image element.
 *
 * This hook is designed to work with `<img>` elements, taking an `imageSrc` and returning
 * the `dominantColor` along with a `ref` that should be attached to the `<img>` element.
 * It waits for the image to load before attempting to extract colors.
 *
 * @param options - Configuration options for the hook.
 * @param options.imageSrc - The source URL of the image to analyze.
 * @param options.enabled - If `false`, color extraction will be skipped.
 * @returns An object containing:
 *          - `dominantColor`: The most dominant color from the image (e.g., hex string) or `null`.
 *          - `imageRef`: A `ref` that must be attached to the `<img>` element for color extraction to work.
 *
 * @example
 * ```tsx
 * function MyComponent({ albumArtUrl }) {
 *   const { dominantColor, imageRef } = useImageColor({ imageSrc: albumArtUrl });
 *
 *   return (
 *     <div style={{ backgroundColor: dominantColor || 'transparent' }}>
 *       <img ref={imageRef} src={albumArtUrl} alt="Album Art" style={{ display: 'none' }} />
 *       <p>Album Title</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useImageColor({ imageSrc, enabled = true }: UseImageColorOptions) {
  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageSrc || !imageRef.current || !enabled) {
      setDominantColor(null)
      return
    }

    const image = imageRef.current

    const handleImageLoad = () => {
      const color = extractColorFromImage(image)
      setDominantColor(color)
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

  return { dominantColor, imageRef }
}
