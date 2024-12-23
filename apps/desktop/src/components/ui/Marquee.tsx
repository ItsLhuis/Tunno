"use client"

import * as React from "react"

import { motion, useAnimation, useAnimationFrame } from "motion/react"

import { cn } from "@lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number
  shadow?: boolean
}

const Marquee = ({ children, speed = 20, shadow = true, className, ...props }: MarqueeProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = React.useState<boolean>(false)
  const controls = useAnimation()

  const checkOverflow = React.useCallback(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth + 32 // Add content padding
    const contentWidth = contentRef.current.scrollWidth
    setShouldAnimate(contentWidth > containerWidth)
  }, [])

  React.useEffect(() => {
    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [])

  React.useEffect(() => {
    if (shouldAnimate && contentRef.current) {
      const contentWidth = contentRef.current.scrollWidth

      controls.start({
        x: "-100%",
        transition: {
          repeat: Infinity,
          duration: contentWidth / speed,
          ease: "linear"
        }
      })
    } else {
      controls.stop()
      controls.set({ x: "0%" })
    }
  }, [shouldAnimate, speed, controls])

  useAnimationFrame(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth + 32 // Add content padding
    const contentWidth = contentRef.current.scrollWidth
    if (contentWidth <= containerWidth && shouldAnimate) {
      setShouldAnimate(false)
    } else if (contentWidth > containerWidth && !shouldAnimate) {
      setShouldAnimate(true)
    }
  })

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-row truncate relative transition-all", className)}
      style={{
        maskImage:
          shadow && shouldAnimate
            ? "linear-gradient(to right, transparent 0, #000000 3rem, #000000 calc(100% - 3rem), transparent 100%)"
            : ""
      }}
      {...props}
    >
      <motion.div ref={contentRef} className="inline-block pr-8" animate={controls}>
        {children}
      </motion.div>
      {shouldAnimate && (
        <motion.div className="inline-block pr-8" animate={controls}>
          {children}
        </motion.div>
      )}
    </div>
  )
}
Marquee.displayName = "Marquee"

export { Marquee }
