import { memo } from "react"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailSrc } from "@hooks/useThumbnailSrc"

import { cn } from "@lib/utils"

import { AnimatePresence, motion } from "motion/react"

type DominantColorGradientProps = {
  thumbnail: string | null | undefined
  className?: string
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) return `rgba(0, 0, 0, ${alpha})`

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const DominantColorGradient = memo(({ thumbnail, className }: DominantColorGradientProps) => {
  const thumbnailSrc = useThumbnailSrc({ fileName: thumbnail })

  const { dominantColor, isLoading } = useImageColorAndPalette({ imageSrc: thumbnailSrc })

  if (!dominantColor || isLoading) {
    return null
  }

  const colors = [
    hexToRgba(dominantColor, 1),
    hexToRgba(dominantColor, 0.85),
    hexToRgba(dominantColor, 0.6),
    hexToRgba(dominantColor, 0.35),
    hexToRgba(dominantColor, 0.18),
    hexToRgba(dominantColor, 0.08),
    "transparent"
  ]

  const locations = [0, 0.18, 0.36, 0.54, 0.7, 0.84, 1]

  const gradientStops = colors.map((color, i) => `${color} ${locations[i] * 100}%`).join(", ")

  return (
    <AnimatePresence>
      <motion.div
        key={dominantColor}
        className={cn("absolute inset-0 h-60", className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ background: `linear-gradient(to bottom, ${gradientStops})` }}
      />
    </AnimatePresence>
  )
})

export { DominantColorGradient }
