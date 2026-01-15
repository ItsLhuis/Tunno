import { useEffect, useState } from "react"

import { getRenderableFileSrc } from "@services/storage"

import { type AppPaths } from "@lib/appStorage"

/**
 * Options for the {@link useThumbnailSrc} hook.
 */
type UseThumbnailSrcOptions = {
  fileName: string | null | undefined
  sourceDir?: keyof Omit<AppPaths, "songs">
}

/**
 * Custom hook that resolves a thumbnail file name to a renderable source URL.
 * This is useful for displaying images from internal storage or external sources.
 *
 * It uses `getRenderableFileSrc` internally and handles asynchronous loading
 * and prevents state updates on unmounted components.
 *
 * @param options - Configuration options for the hook.
 * @param options.fileName - The name of the thumbnail file. If `null` or `undefined`, the source will be `null`.
 * @param options.sourceDir - The source directory for the thumbnail. Defaults to "thumbnails".
 * @returns The resolved source URL string for the thumbnail, or `null` if `fileName` is not provided or loading fails.
 *
 * @example
 * ```tsx
 * const albumArtworkSrc = useThumbnailSrc({ fileName: album.thumbnail });
 *
 * return (
 *   <img
 *     src={albumArtworkSrc || '/path/to/placeholder.png'}
 *     alt="Album Art"
 *   />
 * );
 * ```
 */
export function useThumbnailSrc({ fileName, sourceDir = "thumbnails" }: UseThumbnailSrcOptions) {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!fileName) {
      setSrc(null)
      return
    }

    let cancelled = false

    const load = async () => {
      const url = await getRenderableFileSrc(fileName, sourceDir)

      if (!cancelled) {
        setSrc(url)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [fileName, sourceDir])

  return src
}
