import { useEffect, useRef, useState } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import ColorThief from "colorthief"

import { generateColorPalette, type Palette } from "@repo/utils"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import { Thumbnail } from "@components/ui"

import { motion } from "motion/react"

type TrackArtworkProps = {
  onPaletteChange: (palette: Palette | null) => void
  onDominantColorChange: (color: string | null) => void
}

const TrackArtwork = ({ onPaletteChange, onDominantColorChange }: TrackArtworkProps) => {
  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const [dominantColor, setDominantColor] = useState<string | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const loadImage = async () => {
      if (!currentTrack?.thumbnail) {
        setImageSrc(null)
        setDominantColor(null)
        onPaletteChange(null)
        onDominantColorChange(null)
        return
      }

      try {
        const src = await getRenderableFileSrc(currentTrack.thumbnail, "thumbnails")
        setImageSrc(src)
      } catch {
        setImageSrc(null)
        setDominantColor(null)
        onPaletteChange(null)
        onDominantColorChange(null)
      }
    }

    loadImage()
  }, [currentTrack?.thumbnail, onPaletteChange, onDominantColorChange])

  useEffect(() => {
    if (!imageSrc || !imageRef.current) {
      setDominantColor(null)
      onPaletteChange(null)
      onDominantColorChange(null)
      return
    }

    const image = imageRef.current
    const colorThief = new ColorThief()

    const handleImageLoad = () => {
      try {
        const color = colorThief.getColor(image) as [number, number, number]
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        setDominantColor(rgbColor)
        onDominantColorChange(rgbColor)

        const generatedPalette = generateColorPalette(color)
        onPaletteChange(generatedPalette)
      } catch {
        setDominantColor(null)
        onPaletteChange(null)
        onDominantColorChange(null)
      }
    }

    if (image.complete && image.naturalWidth > 0) {
      handleImageLoad()
    } else {
      image.addEventListener("load", handleImageLoad)
      return () => {
        image.removeEventListener("load", handleImageLoad)
      }
    }
  }, [imageSrc, onPaletteChange, onDominantColorChange])

  return (
    <div className="group relative flex aspect-square h-[45vh] items-center justify-center overflow-hidden rounded">
      <motion.div
        className="flex h-full w-full items-center justify-center rounded"
        animate={{
          backgroundColor: dominantColor || undefined
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        {imageSrc && (
          <img
            ref={imageRef}
            src={imageSrc}
            alt=""
            style={{ display: "none" }}
            crossOrigin="anonymous"
          />
        )}
        <div className="aspect-square h-full w-full">
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName={cn("h-full w-full", currentTrack?.thumbnail && "border-none")}
            className={cn("h-full w-full object-contain", !currentTrack?.thumbnail && "p-[25%]")}
          />
        </div>
      </motion.div>
    </div>
  )
}

export { TrackArtwork }
