import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type RefObject
} from "react"

import { View, type GestureResponderEvent, type StyleProp, type ViewStyle } from "react-native"

import { createStyleSheet, createVariant, durationTokens, useStyles } from "@styles"

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import { useTranslation } from "@repo/i18n"

import { Badge } from "@components/ui/Badge"
import {
  BottomSheet,
  BottomSheetFlashList,
  BottomSheetScrollView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Checkbox } from "@components/ui/Checkbox"
import { Icon } from "@components/ui/Icon"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Separator } from "@components/ui/Separator"
import { Text, type TextProps } from "@components/ui/Text"

import { type FlashListProps } from "@shopify/flash-list"

type SelectContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  multiple: boolean
  value: string | string[] | undefined
  sheetRef: RefObject<BottomSheetRef | null>
  maxCount: number
  isSelected: (value: string) => boolean
  toggleValue: (value: string, closeOnSelect?: boolean) => void
  displayValues: Map<string, ReactNode>
  registerDisplayValue: (value: string, display: ReactNode) => void
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

type SelectSingleProps = {
  multiple?: false
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

type SelectMultipleProps = {
  multiple: true
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  maxCount?: number
}

export type SelectProps = (SelectSingleProps | SelectMultipleProps) & {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  ref?: React.Ref<BottomSheetRef>
}

const Select = (props: SelectProps) => {
  const { open: controlledOpen, onOpenChange, children, ref } = props

  const multiple = props.multiple === true
  const maxCount = multiple && "maxCount" in props ? (props.maxCount ?? 3) : 3

  const internalSheetRef = useRef<BottomSheetRef | null>(null)

  useImperativeHandle(ref, () => internalSheetRef.current as BottomSheetRef)

  const [internalOpen, setInternalOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    props.defaultValue
  )
  const [displayValues, setDisplayValues] = useState<Map<string, ReactNode>>(() => new Map())

  const isOpenControlled = controlledOpen !== undefined
  const isValueControlled = props.value !== undefined

  const open = isOpenControlled ? controlledOpen : internalOpen
  const value = isValueControlled ? props.value : internalValue

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(isOpen)
      }
      onOpenChange?.(isOpen)
    },
    [isOpenControlled, onOpenChange]
  )

  const isSelected = useCallback(
    (itemValue: string): boolean => {
      if (multiple) {
        return Array.isArray(value) && value.includes(itemValue)
      }
      return value === itemValue
    },
    [multiple, value]
  )

  const toggleValue = useCallback(
    (itemValue: string, closeOnSelect?: boolean) => {
      if (multiple) {
        const currentValues = Array.isArray(value) ? value : []
        const newValues = currentValues.includes(itemValue)
          ? currentValues.filter((v) => v !== itemValue)
          : [...currentValues, itemValue]

        if (!isValueControlled) {
          setInternalValue(newValues)
        }
        ;(props as SelectMultipleProps).onValueChange?.(newValues)
      } else {
        if (!isValueControlled) {
          setInternalValue(itemValue)
        }
        ;(props as SelectSingleProps).onValueChange?.(itemValue)

        if (closeOnSelect !== false) {
          handleOpenChange(false)
        }
      }
    },
    [multiple, value, isValueControlled, props, handleOpenChange]
  )

  const registerDisplayValue = useCallback((itemValue: string, display: ReactNode) => {
    setDisplayValues((prev) => {
      if (prev.get(itemValue) === display) return prev
      const next = new Map(prev)
      next.set(itemValue, display)
      return next
    })
  }, [])

  useEffect(() => {
    if (open) {
      internalSheetRef.current?.present()
    } else {
      internalSheetRef.current?.close()
    }
  }, [open])

  const contextValue = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      multiple,
      value,
      sheetRef: internalSheetRef,
      maxCount,
      isSelected,
      toggleValue,
      displayValues,
      registerDisplayValue
    }),
    [
      open,
      handleOpenChange,
      multiple,
      value,
      maxCount,
      isSelected,
      toggleValue,
      displayValues,
      registerDisplayValue
    ]
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

export type SelectValueProps = {
  placeholder?: string
  style?: StyleProp<ViewStyle>
}

