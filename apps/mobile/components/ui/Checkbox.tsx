import { useCallback, useEffect } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, durationTokens, useAnimatedTheme, useStyles, withOpacity } from "@styles"

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Icon } from "@components/ui/Icon"
import { Pressable } from "@components/ui/Pressable"

export type CheckboxProps = {
  checked?: boolean
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const CHECKBOX_SIZE = 20

const Checkbox = ({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  style
}: CheckboxProps) => {
  const styles = useStyles(checkboxStyles)

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

  const boxAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", theme.colors.primary]
    )

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [withOpacity(theme.colors.foreground, 0.3), theme.colors.primary]
    )

    return {
      backgroundColor,
      borderColor
    }
  })

  const iconAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1])
    const opacity = progress.value

    return {
      transform: [{ scale }],
      opacity
    }
  })

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      style={style}
    >
      <Animated.View style={[styles.box, boxAnimatedStyle, disabled && styles.boxDisabled]}>
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <Icon name="Check" size="xs" color="primaryForeground" />
        </Animated.View>
      </Animated.View>
    </Pressable>
  )
}

const checkboxStyles = createStyleSheet(({ theme }) => ({
  box: {
    width: CHECKBOX_SIZE,
    height: CHECKBOX_SIZE,
    borderRadius: theme.radius("sm"),
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  boxDisabled: {
    opacity: theme.opacity(50)
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  }
}))

export { Checkbox }
