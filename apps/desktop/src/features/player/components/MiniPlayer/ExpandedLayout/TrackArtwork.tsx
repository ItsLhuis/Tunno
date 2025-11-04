import { useEffect, useRef, useState } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import ColorThief from "colorthief"

import { cn } from "@lib/utils"

import { getRenderableFileSrc } from "@services/storage"

import { Thumbnail } from "@components/ui"

import { Overlay } from "./Overlay"

import { motion } from "motion/react"

const TrackArtwork = () => {
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
        return
      }

      try {
        const src = await getRenderableFileSrc(currentTrack.thumbnail, "thumbnails")
        setImageSrc(src)
      } catch {
        setImageSrc(null)
        setDominantColor(null)
      }
    }

    loadImage()
  }, [currentTrack?.thumbnail])

  useEffect(() => {
    if (!imageSrc || !imageRef.current) {
      setDominantColor(null)
      return
    }

    const image = imageRef.current
    const colorThief = new ColorThief()

    const handleImageLoad = () => {
      try {
        const color = colorThief.getColor(image)
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        setDominantColor(rgbColor)
      } catch {
        setDominantColor(null)
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
  }, [imageSrc])

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
          <img
            ref={imageRef}
            src={imageSrc}
            alt=""
            style={{ display: "none" }}
            crossOrigin="anonymous"
          />
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
