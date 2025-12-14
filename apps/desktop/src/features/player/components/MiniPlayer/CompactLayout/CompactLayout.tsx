import { Fragment } from "react"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useImageSrc } from "@hooks/useImageSrc"
import { usePaletteCssVariables } from "@hooks/usePaletteCssVariables"

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

  const imageSrc = useImageSrc({ thumbnail: currentTrack?.thumbnail })

  const { dominantColor, palette, imageRef } = useImageColorAndPalette({ imageSrc })

  const cssVariables = usePaletteCssVariables(palette)

  return (
    <Fragment>
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
        style={cssVariables as React.CSSProperties}
      >
        <Titlebar />
        <div className="ml-3 min-w-0">
          <TrackInfo />
        </div>
        <div className="mx-3 flex shrink-0 items-center">
          <PlaybackControls />
        </div>
      </motion.div>
    </Fragment>
  )
}

export { CompactLayout }
