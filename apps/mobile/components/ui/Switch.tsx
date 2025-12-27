import { useCallback, useEffect } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  createVariant,
  durationTokens,
  useAnimatedTheme,
  useStyles
} from "@styles"

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Pressable } from "@components/ui/Pressable"

export type SwitchProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const SWITCH_WIDTH = 36
const SWITCH_HEIGHT = 20
const THUMB_SIZE = 16
const THUMB_MARGIN = 2
const THUMB_TRAVEL = SWITCH_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2

const Switch = ({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  style
}: SwitchProps) => {
  const styles = useStyles(switchStyles)

  const animatedTheme = useAnimatedTheme()

  const isControlled = controlledChecked !== undefined
  const isChecked = isControlled ? controlledChecked : defaultChecked

  const progress = useSharedValue(isChecked ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, { duration: durationTokens[150] })
  }, [isChecked, progress])

  const handlePress = useCallback(() => {
    if (disabled) return

    const newValue = !isChecked
    onCheckedChange?.(newValue)

    if (!isControlled) {
      progress.value = withTiming(newValue ? 1 : 0, { duration: durationTokens[150] })
    }
  }, [disabled, isChecked, isControlled, onCheckedChange, progress])

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.input, theme.colors.primary]
    )

    return {
      backgroundColor
    }
  })

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(progress.value, [0, 1], [0, THUMB_TRAVEL])

    return {
      transform: [{ translateX }]
    }
  })

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: isChecked, disabled }}
      style={style}
    >
      <Animated.View style={[styles.track({ disabled }), trackAnimatedStyle]}>
        <Animated.View
          style={[styles.thumb({ checked: isChecked, disabled }), thumbAnimatedStyle]}
        />
      </Animated.View>
    </Pressable>
  )
}

const switchStyles = createStyleSheet(({ theme }) => ({
  track: createVariant({
    base: {
      width: SWITCH_WIDTH,
      height: SWITCH_HEIGHT,
      borderRadius: SWITCH_HEIGHT / 2,
      justifyContent: "center",
      paddingHorizontal: THUMB_MARGIN
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
  }),
  thumb: createVariant({
    base: {
      width: THUMB_SIZE,
      height: THUMB_SIZE,
      borderRadius: THUMB_SIZE / 2
    },
    variants: {
      checked: {
        true: {
          backgroundColor: theme.colors.primaryForeground
        },
        false: {
          backgroundColor: theme.colors.foreground
        }
      },
      disabled: {
        true: {
          backgroundColor: theme.colors.mutedForeground
        },
        false: {}
      }
    },
    defaultVariants: {
      checked: false,
      disabled: false
    }
  })
}))

export { Switch }
