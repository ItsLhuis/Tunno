import { useColorTheme } from "@hooks/useColorTheme"

import { border, iconSize } from "@constants/styles"

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
      maximumTrackTintColor={maximumTrackTintColor || colors.secondary}
      trackStyle={StyleSheet.flatten([{ height: border.medium }, trackStyle])}
      thumbStyle={StyleSheet.flatten([
        { height: iconSize.small, width: iconSize.small },
        thumbStyle
      ])}
      {...props}
    />
  )
}
Slider.displayName = "Slider"
