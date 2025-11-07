import { useEffect, useRef, useState } from "react"

import { extractPaletteFromImage } from "../utils/colors"

import { type Palette } from "@repo/utils"

type UseImagePaletteOptions = {
  imageSrc: string | null
  enabled?: boolean
}

export const useImagePalette = ({ imageSrc, enabled = true }: UseImagePaletteOptions) => {
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
