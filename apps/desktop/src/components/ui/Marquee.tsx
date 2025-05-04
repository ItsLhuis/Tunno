"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@lib/utils"

import { motion, useAnimation, useAnimationFrame } from "motion/react"

export type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  speed?: number
  shadow?: boolean
}

const Marquee = ({ children, speed = 50, shadow = true, className, ...props }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState<boolean>(false)
  const controls = useAnimation()

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth + 32 // Add content padding
    const contentWidth = contentRef.current.scrollWidth
    setShouldAnimate(contentWidth > containerWidth)
  }, [])

  useEffect(() => {
    checkOverflow()
    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [checkOverflow])

  useEffect(() => {
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
      className={cn("relative flex flex-row truncate", className)}
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
