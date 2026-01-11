import { useEffect, useState } from "react"

import { getRenderableFileSrc } from "@services/storage"

import { type AppPaths } from "@lib/appStorage"

/**
 * Options for the {@link useThumbnailUri} hook.
 */
type UseThumbnailUriOptions = {
  fileName: string | null | undefined
  sourceDir?: keyof Omit<AppPaths, "songs">
}

/**
 * Custom hook that resolves a thumbnail file name to a renderable URI.
 * This is useful for displaying images from internal storage or external sources.
 *
 * It uses `getRenderableFileSrc` internally and handles asynchronous loading
 * and prevents state updates on unmounted components.
 *
 * @param options - Configuration options for the hook.
 * @param options.fileName - The name of the thumbnail file. If `null` or `undefined`, the URI will be `null`.
 * @param options.sourceDir - The source directory for the thumbnail. Defaults to "thumbnails".
 * @returns The resolved URI string for the thumbnail, or `null` if `fileName` is not provided or loading fails.
 *
 * @example
 * ```tsx
 * const albumArtworkUri = useThumbnailUri({ fileName: album.thumbnail });
 *
 * return (
 *   <Image
 *     source={{ uri: albumArtworkUri || placeholderImage }}
 *     style={styles.thumbnail}
 *   />
 * );
 * ```
 */
export function useThumbnailUri({ fileName, sourceDir = "thumbnails" }: UseThumbnailUriOptions) {
  const [uri, setUri] = useState<string | null>(null)

  useEffect(() => {
    if (!fileName) {
      setUri(null)
      return
    }

    let cancelled = false // Flag to prevent state updates on unmounted component

    const load = async () => {
      const url = await getRenderableFileSrc(fileName, sourceDir)

      if (!cancelled) {
        setUri(url)
      }
    }

    load()

    return () => {
      cancelled = true // Set cancelled flag when component unmounts or dependencies change
    }
  }, [fileName, sourceDir])

  return uri
}
