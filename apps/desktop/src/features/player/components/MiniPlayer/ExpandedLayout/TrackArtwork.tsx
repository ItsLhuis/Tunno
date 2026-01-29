import { usePlayerStore } from "../../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailSrc } from "@hooks/useThumbnailSrc"

import { cn } from "@lib/utils"

import { Thumbnail } from "@components/ui"

import { Overlay } from "./Overlay"

import { motion } from "motion/react"

const TrackArtwork = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const thumbnailSrc = useThumbnailSrc({ fileName: currentTrack?.thumbnail })

  const { dominantColor } = useImageColorAndPalette({ imageSrc: thumbnailSrc })

  return (
    <div className="group relative flex size-full items-center justify-center overflow-hidden p-1">
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
        <div className="aspect-square h-full w-fit p-6">
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName={cn("h-full w-fit", currentTrack?.thumbnail && "border-none")}
            className="size-full"
          />
        </div>
      </motion.div>
      <Overlay />
    </div>
  )
}

export { TrackArtwork }
