"use client"

import * as React from "react"

import { motion, useAnimation, useAnimationFrame } from "framer-motion"

import { cn } from "@lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  speed?: number
}

const Marquee = ({ children, speed = 10, className, ...props }: MarqueeProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = React.useState(false)
  const controls = useAnimation()

  const checkOverflow = React.useCallback(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth
    const contentWidth = contentRef.current.scrollWidth
    setShouldAnimate(contentWidth > containerWidth)
  }, [])

  React.useEffect(() => {
    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [])

  React.useEffect(() => {
    if (shouldAnimate) {
      controls.start({
        x: "-100%",
        transition: {
          repeat: Infinity,
          repeatDelay: 1,
          duration: 100 / speed,
          ease: "easeInOut"
        }
      })
    } else {
      controls.stop()
      controls.set({ x: "0%" })
    }
  }, [shouldAnimate, speed, controls])

  useAnimationFrame(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth
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
      className={cn("flex flex-row overflow-hidden whitespace-nowrap relative", className)}
      {...props}
    >
      <motion.div ref={contentRef} className="inline-block pr-10" animate={controls}>
        {children}
      </motion.div>
      {shouldAnimate && (
        <motion.div className="inline-block pr-10" animate={controls}>
          {children}
        </motion.div>
      )}
    </div>
  )
}

Marquee.displayName = "Marquee"

export { Marquee }
