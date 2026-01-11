import { useEffect, useState } from "react"

import { getRenderableFileSrc } from "@services/storage"

/**
 * Options for the {@link useImageSrc} hook.
 */
type UseImageSrcOptions = {
  thumbnail: string | null | undefined
  enabled?: boolean
}

/**
 * Custom hook that resolves a thumbnail filename (stored locally or in app data) to a renderable image source URL.
 *
 * This hook is useful for dynamically displaying images, such as album art or artist photos,
 * by transforming their internal filename into a URL that an `<img>` tag can use.
 * It handles asynchronous loading and returns the resolved URL.
 *
 * @param options - Configuration options for the hook.
 * @param options.thumbnail - The filename of the thumbnail.
 * @param options.enabled - If `false`, image source resolution will be skipped.
 * @returns The resolved image source URL string, or `null` if the thumbnail is not provided or resolution fails.
 *
 * @example
 * ```tsx
 * function AlbumArt({ albumThumbnail }) {
 *   const imageUrl = useImageSrc({ thumbnail: albumThumbnail });
 *
 *   return (
 *     <img
 *       src={imageUrl || '/path/to/placeholder.png'}
 *       alt="Album Art"
 *       style={{ width: 100, height: 100 }}
 *     />
 *   );
 * }
 * ```
 */
export function useImageSrc({ thumbnail, enabled = true }: UseImageSrcOptions) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    const loadImage = async () => {
      if (!thumbnail || !enabled) {
        setImageSrc(null)
        return
      }

      try {
        const src = await getRenderableFileSrc(thumbnail, "thumbnails")
        setImageSrc(src)
      } catch {
        setImageSrc(null)
      }
    }

    loadImage()
  }, [thumbnail, enabled])

  return imageSrc
}
