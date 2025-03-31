import { forwardRef, useImperativeHandle, useRef } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import {
  Platform,
  TextInput as RNTextInput,
  type NativeSyntheticEvent,
  type TextInputProps as RNTextInputProps,
  type TextInputFocusEventData
} from "react-native"

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
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
            fontFamily: theme.font.family.regular,
            fontSize: theme.font.size.medium,
            color: colors.foreground,
            paddingHorizontal: theme.styles.spacing.small,
            paddingVertical:
              Platform.OS === "android" ? theme.styles.spacing.xSmall : theme.styles.spacing.small,
            borderRadius: theme.styles.borderRadius.xSmall,
            borderColor: colors.muted,
            borderWidth: theme.styles.border.thin
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
