import { useEffect } from "react"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailSrc } from "@hooks/useThumbnailSrc"

import { cn } from "@lib/utils"

import { Thumbnail } from "@components/ui"

import { motion } from "motion/react"

import { type Palette } from "@repo/utils"

type TrackArtworkProps = {
  onPaletteChange: (palette: Palette | null) => void
  onDominantColorChange: (color: string | null) => void
}

const TrackArtwork = ({ onPaletteChange, onDominantColorChange }: TrackArtworkProps) => {
  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const thumbnailSrc = useThumbnailSrc({ fileName: currentTrack?.thumbnail })

  const { dominantColor, palette } = useImageColorAndPalette({ imageSrc: thumbnailSrc })

  useEffect(() => {
    onPaletteChange(palette)
  }, [palette, onPaletteChange])

  useEffect(() => {
    onDominantColorChange(dominantColor)
  }, [dominantColor, onDominantColorChange])

  return (
    <div className="group relative flex aspect-square h-[45vh] items-center justify-center overflow-hidden rounded">
      <motion.div
        className="flex size-full items-center justify-center rounded"
        animate={{
          backgroundColor: dominantColor || undefined
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <div className="aspect-square size-full">
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName={cn("size-full", currentTrack?.thumbnail && "border-none")}
            className="size-full"
          />
        </div>
      </motion.div>
    </div>
  )
}

export { TrackArtwork }
