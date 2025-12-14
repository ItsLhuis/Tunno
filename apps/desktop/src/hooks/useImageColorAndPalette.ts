import { useEffect, useRef, useState } from "react"

import { extractColorFromImage, extractPaletteFromImage } from "../utils/colors"

import { type Palette } from "@repo/utils"

type UseImageColorAndPaletteOptions = {
  imageSrc: string | null
  enabled?: boolean
}

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
