import { type Ref, useEffect, useRef, useState } from "react"

import { cn } from "@lib/utils"

import { AnimatePresence, motion } from "motion/react"

export type ImageProps = {
  src?: string
  alt?: string
  className?: string
  containerClassName?: string
  onLoad?: () => void
  ref?: Ref<HTMLImageElement>
}

const Image = ({ src, className, containerClassName, onLoad, ref, ...props }: ImageProps) => {
  const [displaySrc, setDisplaySrc] = useState<string | null>(null)

  const [isLoaded, setIsLoaded] = useState(false)

  const preloadRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) {
      setDisplaySrc(null)
      setIsLoaded(false)
      return
    }

    if (src === displaySrc && isLoaded) {
      return
    }

    setIsLoaded(false)
    const preloadImage = new window.Image()
    preloadRef.current = preloadImage
    preloadImage.src = src

    preloadImage.onload = () => {
      setDisplaySrc(src)
      setIsLoaded(true)
      preloadRef.current = null
    }

    preloadImage.onerror = () => {
      preloadRef.current = null
      setIsLoaded(false)
    }

    return () => {
      if (preloadRef.current) {
        preloadRef.current.onload = null
        preloadRef.current.onerror = null
        preloadRef.current = null
      }
    }
  }, [src])

  const handleImageLoad = () => {
    onLoad?.()
  }

  return (
    <div
      className={cn(
        "border-border bg-muted overflow-hidden rounded border",
        containerClassName,
        "relative shrink-0"
      )}
    >
      <AnimatePresence mode="popLayout">
        {displaySrc && isLoaded && (
          <motion.img
            ref={ref}
            key={displaySrc}
            src={displaySrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onLoad={handleImageLoad}
            className={cn("aspect-auto w-12", className)}
            {...props}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export { Image }