const SelectValue = ({ placeholder, style }: SelectValueProps) => {
  const styles = useStyles(selectStyles)

  const { t } = useTranslation()

  const selectContext = useSelect()

  const multiple = selectContext?.multiple
  const value = selectContext?.value
  const maxCount = selectContext?.maxCount ?? 3
  const displayValues = selectContext?.displayValues

  if (multiple && Array.isArray(value) && value.length > 0) {
    const visibleValues = value.slice(0, maxCount)
    const extraCount = value.length - maxCount

    return (
      <View style={[styles.valueBadges, style]}>
        {visibleValues.map((val) => {
          const displayContent = displayValues?.get(val)
          const title = typeof displayContent === "string" ? displayContent : val

          return (
            <Badge
              key={val}
              variant="muted"
              title={title}
              style={styles.valueBadge}
              textProps={{ numberOfLines: 1 }}
            />
          )
        })}
        {extraCount > 0 && (
          <Badge
            variant="muted"
            title={`+ ${extraCount} ${t("common.more")}`}
            style={styles.valueBadge}
          />
        )}
      </View>
    )
  }

  const singleDisplayValue =
    !multiple && typeof value === "string" ? displayValues?.get(value) : undefined
  const displayContent = singleDisplayValue ?? placeholder
  const isTextContent = typeof displayContent === "string"

  const hasValue = !multiple ? !!value : false

  return (
    <View style={[styles.value, style]}>
      {isTextContent ? (
        <Text size="sm" color={hasValue ? "foreground" : "mutedForeground"} numberOfLines={1}>
          {displayContent}
        </Text>
      ) : (
        displayContent
      )}
    </View>
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

  if (typeof children === "function")
    return <Fragment>{children({ onPress: handlePress })}</Fragment>

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

export type SelectContentProps = Omit<BottomSheetProps, "ref"> & { virtualized?: boolean }

const SelectContent = ({
  children,
  onChange,
  virtualized = false,
  ...props
}: SelectContentProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelectRequired()

  const { sheetRef, onOpenChange } = selectContext

  const handleChange = useCallback(
    (index: number, position: number, type: SNAP_POINT_TYPE) => {
      if (index === -1) onOpenChange(false)
      onChange?.(index, position, type)
    },
    [onChange, onOpenChange]
  )

  return (
    <Fragment>
      {!virtualized && (
        <View style={styles.hiddenRegistration}>
          <SelectContext.Provider value={selectContext}>{children}</SelectContext.Provider>
        </View>
      )}
      <BottomSheet ref={sheetRef} onChange={handleChange} {...props}>
        {virtualized ? (
          <SelectContext.Provider value={selectContext}>{children}</SelectContext.Provider>
        ) : (
          <BottomSheetScrollView contentContainerStyle={styles.content}>
            <SelectContext.Provider value={selectContext}>{children}</SelectContext.Provider>
          </BottomSheetScrollView>
        )}
      </BottomSheet>
    </Fragment>
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

  const isSelected = selectContext?.isSelected(value) ?? false

  const progress = useSharedValue(isSelected ? 1 : 0)

  const displayContent = children ?? title

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: durationTokens[150] })
  }, [isSelected, progress])

  useEffect(() => {
    if (displayContent !== undefined) selectContext?.registerDisplayValue(value, displayContent)
  }, [displayContent, value, selectContext])

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      selectContext?.toggleValue(value, closeOnSelect)
      onPress?.(event)
    },
    [selectContext, value, closeOnSelect, onPress]
  )

  const checkAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1])
    const opacity = progress.value
    return { transform: [{ scale }], opacity }
  })

  return (
    <Pressable style={[styles.item, style]} onPress={handlePress} disabled={disabled} {...props}>
      {typeof displayContent === "string" ? (
        <Text size="sm">{displayContent}</Text>
      ) : (
        displayContent
      )}
      <View style={styles.checkContainer}>
        <Animated.View style={checkAnimatedStyle}>
          <Icon name="Check" size="sm" />
        </Animated.View>
      </View>
    </Pressable>
  )
}

export type SelectCheckboxItemProps = PressableProps & {
  value: string
  children?: ReactNode
  title?: string
}

const SelectCheckboxItem = ({
  value,
  children,
  title,
  onPress,
  disabled,
  style,
  ...props
}: SelectCheckboxItemProps) => {
  const styles = useStyles(selectStyles)

  const selectContext = useSelect()

  const isSelected = selectContext?.isSelected(value) ?? false

  const displayContent = children ?? title

  useEffect(() => {
    if (displayContent !== undefined) selectContext?.registerDisplayValue(value, displayContent)
  }, [displayContent, value, selectContext])

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      selectContext?.toggleValue(value, false)
      onPress?.(event)
    },
    [selectContext, value, onPress]
  )

  return (
    <Pressable
      style={[styles.checkboxItem, style]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <Checkbox checked={isSelected} disabled={disabled ?? undefined} />
      <View style={styles.checkboxItemContent}>
        {typeof displayContent === "string" ? (
          <Text size="sm">{displayContent}</Text>
        ) : (
          displayContent
        )}
      </View>
    </Pressable>
  )
}

export type SelectGroupHeaderProps = {
  children?: ReactNode
  title?: string
  style?: StyleProp<ViewStyle>
}

const SelectGroupHeader = ({ children, title, style }: SelectGroupHeaderProps) => {
  const styles = useStyles(selectStyles)

  const displayContent = children ?? title

  return (
    <View style={[styles.groupHeader, style]}>
      {typeof displayContent === "string" ? (
        <Text size="xs" color="mutedForeground" weight="medium">
          {displayContent}
        </Text>
      ) : (
        displayContent
      )}
    </View>
  )
}

export type SelectFlashListProps<T> = FlashListProps<T>

function SelectFlashList<T>({ contentContainerStyle, ...props }: SelectFlashListProps<T>) {
  const styles = useStyles(selectStyles)

  return (
    <BottomSheetFlashList<T>
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...props}
    />
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
  hiddenRegistration: {
    position: "absolute",
    opacity: 0,
    pointerEvents: "none",
    height: 0,
    overflow: "hidden"
  },
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
      size: { default: { minHeight: theme.space(9) }, sm: { minHeight: theme.space(8) } }
    },
    defaultVariants: { size: "default" }
  }),
  triggerContent: { flex: 1, flexDirection: "row", alignItems: "center", gap: theme.space(2) },
  value: { flex: 1 },
  valueBadges: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: theme.space(1)
  },
  valueBadge: { maxWidth: 120 },
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
  checkboxItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(3),
    borderRadius: theme.radius("sm"),
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(2)
  },
  checkboxItemContent: { flex: 1 },
  groupHeader: {
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(2),
    paddingTop: theme.space(3)
  },
  separator: {
    marginVertical: theme.space(1)
  }
}))

export {
  Select,
  SelectCheckboxItem,
  SelectContent,
  SelectFlashList,
  SelectGroup,
  SelectGroupHeader,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
}
