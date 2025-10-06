"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@lib/utils"

import { motion, useAnimation } from "motion/react"

export type MarqueeProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode
  speed?: number
  shadow?: boolean
}

const Marquee = ({ children, speed = 50, shadow = true, className, ...props }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [shouldAnimate, setShouldAnimate] = useState(false)

  const controls = useAnimation()

  const startAnimation = useCallback(() => {
    if (!contentRef.current) return

    const contentWidth = contentRef.current.scrollWidth
    controls.start({
      x: "-100%",
      transition: {
        repeat: Infinity,
        duration: contentWidth / speed,
        ease: "linear"
      }
    })
  }, [controls, speed])

  const checkOverflow = useCallback(() => {
    if (!containerRef.current || !contentRef.current) return

    const containerWidth = containerRef.current.offsetWidth + 32
    const contentWidth = contentRef.current.scrollWidth
    const needsAnimation = contentWidth > containerWidth

    setShouldAnimate(needsAnimation)
  }, [])

  useEffect(() => {
    if (!contentRef.current) return

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow()
    })

    resizeObserver.observe(contentRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [checkOverflow])

  useEffect(() => {
    if (shouldAnimate) {
      startAnimation()
    } else {
      controls.stop()
      controls.set({ x: "0%" })
    }
  }, [shouldAnimate, startAnimation, controls])

  useEffect(() => {
    checkOverflow()

    window.addEventListener("resize", checkOverflow)
    return () => window.removeEventListener("resize", checkOverflow)
  }, [checkOverflow])

  useEffect(() => {
    checkOverflow()
  }, [children, checkOverflow])

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
      <motion.div ref={contentRef} className="inline-block pr-8 leading-none" animate={controls}>
        {children}
      </motion.div>
      {shouldAnimate && (
        <motion.div className="inline-block pr-8 leading-none" animate={controls}>
          {children}
        </motion.div>
      )}
    </div>
  )
}

export { Marquee }
