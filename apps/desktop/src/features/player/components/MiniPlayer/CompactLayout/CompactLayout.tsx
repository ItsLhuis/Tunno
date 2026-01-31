import { type CSSProperties } from "react"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"
import { useThumbnailSrc } from "@hooks/useThumbnailSrc"

import { PlaybackControls } from "./PlaybackControls"
import { Titlebar } from "./Titlebar"
import { TrackInfo } from "./TrackInfo"

import { motion } from "motion/react"

const CompactLayout = () => {
  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const thumbnailSrc = useThumbnailSrc({ fileName: currentTrack?.thumbnail })

  const { dominantColor, palette } = useImageColorAndPalette({ imageSrc: thumbnailSrc })

  const cssVariables = usePaletteCssVariables(palette)

  return (
    <motion.div
      className="grid size-full grid-cols-[auto_1fr_auto]"
      animate={{
        backgroundColor: dominantColor || undefined
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      style={cssVariables as CSSProperties}
    >
      <Titlebar />
      <div className="ml-3 min-w-0">
        <TrackInfo />
      </div>
      <div className="mx-3 flex shrink-0 items-center">
        <PlaybackControls />
      </div>
    </motion.div>
  )
}

export { CompactLayout }
