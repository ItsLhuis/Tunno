import { Fragment } from "react"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useImageSrc } from "@hooks/useImageSrc"

import { cn } from "@lib/utils"

import { AnimatePresence, motion } from "motion/react"

type DominantColorGradientProps = {
  thumbnail: string | null | undefined
  className?: string
}

const DominantColorGradient = ({ thumbnail, className }: DominantColorGradientProps) => {
  const imageSrc = useImageSrc({ thumbnail })

  const { dominantColor, imageRef } = useImageColorAndPalette({ imageSrc })

  return (
    <Fragment>
      {imageSrc && (
        <img ref={imageRef} src={imageSrc} style={{ display: "none" }} crossOrigin="anonymous" />
      )}
      <AnimatePresence>
        <motion.div
          key={dominantColor}
          className={cn("absolute inset-0 h-60", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={
            dominantColor
              ? {
                  background: `
                    linear-gradient(
                      to bottom,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 1)")} 0%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.85)")} 18%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.6)")} 36%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.35)")} 54%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.18)")} 70%,
                      ${dominantColor.replace("rgb", "rgba").replace(")", ", 0.08)")} 84%,
                      transparent 100%
                    )
                  `
                }
              : undefined
          }
        />
      </AnimatePresence>
    </Fragment>
  )
}

export { DominantColorGradient }
