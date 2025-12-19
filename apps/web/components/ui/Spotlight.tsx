"use client"

import { motion } from "motion/react"

type SpotlightProps = {
  gradientFirst?: string
  gradientSecond?: string
  gradientThird?: string
  translateY?: number
  width?: number
  height?: number
  smallWidth?: number
  duration?: number
  xOffset?: number
}

const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, rgba(252, 60, 68, 0.08) 0%, rgba(252, 60, 68, 0.02) 50%, rgba(252, 60, 68, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, rgba(252, 60, 68, 0.06) 0%, rgba(252, 60, 68, 0.02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, rgba(252, 60, 68, 0.04) 0%, rgba(252, 60, 68, 0.02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100
}: SpotlightProps = {}) => {
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 1.5
      }}
      className="pointer-events-none absolute inset-0 size-full overflow-hidden"
    >
      <motion.div
        animate={{
          x: [0, xOffset, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="pointer-events-none absolute top-0 left-0 z-40 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 left-0`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
      </motion.div>
      <motion.div
        animate={{
          x: [0, -xOffset, 0]
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
        className="pointer-events-none absolute top-0 right-0 z-40 h-screen w-screen"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 right-0`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
      </motion.div>
    </motion.div>
  )
}
export { Spotlight }
