import { memo, useEffect } from "react"

import { createStyleSheet, durationTokens, useAnimatedTheme, useStyles, useTheme } from "@styles"

import { Icon } from "@components/ui/Icon"
import { Pressable } from "@components/ui/Pressable"

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { type LyricLineProps } from "./types"

const LyricLine = memo(function LyricLine({ lyric, isActive, onPress }: LyricLineProps) {
  const styles = useStyles(lyricLineStyles)

  const { theme } = useTheme()

  const animatedTheme = useAnimatedTheme()

  const isEmpty = !lyric.text || lyric.text.trim() === ""

  const progress = useSharedValue(isActive ? 1 : 0)

  const fontSizeBase = theme.fontSize("base")
  const fontSizeXl = theme.fontSize("xl")

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: durationTokens[150] })
  }, [isActive, progress])

  const textAnimatedStyle = useAnimatedStyle(() => {
    const themeValue = animatedTheme.value

    const color = interpolateColor(
      progress.value,
      [0, 1],
      [themeValue.colors.mutedForeground, themeValue.colors.foreground]
    )

    const fontSize = interpolate(progress.value, [0, 1], [fontSizeBase, fontSizeXl])

    return {
      color,
      fontSize,
      lineHeight: fontSize * 1.25,
      fontFamily: isActive ? "SpaceGrotesk-Bold" : "SpaceGrotesk-Regular"
    }
  })

  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      disableScaleEffect
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      accessibilityLabel={isEmpty ? "Instrumental" : lyric.text}
    >
      {isEmpty ? (
        <Icon name="Ellipsis" size="lg" color={isActive ? "foreground" : "mutedForeground"} />
      ) : (
        <Animated.Text style={[styles.text, textAnimatedStyle]}>{lyric.text}</Animated.Text>
      )}
    </Pressable>
  )
})

const lyricLineStyles = createStyleSheet(({ theme }) => ({
  container: {
    paddingVertical: theme.space(1.5),
    alignSelf: "flex-start"
  },
  text: {
    fontSize: theme.fontSize(),
    fontFamily: "SpaceGrotesk-Regular",
    color: theme.colors.mutedForeground
  }
}))

export { LyricLine }
