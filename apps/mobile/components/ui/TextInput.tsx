import { forwardRef, useImperativeHandle, useRef } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { fontFamily, fontSize } from "@constants/font"
import { spacing, borderRadius, border } from "@constants/styles"

import {
  Platform,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps,
  type NativeSyntheticEvent,
  type TextInputFocusEventData
} from "react-native"

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor
} from "react-native-reanimated"

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput)

export type TextInputProps = RNTextInputProps & {
  disableBorderAnimation?: boolean
}

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  ({ disableBorderAnimation = false, style, onFocus, onBlur, ...props }, ref) => {
    const { colors } = useColorTheme()

    const inputRef = useRef<RNTextInput>(null)
    useImperativeHandle(ref, () => inputRef.current || ({} as RNTextInput))

    const isFocused = useSharedValue<number>(0)

    const borderStyle = useAnimatedStyle(() => ({
      borderColor: interpolateColor(isFocused.value, [0, 1], [colors.muted, colors.primary])
    }))

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!disableBorderAnimation) isFocused.value = withTiming(1, { duration: 300 })
      if (onFocus) onFocus(e)
    }

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!disableBorderAnimation) isFocused.value = withTiming(0, { duration: 300 })
      if (onBlur) onBlur(e)
    }

    return (
      <AnimatedTextInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        maxFontSizeMultiplier={1}
        selectionColor={colors.primary}
        style={[
          {
            fontFamily: fontFamily.regular,
            fontSize: fontSize.medium,
            color: colors.text,
            paddingHorizontal: spacing.small,
            paddingVertical: Platform.OS === "android" ? spacing.xSmall : spacing.small,
            borderRadius: borderRadius.xSmall,
            borderColor: colors.muted,
            borderWidth: border.thin
          },
          borderStyle,
          style
        ]}
        {...props}
      />
    )
  }
)
TextInput.displayName = "TextInput"
