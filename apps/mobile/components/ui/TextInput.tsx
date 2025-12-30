import { type Ref } from "react"

import {
  type BlurEvent,
  ColorValue,
  type FocusEvent,
  TextInput as RNTextInput,
  type TextInputProps as RNTextInputProps
} from "react-native"

import {
  type ColorKey,
  createStyleSheet,
  createVariant,
  durationTokens,
  resolveColor,
  type StyleVariants,
  useAnimatedTheme,
  useStyles,
  useTheme
} from "@styles"

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

const AnimatedTextInput = Animated.createAnimatedComponent(RNTextInput)

export type TextInputProps = Omit<
  RNTextInputProps,
  "placeholderTextColor" | "selectionColor" | "editable"
> &
  StyleVariants<typeof textInputStyles, "input"> & {
    disableBorderAnimation?: boolean
    placeholderTextColor?: ColorKey | undefined
    selectionColor?: ColorKey | undefined
    ref?: Ref<RNTextInput>
  }

const TextInput = ({
  disableBorderAnimation = false,
  disabled = false,
  style,
  onFocus,
  onBlur,
  placeholderTextColor,
  selectionColor,
  ref,
  ...props
}: TextInputProps) => {
  const styles = useStyles(textInputStyles)

  const { theme } = useTheme()

  const animatedTheme = useAnimatedTheme()

  const isFocused = useSharedValue(0)

  const resolvedPlaceholderColor = placeholderTextColor
    ? resolveColor(theme, placeholderTextColor)
    : undefined
  const finalPlaceholderColor: ColorValue = resolvedPlaceholderColor ?? theme.colors.mutedForeground

  const resolvedSelectionColor = selectionColor ? resolveColor(theme, selectionColor) : undefined
  const finalSelectionColor: ColorValue = resolvedSelectionColor ?? theme.colors.primary

  const borderStyle = useAnimatedStyle(() => {
    if (disableBorderAnimation) {
      return {}
    }

    return {
      borderColor: interpolateColor(
        isFocused.value,
        [0, 1],
        [String(animatedTheme.value.colors.input), String(animatedTheme.value.colors.primary)]
      )
    }
  })

  const handleFocus = (event: FocusEvent) => {
    if (!disableBorderAnimation) {
      isFocused.value = withTiming(1, { duration: durationTokens[300] })
    }
    onFocus?.(event)
  }

  const handleBlur = (event: BlurEvent) => {
    if (!disableBorderAnimation) {
      isFocused.value = withTiming(0, { duration: durationTokens[300] })
    }
    onBlur?.(event)
  }

  return (
    <AnimatedTextInput
      ref={ref}
      editable={!disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      maxFontSizeMultiplier={1}
      selectionColor={finalSelectionColor}
      placeholderTextColor={finalPlaceholderColor}
      style={[styles.input({ disabled }), borderStyle, style]}
      {...props}
    />
  )
}

const textInputStyles = createStyleSheet(({ theme }) => ({
  input: createVariant({
    base: {
      backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
      fontSize: theme.fontSize("sm"),
      fontFamily: "SpaceGrotesk-Regular",
      color: theme.colors.foreground,
      padding: theme.space("sm"),
      borderRadius: theme.radius(),
      borderWidth: theme.borderWidth(),
      borderColor: theme.colors.input
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity(50)
        },
        false: {}
      }
    },
    defaultVariants: {
      disabled: false
    }
  })
}))

export { TextInput }
