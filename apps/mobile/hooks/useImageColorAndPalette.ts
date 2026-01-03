import { useEffect, useState } from "react"

import { extractColorFromImage, extractPaletteFromImage } from "@utils/colors"

import { type Palette } from "@repo/utils"

type UseImageColorAndPaletteOptions = {
  imageUri: string | null | undefined
  enabled?: boolean
}

export function useImageColorAndPalette({
  imageUri,
  enabled = true
}: UseImageColorAndPaletteOptions) {
  const [isLoading, setIsLoading] = useState(false)

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  useEffect(() => {
    if (!imageUri || !enabled) {
      setDominantColor(null)
      setPalette(null)
      return
    }

    let cancelled = false

    const extractColors = async () => {
      setIsLoading(true)

      try {
        const [color, extractedPalette] = await Promise.all([
          extractColorFromImage(imageUri),
          extractPaletteFromImage(imageUri)
        ])

        if (!cancelled) {
          setDominantColor(color)
          setPalette(extractedPalette)
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    extractColors()

    return () => {
      cancelled = true
    }
  }, [imageUri, enabled])

  return { dominantColor, palette, isLoading }
}
