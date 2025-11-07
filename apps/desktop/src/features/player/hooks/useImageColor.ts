import { useEffect, useRef, useState } from "react"

import { extractColorFromImage } from "../utils/colors"

type UseImageColorOptions = {
  imageSrc: string | null
  enabled?: boolean
}

export const useImageColor = ({ imageSrc, enabled = true }: UseImageColorOptions) => {
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
