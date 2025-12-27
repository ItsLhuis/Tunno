import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  createVariant,
  durationTokens,
  useAnimatedTheme,
  useStyles,
  type StyleVariants
} from "@styles"

import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Text, type TextProps } from "@components/ui/Text"

type ChoiceboxContextValue = {
  value: string | undefined
  onValueChange: (value: string) => void
  disabled: boolean
}

const ChoiceboxContext = createContext<ChoiceboxContextValue | undefined>(undefined)

function useChoicebox() {
  const context = useContext(ChoiceboxContext)

  if (!context) throw new Error("Choicebox components must be used within Choicebox")

  return context
}

export type ChoiceboxProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  disabled?: boolean
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const Choicebox = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
  children,
  style
}: ChoiceboxProps) => {
  const styles = useStyles(choiceboxStyles)

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
    <ChoiceboxContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </ChoiceboxContext.Provider>
  )
}

export type ChoiceboxItemProps = Omit<PressableProps, "children"> &
  StyleVariants<typeof choiceboxStyles, "item"> & {
    value: string
    disabled?: boolean
    children?: ReactNode
  }

const ChoiceboxItem = ({
  value,
  variant = "outline",
  disabled: itemDisabled = false,
  children,
  style,
  ...props
}: ChoiceboxItemProps) => {
  const styles = useStyles(choiceboxStyles)

  const animatedTheme = useAnimatedTheme()

  const { value: groupValue, onValueChange, disabled: groupDisabled } = useChoicebox()

  const isSelected = groupValue === value
  const isDisabled = groupDisabled || itemDisabled

  const progress = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: durationTokens[150] })
  }, [isSelected, progress])

  const handlePress = useCallback(() => {
    if (isDisabled) return
    onValueChange(value)
  }, [isDisabled, onValueChange, value])

  const cardAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.input, theme.colors.primary]
    )

    return {
      borderColor
    }
  })

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: isSelected, disabled: isDisabled }}
      {...props}
    >
      <Animated.View
        style={[
          styles.item({ variant }),
          cardAnimatedStyle,
          isDisabled && styles.itemDisabled,
          style
        ]}
      >
        {children}
      </Animated.View>
    </Pressable>
  )
}

export type ChoiceboxItemHeaderProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ChoiceboxItemHeader = ({ children, style }: ChoiceboxItemHeaderProps) => {
  const styles = useStyles(choiceboxStyles)

  return <View style={[styles.itemHeader, style]}>{children}</View>
}

export type ChoiceboxItemTitleProps = TextProps

const ChoiceboxItemTitle = ({ style, ...props }: ChoiceboxItemTitleProps) => {
  const styles = useStyles(choiceboxStyles)

  return <Text size="sm" weight="medium" style={[styles.itemTitle, style]} {...props} />
}

export type ChoiceboxItemSubtitleProps = TextProps

const ChoiceboxItemSubtitle = ({ style, ...props }: ChoiceboxItemSubtitleProps) => {
  return <Text size="xs" color="mutedForeground" weight="normal" style={style} {...props} />
}

export type ChoiceboxItemDescriptionProps = TextProps

const ChoiceboxItemDescription = ({ style, ...props }: ChoiceboxItemDescriptionProps) => {
  return <Text size="sm" color="mutedForeground" weight="normal" style={style} {...props} />
}

export type ChoiceboxItemContentProps = {
  children?: ReactNode
  style?: StyleProp<ViewStyle>
}

const ChoiceboxItemContent = ({ children, style }: ChoiceboxItemContentProps) => {
  const styles = useStyles(choiceboxStyles)

  return <View style={[styles.itemContent, style]}>{children}</View>
}

const INDICATOR_SIZE = 16
const INDICATOR_DOT_SIZE = 8

export type ChoiceboxItemIndicatorProps = {
  value: string
  style?: StyleProp<ViewStyle>
}

const ChoiceboxItemIndicator = ({ value, style }: ChoiceboxItemIndicatorProps) => {
  const styles = useStyles(choiceboxStyles)

  const animatedTheme = useAnimatedTheme()

  const { value: groupValue } = useChoicebox()

  const isSelected = groupValue === value

  const progress = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: durationTokens[150] })
  }, [isSelected, progress])

  const circleAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.input, theme.colors.primary]
    )

    return {
      borderColor
    }
  })

  const dotAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1])
    const opacity = progress.value

    return {
      transform: [{ scale }],
      opacity
    }
  })

  return (
    <Animated.View style={[styles.indicator, circleAnimatedStyle, style]}>
      <Animated.View style={[styles.indicatorDot, dotAnimatedStyle]} />
    </Animated.View>
  )
}

const choiceboxStyles = createStyleSheet(({ theme }) => ({
  container: {
    gap: theme.space(2),
    width: "100%"
  },
  item: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderRadius: theme.radius(),
      padding: theme.space(3),
      borderWidth: theme.borderWidth()
    },
    variants: {
      variant: {
        outline: {
          backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
          borderColor: theme.colors.input
        },
        default: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary
        },
        secondary: {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary
        },
        ghost: {
          backgroundColor: "transparent",
          borderColor: "transparent"
        }
      }
    },
    defaultVariants: {
      variant: "outline"
    }
  }),
  itemDisabled: {
    opacity: theme.opacity(50)
  },
  itemHeader: {
    flex: 1,
    gap: theme.space(0.5)
  },
  itemTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2)
  },
  itemContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    borderRadius: INDICATOR_SIZE / 2,
    borderWidth: theme.borderWidth(),
    alignItems: "center",
    justifyContent: "center"
  },
  indicatorDot: {
    width: INDICATOR_DOT_SIZE,
    height: INDICATOR_DOT_SIZE,
    borderRadius: INDICATOR_DOT_SIZE / 2,
    backgroundColor: theme.colors.primary
  }
}))

export {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle
}
