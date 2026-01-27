import { useCallback, useEffect, useState } from "react"

import { type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  createVariant,
  durationTokens,
  useAnimatedTheme,
  useStyles
} from "@styles"

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { BottomSheetTextInput } from "@components/ui/BottomSheet"
import { IconButton } from "@components/ui/IconButton"
import { Separator } from "@components/ui/Separator"
import { TextInput } from "@components/ui/TextInput"

export type NumberInputProps = {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onChange?: (value: number | undefined) => void
  format?: (value: number | undefined) => string
  parse?: (raw: string) => number | undefined
  allowUndefined?: boolean
  disabled?: boolean
  placeholder?: string
  style?: StyleProp<ViewStyle>
  insideBottomSheet?: boolean
}

const NumberInput = ({
  value,
  defaultValue,
  min,
  max,
  step = 1,
  onChange,
  format,
  parse,
  allowUndefined = true,
  disabled = false,
  placeholder,
  style,
  insideBottomSheet = false
}: NumberInputProps) => {
  const styles = useStyles(numberInputStyles)

  const animatedTheme = useAnimatedTheme()

  const borderFocused = useSharedValue(0)

  const [internalValue, setInternalValue] = useState<number | undefined>(defaultValue)

  const isControlled = value !== undefined
  const currentValue = isControlled ? value : internalValue

  const [displayValue, setDisplayValue] = useState<string>(() => {
    if (currentValue !== undefined) {
      return format ? format(currentValue) : String(currentValue)
    }
    return ""
  })

  const [isFocused, setIsFocused] = useState(false)

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      borderFocused.value,
      [0, 1],
      [String(animatedTheme.value.colors.input), String(animatedTheme.value.colors.primary)]
    )
  }))

  useEffect(() => {
    if (!isFocused && currentValue !== undefined) {
      const formatted = format ? format(currentValue) : String(currentValue)
      setDisplayValue(formatted)
    } else if (!isFocused && currentValue === undefined) {
      setDisplayValue("")
    }
  }, [currentValue, format, isFocused])

  const handleValueChange = useCallback(
    (newValue: number | undefined) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    },
    [isControlled, onChange]
  )

  const clampValue = useCallback(
    (val: number): number => {
      let clamped = val
      if (min !== undefined) clamped = Math.max(clamped, min)
      if (max !== undefined) clamped = Math.min(clamped, max)
      return clamped
    },
    [min, max]
  )

  const handleIncrement = useCallback(() => {
    if (disabled) return
    const current = currentValue ?? min ?? 0
    const newValue = clampValue(current + step)
    handleValueChange(newValue)
  }, [disabled, currentValue, min, step, clampValue, handleValueChange])

  const handleDecrement = useCallback(() => {
    if (disabled) return
    const current = currentValue ?? min ?? 0
    const newValue = clampValue(current - step)
    handleValueChange(newValue)
  }, [disabled, currentValue, min, step, clampValue, handleValueChange])

  const handleInputChange = useCallback(
    (text: string) => {
      setDisplayValue(text)

      if (text === "") {
        handleValueChange(undefined)
        return
      }

      const parsed = parse ? parse(text) : Number(text)

      if (typeof parsed === "number" && !isNaN(parsed)) {
        handleValueChange(parsed)
      }
    },
    [parse, handleValueChange]
  )

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    borderFocused.value = withTiming(1, { duration: durationTokens[300] })

    if (currentValue !== undefined) {
      setDisplayValue(String(currentValue))
    }
  }, [currentValue, borderFocused])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    borderFocused.value = withTiming(0, { duration: durationTokens[300] })

    if (displayValue === "") {
      handleValueChange(undefined)
      setDisplayValue("")
      return
    }

    const parsed = parse ? parse(displayValue) : Number(displayValue)

    if (typeof parsed === "number" && !isNaN(parsed)) {
      const clamped = clampValue(parsed)
      handleValueChange(clamped)

      const formatted = format ? format(clamped) : String(clamped)
      setDisplayValue(formatted)
    } else {
      if (currentValue !== undefined) {
        const formatted = format ? format(currentValue) : String(currentValue)
        setDisplayValue(formatted)
      } else if (!allowUndefined) {
        const fallback = min ?? 0
        handleValueChange(fallback)

        const formatted = format ? format(fallback) : String(fallback)
        setDisplayValue(formatted)
      } else {
        setDisplayValue("")
        handleValueChange(undefined)
      }
    }
  }, [
    displayValue,
    parse,
    clampValue,
    handleValueChange,
    format,
    currentValue,
    allowUndefined,
    min,
    borderFocused
  ])

  const canDecrement = !disabled && (min === undefined || (currentValue ?? 0) > min)
  const canIncrement = !disabled && (max === undefined || (currentValue ?? 0) < max)

  const Input = insideBottomSheet ? BottomSheetTextInput : TextInput

  return (
    <Animated.View style={[borderStyle, styles.container({ disabled }), style]}>
      <IconButton
        variant="ghost"
        name="Minus"
        onPress={handleDecrement}
        disabled={!canDecrement}
        style={styles.button}
      />
      <Separator orientation="vertical" />
      <Input
        value={displayValue}
        onChangeText={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onSubmitEditing={handleBlur}
        keyboardType="numeric"
        returnKeyType="done"
        placeholder={placeholder}
        disabled={disabled}
        {...(!insideBottomSheet && { disableBorderAnimation: true })}
        style={styles.input}
      />
      <Separator orientation="vertical" />
      <IconButton
        variant="ghost"
        name="Plus"
        onPress={handleIncrement}
        disabled={!canIncrement}
        style={styles.button}
      />
    </Animated.View>
  )
}

const numberInputStyles = createStyleSheet(({ theme }) => ({
  container: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      borderRadius: theme.radius(),
      borderWidth: theme.borderWidth(),
      borderColor: theme.colors.input,
      backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
      overflow: "hidden"
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
  button: {
    borderRadius: theme.radius("none")
  },
  input: {
    flex: 1,
    textAlign: "center",
    borderWidth: theme.borderWidth("none"),
    borderRadius: theme.radius("none"),
    backgroundColor: "transparent"
  }
}))

export { NumberInput }
