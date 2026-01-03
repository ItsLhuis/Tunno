import { useEffect, useState } from "react"

import { getRenderableFileSrc } from "@services/storage"

import { type AppPaths } from "@lib/appStorage"

type UseThumbnailUriOptions = {
  fileName: string | null | undefined
  sourceDir?: keyof Omit<AppPaths, "songs">
}

export function useThumbnailUri({ fileName, sourceDir = "thumbnails" }: UseThumbnailUriOptions) {
  const [uri, setUri] = useState<string | null>(null)

  useEffect(() => {
    if (!fileName) {
      setUri(null)
      return
    }

    let cancelled = false

    const load = async () => {
      const url = await getRenderableFileSrc(fileName, sourceDir)

      if (!cancelled) {
        setUri(url)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [fileName, sourceDir])

  return uri
}
