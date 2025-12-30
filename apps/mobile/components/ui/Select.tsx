import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject
} from "react"

import { View, type GestureResponderEvent, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, createVariant, durationTokens, useStyles } from "@styles"

import { type BottomSheetRef, type SNAP_POINT_TYPE } from "@components/ui/BottomSheet"

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import {
  BottomSheet,
  BottomSheetScrollView,
  type BottomSheetProps
} from "@components/ui/BottomSheet"
import { Icon } from "@components/ui/Icon"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Separator } from "@components/ui/Separator"
import { Text, type TextProps } from "@components/ui/Text"

type SelectContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  value: string | undefined
  onValueChange: (value: string) => void
  sheetRef: RefObject<BottomSheetRef | null>
}

const SelectContext = createContext<SelectContextValue | undefined>(undefined)

function useSelect() {
  const context = useContext(SelectContext)

  return context
}

function useSelectRequired() {
  const context = useContext(SelectContext)

  if (!context) throw new Error("Select components must be used within Select")

  return context
}

export type SelectProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: ReactNode
}

const Select = ({
  open: controlledOpen,
  onOpenChange,
  value: controlledValue,
  defaultValue,
  onValueChange,
  children
}: SelectProps) => {
  const sheetRef = useRef<BottomSheetRef | null>(null)

  const [internalOpen, setInternalOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(defaultValue)

  const isOpenControlled = controlledOpen !== undefined
  const isValueControlled = controlledValue !== undefined

  const open = isOpenControlled ? controlledOpen : internalOpen
  const value = isValueControlled ? controlledValue : internalValue

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(isOpen)
      }
      onOpenChange?.(isOpen)
    },
    [isOpenControlled, onOpenChange]
  )

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isValueControlled) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    },
    [isValueControlled, onValueChange]
  )

  useEffect(() => {
    if (open) {
      sheetRef.current?.present()
    } else {
      sheetRef.current?.close()
    }
  }, [open])

  const contextValue = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      value,
      onValueChange: handleValueChange,
      sheetRef
    }),
    [open, handleOpenChange, value, handleValueChange]
  )

  return <SelectContext.Provider value={contextValue}>{children}</SelectContext.Provider>
}

export type SelectGroupProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const SelectGroup = ({ children, style }: SelectGroupProps) => {
  return <View style={style}>{children}</View>
}

type SelectValueContextValue = {
  displayValue: string | undefined
  setDisplayValue: (value: string | undefined) => void
}

const SelectValueContext = createContext<SelectValueContextValue | undefined>(undefined)

export type SelectValueProps = {
  placeholder?: string
  style?: StyleProp<ViewStyle>
}

const SelectValue = ({ placeholder, style }: SelectValueProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelect()

  const valueContext = useContext(SelectValueContext)

  const value = selectContext?.value
  const displayText = valueContext?.displayValue || value || placeholder

  return (
    <Text
      size="sm"
      color={value ? "foreground" : "mutedForeground"}
      style={[styles.value, style]}
      numberOfLines={1}
    >
      {displayText}
    </Text>
  )
}

type SelectTriggerRenderProps = {
  onPress: (e: GestureResponderEvent) => void
}

export type SelectTriggerProps = Omit<PressableProps, "children"> & {
  size?: "sm" | "default"
  children?: ReactNode | ((props: SelectTriggerRenderProps) => ReactNode)
  asChild?: boolean
}

const SelectTrigger = ({
  size = "default",
  children,
  asChild,
  style,
  ...props
}: SelectTriggerProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelect()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      selectContext?.onOpenChange(true)
      props.onPress?.(event)
    },
    [selectContext, props]
  )

  if (typeof children === "function") {
    return <Fragment>{children({ onPress: handlePress })}</Fragment>
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onPress?: typeof handlePress }>, {
      onPress: handlePress
    })
  }

  return (
    <Pressable style={[styles.trigger({ size }), style]} onPress={handlePress} {...props}>
      <View style={styles.triggerContent}>{children}</View>
      <Icon name="ChevronDown" size="sm" color="mutedForeground" />
    </Pressable>
  )
}

