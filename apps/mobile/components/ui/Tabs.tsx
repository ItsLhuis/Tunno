import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react"

import { View, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, durationTokens, useAnimatedTheme, useStyles } from "@styles"

import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { Pressable } from "@components/ui/Pressable"
import { type TextProps } from "@components/ui/Text"
import { Icon, type IconName } from "@components/ui/Icon"

type TabsContextValue = {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined)

function useTabs() {
  const context = useContext(TabsContext)

  if (!context) throw new Error("Tabs components must be used within Tabs")

  return context
}

export type TabsProps = {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const Tabs = ({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  children,
  style
}: TabsProps) => {
  const styles = useStyles(tabsStyles)

  const [internalValue, setInternalValue] = useState(defaultValue)

  const isControlled = controlledValue !== undefined
  const currentValue = isControlled ? controlledValue : internalValue

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isControlled, onValueChange]
  )

  const contextValue = useMemo(
    () => ({
      value: currentValue,
      onValueChange: handleValueChange
    }),
    [currentValue, handleValueChange]
  )

  return (
    <TabsContext.Provider value={contextValue}>
      <View style={[styles.container, style]}>{children}</View>
    </TabsContext.Provider>
  )
}

export type TabsListProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const TabsList = ({ children, style }: TabsListProps) => {
  const styles = useStyles(tabsStyles)

  return (
    <View style={[styles.list, style]} accessibilityRole="tablist">
      {children}
    </View>
  )
}

export type TabsTriggerProps = {
  value: string
  disabled?: boolean
  children?: ReactNode
  title?: string
  icon?: IconName
  style?: StyleProp<ViewStyle>
  textProps?: TextProps
}

const TabsTrigger = ({
  value,
  disabled = false,
  children,
  title,
  icon,
  style,
  textProps
}: TabsTriggerProps) => {
  const styles = useStyles(tabsStyles)

  const animatedTheme = useAnimatedTheme()

  const { value: currentValue, onValueChange } = useTabs()

  const isActive = currentValue === value
  const progress = useSharedValue(isActive ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isActive ? 1 : 0, { duration: durationTokens[150] })
  }, [isActive, progress])

  const handlePress = useCallback(() => {
    if (disabled) return
    onValueChange(value)
  }, [disabled, onValueChange, value])

  const triggerAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", theme.colors.primary]
    )

    return {
      backgroundColor
    }
  })

  const textAnimatedStyle = useAnimatedStyle(() => {
    const theme = animatedTheme.value

    const color = interpolateColor(
      progress.value,
      [0, 1],
      [theme.colors.mutedForeground, theme.colors.primaryForeground]
    )

    return {
      color
    }
  })

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      accessibilityRole="tab"
      accessibilityState={{ selected: isActive, disabled }}
      style={style}
    >
      <Animated.View style={[styles.trigger, triggerAnimatedStyle]}>
        {icon ? (
          <Icon name={icon} color={isActive ? "primaryForeground" : "mutedForeground"} />
        ) : title ? (
          <Animated.Text
            style={[styles.triggerText, textAnimatedStyle, textProps?.style]}
            {...textProps}
          >
            {title}
          </Animated.Text>
        ) : children ? (
          children
        ) : null}
      </Animated.View>
    </Pressable>
  )
}

export type TabsContentProps = {
  value: string
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const TabsContent = ({ value, children, style }: TabsContentProps) => {
  const styles = useStyles(tabsStyles)

  const { value: currentValue } = useTabs()

  if (currentValue !== value) {
    return null
  }

  return <View style={[styles.content, style]}>{children}</View>
}

const tabsStyles = createStyleSheet(({ theme }) => ({
  container: {
    gap: theme.space(2)
  },
  list: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
    borderRadius: theme.radius(),
    borderWidth: theme.borderWidth(),
    borderColor: theme.colors.input,
    padding: theme.space(0.75),
    alignSelf: "flex-start"
  },
  trigger: {
    padding: theme.space(2.75),
    borderRadius: theme.radius(),
    alignItems: "center",
    justifyContent: "center"
  },
  triggerText: {
    fontSize: theme.fontSize("sm"),
    fontFamily: "SpaceGrotesk-Medium"
  },
  content: {
    flex: 1
  }
}))

export { Tabs, TabsContent, TabsList, TabsTrigger }
