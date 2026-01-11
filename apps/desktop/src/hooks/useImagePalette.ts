import { useEffect, useRef, useState } from "react"

import { extractPaletteFromImage } from "../utils/colors"

import { type Palette } from "@repo/utils"

/**
 * Options for the {@link useImagePalette} hook.
 */
type UseImagePaletteOptions = {
  imageSrc: string | null
  enabled?: boolean
}

/**
 * Custom hook that extracts a color palette from an HTML image element.
 *
 * This hook is designed to work with `<img>` elements, taking an `imageSrc` and returning
 * a generated `palette` along with a `ref` that should be attached to the `<img>` element.
 * It waits for the image to load before attempting to extract the palette.
 * This can be used for dynamic theming or UI adaptation based on album art or other images.
 *
 * @param options - Configuration options for the hook.
 * @param options.imageSrc - The source URL of the image to analyze.
 * @param options.enabled - If `false`, palette extraction will be skipped.
 * @returns An object containing:
 *          - `palette`: A generated `Palette` object (containing various shades) or `null`.
 *          - `imageRef`: A `ref` that must be attached to the `<img>` element for palette extraction to work.
 *
 * @example
 * ```tsx
 * function MyComponent({ albumArtUrl }) {
 *   const { palette, imageRef } = useImagePalette({ imageSrc: albumArtUrl });
 *
 *   return (
 *     <div style={{ backgroundColor: palette?.background || 'gray' }}>
 *       <img ref={imageRef} src={albumArtUrl} alt="Album Art" style={{ display: 'none' }} />
 *       <p style={{ color: palette?.foreground }}>Album Title</p>
 *     </div>
 *   );
 * }
 * ```
 */
export function useImagePalette({ imageSrc, enabled = true }: UseImagePaletteOptions) {
  const [palette, setPalette] = useState<Palette | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!imageSrc || !imageRef.current || !enabled) {
      setPalette(null)
      return
    }

    const image = imageRef.current

    const handleImageLoad = () => {
      const extractedPalette = extractPaletteFromImage(image)
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

  return { palette, imageRef }
}
