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
  ({ src, alt, className, containerClassName, onLoad, ...props }, ref) => {
    const [isNewImageLoaded, setIsNewImageLoaded] = useState(false)

    const [currentSrc, setCurrentSrc] = useState<string | null>(src ?? null)
    const [previousSrc, setPreviousSrc] = useState<string | null>(null)

    const imageRef = useRef<HTMLImageElement>(null)
    const preloadRef = useRef<HTMLImageElement | null>(null)

    useEffect(() => {
      if (src && src !== currentSrc) {
        const preloadImage = new window.Image()
        preloadRef.current = preloadImage
        preloadImage.src = src

        preloadImage.onload = () => {
          setPreviousSrc(currentSrc)
          setCurrentSrc(src)
          setIsNewImageLoaded(false)
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
      } else if (!src && currentSrc !== null) {
        setPreviousSrc(null)
        setCurrentSrc(null)
        setIsNewImageLoaded(false)
      }
    }, [src, currentSrc])

    useEffect(() => {
      return () => {
        if (preloadRef.current) {
          preloadRef.current.onload = null
          preloadRef.current.onerror = null
          preloadRef.current = null
        }
      }
    }, [])

    const handleNewImageLoad = () => {
      requestAnimationFrame(() => {
        setIsNewImageLoaded(true)
        if (onLoad) onLoad()
      })
    }

    return (
      <div
        className={cn(
          "bg-muted",
          containerClassName,
          "relative shrink-0 overflow-hidden transition-colors"
        )}
      >
        <img
          ref={ref}
          src={currentSrc ?? undefined}
          alt={alt}
          className={cn(
            className,
            isNewImageLoaded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-300"
          )}
          {...props}
        />
        <AnimatePresence>
          {previousSrc && !isNewImageLoaded && (
            <motion.img
              key={previousSrc}
              src={previousSrc}
              alt={alt}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className={cn(className, "absolute inset-0")}
              {...props}
            />
          )}
          {!isNewImageLoaded && currentSrc && (
            <motion.img
              key={currentSrc}
              ref={imageRef}
              src={currentSrc}
              alt={alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onLoad={handleNewImageLoad}
              className={cn(className, "absolute inset-0")}
              {...props}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }
)
export { Image }
