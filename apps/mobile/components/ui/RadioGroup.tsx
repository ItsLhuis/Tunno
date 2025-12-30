import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, durationTokens, useAnimatedTheme, useStyles } from "@styles"

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Pressable } from "@components/ui/Pressable"

type RadioGroupContextValue = {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled: boolean
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined)

function useRadioGroup() {
  const context = useContext(RadioGroupContext)

  if (!context) throw new Error("RadioGroup components must be used within RadioGroup")

  return context
}

export type RadioGroupProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const RadioGroup = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  style
}: RadioGroupProps) => {
  const styles = useStyles(radioGroupStyles)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : defaultValue

  const handleValueChange = useCallback(
    (newValue: string) => {
      onValueChange?.(newValue)
    },
    [onValueChange]
  )

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      onValueChange: handleValueChange,
      disabled
    }),
    [currentValue, handleValueChange, disabled]
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <View style={[styles.container, style]} accessibilityRole="radiogroup">
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
}

const RADIO_SIZE = 20
const INDICATOR_SIZE = 10

export type RadioGroupItemProps = {
  value: string
  disabled?: boolean
  style?: StyleProp<ViewStyle>
}

const RadioGroupItem = ({ value, disabled: itemDisabled = false, style }: RadioGroupItemProps) => {
  const styles = useStyles(radioGroupStyles)

  const animatedTheme = useAnimatedTheme()

  const { value: groupValue, onValueChange, disabled: groupDisabled } = useRadioGroup()

  const isChecked = groupValue === value
  const isDisabled = groupDisabled || itemDisabled

  const progress = useSharedValue(isChecked ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isChecked ? 1 : 0, { duration: durationTokens[150] })
  }, [isChecked, progress])

  const handlePress = useCallback(() => {
    if (isDisabled) return
    onValueChange(value)
  }, [isDisabled, onValueChange, value])

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.muted, theme.colors.primary]
    )

    return {
      borderColor
    }
  })

  const indicatorAnimatedStyle = useAnimatedStyle(() => {
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
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: isChecked, disabled: isDisabled }}
      style={style}
    >
      <Animated.View style={[styles.circle, circleAnimatedStyle]}>
        <Animated.View style={[styles.indicator, indicatorAnimatedStyle]} />
      </Animated.View>
    </Pressable>
  )
}

const RadioGroupIndicator = () => {
  return null
}

const radioGroupStyles = createStyleSheet(({ theme }) => ({
  container: {
    gap: theme.space(2)
  },
  circle: {
    width: RADIO_SIZE,
    height: RADIO_SIZE,
    borderRadius: RADIO_SIZE / 2,
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    backgroundColor: theme.colors.primary
  }
}))

export { RadioGroup, RadioGroupIndicator, RadioGroupItem }
