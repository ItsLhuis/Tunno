import { useColorTheme } from "@hooks/useColorTheme"

import { rgba } from "polished"

import { theme } from "@styles/theme"

import { StyleSheet } from "react-native"

import {
  Slider as ReactNativeSlider,
  type SliderProps as ReactNativeSliderProps
} from "@miblanchard/react-native-slider"

export type SliderProps = Omit<
  ReactNativeSliderProps,
  "animationType" | "minimumValue" | "maximumValue"
> & {
  animationType?: "timing" | "spring"
  minimumValue?: number
  maximumValue?: number
}

export function Slider({
  animationType = "timing",
  minimumValue = 0,
  maximumValue = 1,
  thumbTintColor,
  minimumTrackTintColor,
  maximumTrackTintColor,
  trackStyle,
  thumbStyle,
  ...props
}: SliderProps) {
  const { colors } = useColorTheme()

  return (
    <ReactNativeSlider
      animationType={animationType}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      thumbTintColor={thumbTintColor || colors.primary}
      minimumTrackTintColor={minimumTrackTintColor || colors.primary}
      maximumTrackTintColor={maximumTrackTintColor || rgba(colors.primary, 0.2)}
      trackStyle={StyleSheet.flatten([{ height: theme.styles.border.medium }, trackStyle])}
      thumbStyle={StyleSheet.flatten([
        { height: theme.styles.icon.size.small, width: theme.styles.icon.size.small },
        thumbStyle
      ])}
      {...props}
    />
  )
}
Slider.displayName = "Slider"
