import { CompactLayout } from "./CompactLayout"
import { ExpandedLayout } from "./ExpandedLayout"

import { motion } from "motion/react"

const MiniPlayer = () => {
  return (
    <div className="bg-background flex h-screen w-full flex-col overflow-hidden">
      <div className="hidden h-full flex-col [@media(min-height:260px)]:flex">
        <motion.div
          layout
          className="relative flex min-h-0 flex-1"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ExpandedLayout />
        </motion.div>
      </div>
      <div className="flex size-full flex-row [@media(min-height:260px)]:hidden">
        <motion.div
          layout
          className="relative flex min-h-0 flex-1"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <CompactLayout />
        </motion.div>
      </div>
    </div>
  )
}

export { MiniPlayer }
