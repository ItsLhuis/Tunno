"use client"

import { forwardRef, useEffect, useRef, useState, type ReactNode } from "react"

import { AnimatePresence, motion } from "motion/react"

export type ImageProps = {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  className?: string
  containerClassName?: string
  placeholderComponent?: ReactNode
  onLoad?: () => void
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      alt,
      width,
      height,
      className,
      containerClassName,
      placeholderComponent,
      onLoad,
      ...props
    },
    ref
  ) => {
    const [loaded, setLoaded] = useState<boolean>(false)

    const [currentSrc, setCurrentSrc] = useState<string>(src)

    const srcRef = useRef(src)

    const handleLoad = () => {
      setLoaded(true)
      if (onLoad) onLoad()
    }

    const resetLoadingState = () => {
      setLoaded(false)
      setCurrentSrc(srcRef.current)
    }

    useEffect(() => {
      if (srcRef.current !== src) {
        srcRef.current = src
        resetLoadingState()
      }
    }, [src])

    const defaultPlaceholder = <div className="w-full h-full bg-muted" />

    const containerStyles = [
      "relative overflow-hidden shrink-0 transition-colors",
      containerClassName
    ]
      .filter(Boolean)
      .join(" ")

    return (
      <div className={containerStyles}>
        <img
          ref={ref}
          src={currentSrc}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          className={className}
          {...props}
        />
        <AnimatePresence mode="wait">
          {!loaded && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {placeholderComponent ?? defaultPlaceholder}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
Image.displayName = "Image"
