"use client"

import { type ElementType, type ReactNode, useRef, useState } from "react"

import {
  motion,
  Transition,
  useInView,
  type UseInViewOptions,
  type Variant,
  type Variants
} from "motion/react"

export type InViewProps = {
  children: ReactNode
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  viewOptions?: UseInViewOptions
  as?: ElementType
  once?: boolean
  direction?: "up" | "down" | "left" | "right"
  offset?: number
  blur?: string
  delay?: number
  className?: string
}

function InView({
  children,
  variants,
  transition,
  viewOptions,
  as = "div",
  once,
  direction = "down",
  offset = 6,
  blur = "6px",
  delay = 0.1,
  className
}: InViewProps) {
  const ref = useRef(null)

  const isInView = useInView(ref, viewOptions)

  const [isViewed, setIsViewed] = useState(false)

  const MotionComponent = motion[as as keyof typeof motion] as typeof as

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)"
    }
  }

  const combinedVariants = variants ?? defaultVariants

  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      onAnimationComplete={() => {
        if (once) setIsViewed(true)
      }}
      animate={isInView || isViewed ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{ delay, ...transition }}
      className={className}
    >
      {children}
    </MotionComponent>
  )
}

export { InView }
