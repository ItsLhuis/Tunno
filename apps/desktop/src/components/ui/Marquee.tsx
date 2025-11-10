"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode
} from "react"

import { cn } from "@lib/utils"

import { useAnimate } from "motion/react"

export type MarqueeProps = ComponentProps<"div"> & {
  children: ReactNode
  speed?: number
  shadow?: boolean
}

const Marquee = ({ children, speed = 50, shadow = true, className, ...props }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [shouldAnimate, setShouldAnimate] = useState(false)
  const [scope, animate] = useAnimate()

  const startAnimation = useCallback(() => {
    if (!contentRef.current) return

    const contentWidth = contentRef.current.scrollWidth

    animate(
      scope.current,
      { x: [0, -contentWidth] },
      {
        repeat: Infinity,
        duration: contentWidth / speed,
        ease: "linear"
      }
    )
  }, [animate, scope, speed])

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
      animate(scope.current, { x: 0 }, { duration: 0 })
    }
  }, [shouldAnimate, startAnimation, animate, scope])

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
      className={cn("relative flex flex-row overflow-hidden", className)}
      style={{
        maskImage:
          shadow && shouldAnimate
            ? "linear-gradient(to right, transparent 0, #000000 3rem, #000000 calc(100% - 3rem), transparent 100%)"
            : ""
      }}
      {...props}
    >
      <div ref={scope} className="flex shrink-0">
        <div ref={contentRef} className="inline-block shrink-0 pr-8 leading-none">
          {children}
        </div>
        {shouldAnimate && <div className="inline-block shrink-0 pr-8 leading-none">{children}</div>}
      </div>
    </div>
  )
}

export { Marquee }
