import { forwardRef, useEffect, useRef, useState } from "react"

import { cn } from "@lib/utils"

import { AnimatePresence, motion } from "motion/react"

export type ImageProps = {
  src?: string
  alt?: string
  className?: string
  containerClassName?: string
  onLoad?: () => void
}

const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, className, containerClassName, onLoad, ...props }, ref) => {
    const [displaySrc, setDisplaySrc] = useState<string | null>(src ?? null)

    const preloadRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
      if (src && src !== displaySrc) {
        const preloadImage = new window.Image()
        preloadRef.current = preloadImage
        preloadImage.src = src

        preloadImage.onload = () => {
          setDisplaySrc(src)
          preloadRef.current = null
        }

        preloadImage.onerror = () => {
          preloadRef.current = null
        }

        return () => {
          if (preloadRef.current) {
            preloadRef.current.onload = null
            preloadRef.current.onerror = null
            preloadRef.current = null
          }
        }
      } else if (!src && displaySrc !== null) {
        setDisplaySrc(null)
      }
    }, [src, displaySrc])

    useEffect(() => {
      return () => {
        if (preloadRef.current) {
          preloadRef.current.onload = null
          preloadRef.current.onerror = null
          preloadRef.current = null
        }
      }
    }, [])

    return (
      <div
        className={cn(
          "overflow-hidden rounded-md border border-border bg-muted",
          containerClassName,
          "relative shrink-0"
        )}
      >
        <AnimatePresence mode="popLayout">
          {displaySrc && (
            <motion.img
              ref={ref}
              key={displaySrc}
              src={displaySrc}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onLoad={onLoad}
              className={cn("aspect-auto w-12", className, "transition-opacity")}
              {...props}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }
)

export { Image }
