"use client"

import { cn } from "@lib/utils"

import { motion, type MotionStyle, type Transition } from "motion/react"

type BorderBeamProps = {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
}

const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#CA3036",
  colorTo = "#FC3C44",
  transition,
  style,
  reverse = false,
  initialOffset = 0
}: BorderBeamProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [mask-composite:intersect] [mask-clip:padding-box,border-box]">
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`]
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition
        }}
      />
    </div>
  )
}

export { BorderBeam }
