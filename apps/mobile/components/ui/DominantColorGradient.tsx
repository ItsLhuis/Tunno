import { memo } from "react"

import { StyleSheet, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { LinearGradient } from "expo-linear-gradient"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import Animated from "react-native-reanimated"

type DominantColorGradientProps = {
  thumbnail: string | null | undefined
  style?: StyleProp<ViewStyle>
}

function hexToRgba(hex: string, alpha: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) return `rgba(0, 0, 0, ${alpha})`

  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const DominantColorGradient = memo(({ thumbnail, style }: DominantColorGradientProps) => {
  const styles = useStyles(dominantColorGradientStyles)

  const thumbnailUri = useThumbnailUri({ fileName: thumbnail })

  const { dominantColor, isLoading } = useImageColorAndPalette({ imageUri: thumbnailUri })

  if (!dominantColor || isLoading) {
    return null
  }

  const colors: [string, string, ...string[]] = [
    hexToRgba(dominantColor, 1),
    hexToRgba(dominantColor, 0.85),
    hexToRgba(dominantColor, 0.6),
    hexToRgba(dominantColor, 0.35),
    hexToRgba(dominantColor, 0.18),
    hexToRgba(dominantColor, 0.08),
    "transparent"
  ]

  const locations: [number, number, ...number[]] = [0, 0.18, 0.36, 0.54, 0.7, 0.84, 1]

  return (
    <Animated.View style={[styles.container, style]}>
      <LinearGradient colors={colors} locations={locations} style={styles.gradient} />
    </Animated.View>
  )
})

const dominantColorGradientStyles = createStyleSheet(() => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: "100%"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
}))

export { DominantColorGradient }
