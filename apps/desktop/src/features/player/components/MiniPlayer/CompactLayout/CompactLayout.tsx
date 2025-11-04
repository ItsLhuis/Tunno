import { useEffect, useRef, useState } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import ColorThief from "colorthief"

import { generateColorPalette, type Palette } from "@repo/utils"

import { getRenderableFileSrc } from "@services/storage"

import { PlaybackControls } from "./PlaybackControls"
import { Titlebar } from "./Titlebar"
import { TrackInfo } from "./TrackInfo"

import { motion } from "motion/react"

const CompactLayout = () => {
  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  const [imageSrc, setImageSrc] = useState<string | null>(null)

  const [dominantColor, setDominantColor] = useState<string | null>(null)

  const [palette, setPalette] = useState<Palette | null>(null)

  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const loadImage = async () => {
      if (!currentTrack?.thumbnail) {
        setImageSrc(null)
        setDominantColor(null)
        setPalette(null)
        return
      }

      try {
        const src = await getRenderableFileSrc(currentTrack.thumbnail, "thumbnails")
        setImageSrc(src)
      } catch {
        setImageSrc(null)
        setDominantColor(null)
        setPalette(null)
      }
    }

    loadImage()
  }, [currentTrack?.thumbnail])

  useEffect(() => {
    if (!imageSrc || !imageRef.current) {
      setDominantColor(null)
      setPalette(null)
      return
    }

    const image = imageRef.current
    const colorThief = new ColorThief()

    const handleImageLoad = () => {
      try {
        const color = colorThief.getColor(image) as [number, number, number]
        const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
        setDominantColor(rgbColor)

        const generatedPalette = generateColorPalette(color)
        setPalette(generatedPalette)
      } catch {
        setDominantColor(null)
        setPalette(null)
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
    <>
      {imageSrc && (
        <img
          ref={imageRef}
          src={imageSrc}
          alt=""
          style={{ display: "none" }}
          crossOrigin="anonymous"
        />
      )}
      <motion.div
        className="grid h-full w-full grid-cols-[auto_1fr_auto]"
        animate={{
          backgroundColor: dominantColor || undefined
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <Titlebar />
        <div className="ml-3 min-w-0">
          <TrackInfo palette={palette} />
        </div>
        <div className="mx-3 flex shrink-0 items-center">
          <PlaybackControls palette={palette} />
        </div>
      </motion.div>
    </>
  )
}

export { CompactLayout }
