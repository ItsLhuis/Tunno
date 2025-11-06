import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { ToggleFavorite } from "./ToggleFavorite"

import { motion } from "motion/react"

const Overlay = () => {
  return (
    <motion.div
      layout
      className="absolute inset-0 flex flex-col items-center justify-center rounded bg-black/50 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-1 items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <div className="[@media(max-width:480px)]:hidden">
            <ToggleFavorite />
          </div>
          <PlaybackControls />
          <div className="[@media(max-width:480px)]:hidden">
            <PlaybackVolumeControl />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <PlaybackProgress />
      </div>
    </motion.div>
  )
}

export { Overlay }
