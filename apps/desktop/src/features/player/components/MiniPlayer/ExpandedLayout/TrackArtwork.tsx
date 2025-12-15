import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { useImageColor } from "@hooks/useImageColor"
import { useImageSrc } from "@hooks/useImageSrc"

import { cn } from "@lib/utils"

import { Thumbnail } from "@components/ui"

import { Overlay } from "./Overlay"

import { motion } from "motion/react"

const TrackArtwork = () => {
  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const imageSrc = useImageSrc({ thumbnail: currentTrack?.thumbnail })

  const { dominantColor, imageRef } = useImageColor({ imageSrc })

  return (
    <div className="group relative flex h-full w-full items-center justify-center overflow-hidden p-1">
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
          <img ref={imageRef} src={imageSrc} style={{ display: "none" }} crossOrigin="anonymous" />
        )}
        <div className="aspect-square h-full w-fit p-6">
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName={cn("h-full w-fit", currentTrack?.thumbnail && "border-none")}
            className={cn("h-full w-full object-contain", !currentTrack?.thumbnail && "p-[25%]")}
          />
        </div>
      </motion.div>
      <Overlay />
    </div>
  )
}

export { TrackArtwork }
