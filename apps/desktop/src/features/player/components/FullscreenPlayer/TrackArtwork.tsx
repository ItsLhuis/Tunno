import { useEffect } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useImageColorAndPalette } from "../../hooks/useImageColorAndPalette"
import { useImageSrc } from "../../hooks/useImageSrc"

import { cn } from "@lib/utils"

import { Thumbnail } from "@components/ui"

import { motion } from "motion/react"

import { type Palette } from "@repo/utils"

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

  const imageSrc = useImageSrc({ thumbnail: currentTrack?.thumbnail })

  const { dominantColor, palette, imageRef } = useImageColorAndPalette({ imageSrc })

  useEffect(() => {
    onPaletteChange(palette)
  }, [palette, onPaletteChange])

  useEffect(() => {
    onDominantColorChange(dominantColor)
  }, [dominantColor, onDominantColorChange])

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