const SelectScrollUpButton = () => {
  return null
}

const SelectScrollDownButton = () => {
  return null
}

export type SelectContentProps = Omit<BottomSheetProps, "ref">

const SelectContent = ({ children, onChange, ...props }: SelectContentProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelectRequired()

  const { sheetRef, onOpenChange } = selectContext

  const handleChange = useCallback(
    (index: number, position: number, type: SNAP_POINT_TYPE) => {
      if (index === -1) {
        onOpenChange(false)
      }
      onChange?.(index, position, type)
    },
    [onChange, onOpenChange]
  )

  return (
    <BottomSheet ref={sheetRef} onChange={handleChange} {...props}>
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <SelectContext.Provider value={selectContext}>{children}</SelectContext.Provider>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export type SelectLabelProps = TextProps

const SelectLabel = ({ style, ...props }: SelectLabelProps) => {
  const styles = useStyles(selectStyles)

  return <Text size="xs" color="mutedForeground" style={[styles.label, style]} {...props} />
}

export type SelectItemProps = PressableProps & {
  value: string
  children?: ReactNode
  title?: string
  closeOnSelect?: boolean
}

const SelectItem = ({
  value,
  children,
  title,
  onPress,
  closeOnSelect = true,
  disabled,
  style,
  ...props
}: SelectItemProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelect()

  const selectedValue = selectContext?.value
  const isSelected = selectedValue === value

  const progress = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: durationTokens[150] })
  }, [isSelected, progress])

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      selectContext?.onValueChange(value)
      onPress?.(event)
      if (closeOnSelect) {
        selectContext?.onOpenChange(false)
      }
    },
    [closeOnSelect, selectContext, onPress, value]
  )

  const checkAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1])
    const opacity = progress.value

    return {
      transform: [{ scale }],
      opacity
    }
  })

  return (
    <Pressable style={[styles.item, style]} onPress={handlePress} disabled={disabled} {...props}>
      {children ? children : title ? <Text size="sm">{title}</Text> : null}
      <View style={styles.checkContainer}>
        <Animated.View style={checkAnimatedStyle}>
          <Icon name="Check" size="sm" />
        </Animated.View>
      </View>
    </Pressable>
  )
}

export type SelectSeparatorProps = {
  style?: StyleProp<ViewStyle>
}

const SelectSeparator = ({ style }: SelectSeparatorProps) => {
  const styles = useStyles(selectStyles)

  return <Separator style={[styles.separator, style]} />
}

const selectStyles = createStyleSheet(({ theme, runtime }) => ({
  trigger: createVariant({
    base: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: theme.space(2),
      borderRadius: theme.radius(),
      borderWidth: theme.borderWidth(),
      borderColor: theme.colors.input,
      backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
      paddingHorizontal: theme.space(3),
      paddingVertical: theme.space(2)
    },
    variants: {
      size: {
        default: {
          minHeight: theme.space(9)
        },
        sm: {
          minHeight: theme.space(8)
        }
      }
    },
    defaultVariants: {
      size: "default"
    }
  }),
  triggerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2)
  },
  value: {
    flex: 1
  },
  content: {
    paddingVertical: theme.space(1),
    paddingBottom: runtime.insets.bottom + theme.space(1)
  },
  label: {
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(1.5)
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2),
    borderRadius: theme.radius("sm"),
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(1.5),
    paddingRight: theme.space(8)
  },
  checkContainer: {
    position: "absolute",
    right: theme.space(2),
    width: theme.fontSize("sm"),
    height: theme.fontSize("sm"),
    alignItems: "center",
    justifyContent: "center"
  },
  separator: {
    marginVertical: theme.space(1)
  }
}))

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
