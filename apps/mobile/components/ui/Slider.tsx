import { type ColorKey, createStyleSheet, resolveColor, useStyles, useTheme } from "@styles"

import {
  Slider as ReactNativeSlider,
  type SliderProps as ReactNativeSliderProps
} from "@miblanchard/react-native-slider"

export type SliderProps = Omit<
  ReactNativeSliderProps,
  | "animationType"
  | "minimumValue"
  | "maximumValue"
  | "thumbTintColor"
  | "minimumTrackTintColor"
  | "maximumTrackTintColor"
> & {
  animationType?: "timing" | "spring"
  minimumValue?: number
  maximumValue?: number
  thumbTintColor?: ColorKey
  minimumTrackTintColor?: ColorKey
  maximumTrackTintColor?: ColorKey
}

const Slider = ({
  animationType = "timing",
  minimumValue = 0,
  maximumValue = 1,
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  trackStyle,
  thumbStyle,
  ...props
}: SliderProps) => {
  const { theme } = useTheme()

  const styles = useStyles(sliderStyles)

  const getColor = (color?: ColorKey): string => {
    if (!color) return theme.colors.primary

    const resolvedColor = resolveColor(theme, color)

    return resolvedColor || theme.colors.primary
  }

  const primaryColor = getColor(thumbTintColor || minimumTrackTintColor)

  const thumbColor = thumbTintColor ? getColor(thumbTintColor) : primaryColor
  const minTrackColor = minimumTrackTintColor ? getColor(minimumTrackTintColor) : primaryColor
  const maxTrackColor = maximumTrackTintColor
    ? getColor(maximumTrackTintColor)
    : theme.withOpacity(primaryColor, theme.opacity(20))

  return (
    <ReactNativeSlider
      animationType={animationType}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      thumbTintColor={thumbColor}
      minimumTrackTintColor={minTrackColor}
      maximumTrackTintColor={maxTrackColor}
      trackStyle={trackStyle ? [styles.track, trackStyle] : styles.track}
      thumbStyle={thumbStyle ? [styles.thumb, trackStyle] : styles.thumb}
      {...props}
    />
  )
}

const sliderStyles = createStyleSheet(({ theme }) => ({
  track: {
    height: theme.borderWidth(4)
  },
  thumb: {
    height: theme.fontSize("xs"),
    width: theme.fontSize("xs")
  }
}))

export { Slider }
