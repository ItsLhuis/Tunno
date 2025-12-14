import { useEffect, useState } from "react"

import { getRenderableFileSrc } from "@services/storage"

type UseImageSrcOptions = {
  thumbnail: string | null | undefined
  enabled?: boolean
}

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
