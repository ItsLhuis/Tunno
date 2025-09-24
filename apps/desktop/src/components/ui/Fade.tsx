"use client"

import { type CSSProperties, type ReactNode, useEffect, useState, forwardRef } from "react"

import { AnimatePresence, motion, type Transition, type Variant, type Variants } from "motion/react"

export type FadeProps = {
  children: ReactNode
  show?: boolean
  variants?: {
    hidden: Variant
    visible: Variant
  }
  transition?: Transition
  as?: React.ElementType
  direction?: "up" | "down" | "left" | "right" | "none"
  offset?: number
  blur?: string
  delay?: number
  duration?: number
  scale?: number
  rotate?: number
  style?: CSSProperties
  className?: string
  onAnimationStart?: () => void
  onAnimationComplete?: () => void
  onExitComplete?: () => void
  mode?: "wait" | "sync" | "popLayout"
  initial?: boolean
  exit?: boolean
  unmountOnExit?: boolean
}

const Fade = forwardRef<HTMLDivElement, FadeProps>(
  (
    {
      children,
      show = true,
      variants,
      transition,
      as = "div",
      direction = "none",
      offset = 20,
      blur = "0px",
      delay = 0,
      duration = 0.3,
      scale = 1,
      rotate = 0,
      style,
      className,
      onAnimationStart,
      onAnimationComplete,
      onExitComplete,
      mode = "sync",
      initial = true,
      exit = true,
      unmountOnExit = true
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = useState(show)

    useEffect(() => {
      if (show) {
        setIsMounted(true)
      }
    }, [show])

    const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div

    const getDirectionOffset = () => {
      switch (direction) {
        case "up":
          return { y: offset }
        case "down":
          return { y: -offset }
        case "left":
          return { x: offset }
        case "right":
          return { x: -offset }
        default:
          return {}
      }
    }

    const defaultVariants: Variants = {
      hidden: {
        opacity: 0,
        scale: scale !== 1 ? scale * 0.95 : 1,
        rotate: rotate !== 0 ? rotate + 5 : 0,
        filter: blur !== "0px" ? `blur(${blur})` : "blur(0px)",
        ...getDirectionOffset()
      },
      visible: {
        opacity: 1,
        scale: scale,
        rotate: rotate,
        x: 0,
        y: 0,
        filter: "blur(0px)"
      }
    }

    const combinedVariants = variants ?? defaultVariants

    const defaultTransition: Transition = {
      duration,
      delay,
      ease: "easeOut",
      ...transition
    }

    const handleExitComplete = () => {
      if (unmountOnExit) {
        setIsMounted(false)
      }
      onExitComplete?.()
    }

    if (!isMounted && unmountOnExit) {
      return null
    }

    const baseProps = {
      ref,
      initial: initial ? ("hidden" as const) : false,
      animate: show ? ("visible" as const) : ("hidden" as const),
      variants: combinedVariants,
      transition: defaultTransition,
      style,
      className,
      onAnimationStart,
      onAnimationComplete,
      children
    }

    const fadeContent = exit ? (
      <MotionComponent {...baseProps} exit="hidden" />
    ) : (
      <MotionComponent {...baseProps} />
    )

    if (unmountOnExit) {
      return (
        <AnimatePresence mode={mode} onExitComplete={handleExitComplete}>
          {show && fadeContent}
        </AnimatePresence>
      )
    }

    return fadeContent
  }
)

Fade.displayName = "Fade"

export { Fade }
