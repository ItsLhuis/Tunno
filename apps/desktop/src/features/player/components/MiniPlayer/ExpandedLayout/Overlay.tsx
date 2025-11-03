import { PlaybackControls } from "./PlaybackControls"
import { PlaybackProgress } from "./PlaybackProgress"

import { motion } from "motion/react"

const Overlay = () => {
  return (
    <motion.div
      layout
      className="absolute inset-0 flex flex-col items-center justify-center rounded bg-black/50 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-1 items-center justify-center">
        <PlaybackControls />
      </div>
      <div className="absolute bottom-0 w-full">
        <PlaybackProgress />
      </div>
    </motion.div>
  )
}

export { Overlay }
