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
  type ComponentProps,
  type ReactElement,
  type ReactNode,
  type Ref,
  type RefObject
} from "react"

import {
  View,
  type FlatListProps,
  type GestureResponderEvent,
  type StyleProp,
  type ViewStyle
} from "react-native"

import { createStyleSheet, durationTokens, useStyles } from "@styles"

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import {
  BottomSheet,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetLegendList,
  BottomSheetScrollView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Button, type ButtonProps } from "@components/ui/Button"
import { Icon } from "@components/ui/Icon"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Separator } from "@components/ui/Separator"
import { Text, type TextProps } from "@components/ui/Text"

import { type FlashListProps } from "@shopify/flash-list"

import { type LegendListProps } from "@legendapp/list"

type DropdownMenuContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
  closeMenu: () => void
}

const DropdownMenuContext = createContext<DropdownMenuContextValue | undefined>(undefined)

function useDropdownMenu() {
  const context = useContext(DropdownMenuContext)

  return context
}

function useDropdownMenuRequired() {
  const context = useContext(DropdownMenuContext)

  if (!context) throw new Error("DropdownMenu components must be used within DropdownMenu")

  return context
}

type DropdownMenuRadioContextValue = {
  value: string | undefined
  onValueChange: (value: string) => void
}

const DropdownMenuRadioContext = createContext<DropdownMenuRadioContextValue | undefined>(undefined)

function useDropdownMenuRadio() {
  return useContext(DropdownMenuRadioContext)
}

export type DropdownMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  ref?: Ref<BottomSheetRef>
}

const DropdownMenu = ({ open: controlledOpen, onOpenChange, children, ref }: DropdownMenuProps) => {
  const internalSheetRef = useRef<BottomSheetRef | null>(null)

  useImperativeHandle(ref, () => internalSheetRef.current as BottomSheetRef)

  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(isOpen)
      }
      onOpenChange?.(isOpen)
    },
    [isControlled, onOpenChange]
  )

  const closeMenu = useCallback(() => {
    handleOpenChange(false)
  }, [handleOpenChange])

  useEffect(() => {
    if (open) {
      internalSheetRef.current?.present()
    } else {
      internalSheetRef.current?.close()
    }
  }, [open])

  const value = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      sheetRef: internalSheetRef,
      closeMenu
    }),
    [open, handleOpenChange, closeMenu]
  )

  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>
}

type DropdownMenuTriggerRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type DropdownMenuTriggerProps = ButtonProps & {
  children?: ReactNode | ((props: DropdownMenuTriggerRenderProps) => ReactNode)
  asChild?: boolean
}

const DropdownMenuTrigger = ({
  onPress,
  children,
  asChild,
  ...props
}: DropdownMenuTriggerProps) => {
  const dropdownContext = useDropdownMenu()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      dropdownContext?.onOpenChange(true)
      onPress?.(event)
    },
    [dropdownContext, onPress]
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
    <Button onPress={handlePress} {...props}>
      {children}
    </Button>
  )
}

const DropdownMenuPortal = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

export type DropdownMenuGroupProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const DropdownMenuGroup = ({ children, style }: DropdownMenuGroupProps) => {
  const styles = useStyles(dropdownMenuStyles)

  return <View style={[styles.group, style]}>{children}</View>
}

type DropdownMenuSubContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
}

const DropdownMenuSubContext = createContext<DropdownMenuSubContextValue | undefined>(undefined)

function useDropdownMenuSub() {
  return useContext(DropdownMenuSubContext)
}

function useDropdownMenuSubRequired() {
  const context = useContext(DropdownMenuSubContext)

  if (!context) throw new Error("DropdownMenuSub components must be used within DropdownMenuSub")

  return context
}

export type DropdownMenuSubProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const DropdownMenuSub = ({
  open: controlledOpen,
  onOpenChange,
  children
}: DropdownMenuSubProps) => {
  const sheetRef = useRef<BottomSheetRef | null>(null)

  const [internalOpen, setInternalOpen] = useState(false)

  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleOpenChange = useCallback(
    (isOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(isOpen)
      }
      onOpenChange?.(isOpen)
    },
    [isControlled, onOpenChange]
  )

  useEffect(() => {
    if (open) {
      sheetRef.current?.present()
    } else {
      sheetRef.current?.close()
    }
  }, [open])

  const value = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange,
      sheetRef
    }),
    [open, handleOpenChange]
  )

  return <DropdownMenuSubContext.Provider value={value}>{children}</DropdownMenuSubContext.Provider>
}

export type DropdownMenuSubTriggerProps = PressableProps & {
  inset?: boolean
  children?: ReactNode
  title?: string
}

const DropdownMenuSubTrigger = ({
  inset,
  children,
  title,
  style,
  onPress,
  ...props
}: DropdownMenuSubTriggerProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const subContext = useDropdownMenuSub()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      subContext?.onOpenChange(true)
      onPress?.(event)
    },
    [subContext, onPress]
  )

  return (
    <Pressable
      style={[styles.item, inset && styles.itemInset, style]}
      onPress={handlePress}
      {...props}
    >
      {children ? children : title ? <Text size="sm">{title}</Text> : null}
      <Icon name="ChevronRight" size="sm" color="mutedForeground" style={styles.itemIconRight} />
    </Pressable>
  )
}

export type DropdownMenuSubContentProps = Omit<BottomSheetProps, "ref"> & {
  scrollable?: boolean
}

const DropdownMenuSubContent = ({
  children,
  onChange,
  scrollable = false,
  ...props
}: DropdownMenuSubContentProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const subContext = useDropdownMenuSubRequired()

  const { sheetRef, onOpenChange: onSubOpenChange } = subContext

  const handleChange = useCallback(
    (index: number, position: number, type: SNAP_POINT_TYPE) => {
      if (index === -1) {
        onSubOpenChange(false)
      }
      onChange?.(index, position, type)
    },
    [onChange, onSubOpenChange]
  )

  const closeMenu = useCallback(() => {
    onSubOpenChange(false)
  }, [onSubOpenChange])

  const subContextValue = useMemo(
    (): DropdownMenuContextValue => ({
      open: subContext.open,
      onOpenChange: onSubOpenChange,
      sheetRef,
      closeMenu
    }),
    [subContext.open, onSubOpenChange, sheetRef, closeMenu]
  )

  return (
    <BottomSheet ref={sheetRef} onChange={handleChange} {...props}>
      {scrollable ? (
        <DropdownMenuContext.Provider value={subContextValue}>
          {children}
        </DropdownMenuContext.Provider>
      ) : (
        <BottomSheetScrollView contentContainerStyle={styles.content}>
          <DropdownMenuContext.Provider value={subContextValue}>
            {children}
          </DropdownMenuContext.Provider>
        </BottomSheetScrollView>
      )}
    </BottomSheet>
  )
}

export type DropdownMenuContentProps = Omit<BottomSheetProps, "ref"> & {
  scrollable?: boolean
}

const DropdownMenuContent = ({
  children,
  onChange,
  scrollable = false,
  ...props
}: DropdownMenuContentProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const dropdownContext = useDropdownMenuRequired()

  const { sheetRef, onOpenChange } = dropdownContext

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
      {scrollable ? (
        <DropdownMenuContext.Provider value={dropdownContext}>
          {children}
        </DropdownMenuContext.Provider>
      ) : (
        <BottomSheetScrollView contentContainerStyle={styles.content}>
          <DropdownMenuContext.Provider value={dropdownContext}>
            {children}
          </DropdownMenuContext.Provider>
        </BottomSheetScrollView>
      )}
    </BottomSheet>
  )
}

export type DropdownMenuItemProps = PressableProps & {
  inset?: boolean
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const DropdownMenuItem = ({
  inset,
  children,
  title,
  onPress,
  closeOnPress = true,
  disabled,
  style,
  ...props
}: DropdownMenuItemProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const dropdownContext = useDropdownMenu()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
      if (closeOnPress) {
        dropdownContext?.closeMenu()
      }
    },
    [closeOnPress, dropdownContext, onPress]
  )

  return (
    <Pressable
      style={[styles.item, inset && styles.itemInset, style]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      {children ? children : title ? <Text size="sm">{title}</Text> : null}
    </Pressable>
  )
}

export type DropdownMenuCheckboxItemProps = PressableProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const DropdownMenuCheckboxItem = ({
  checked = false,
  onCheckedChange,
  children,
  title,
  onPress,
  closeOnPress = false,
  disabled,
  style,
  ...props
}: DropdownMenuCheckboxItemProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const dropdownContext = useDropdownMenu()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onCheckedChange?.(!checked)
      onPress?.(event)
      if (closeOnPress) {
        dropdownContext?.closeMenu()
      }
    },
    [checked, closeOnPress, onCheckedChange, dropdownContext, onPress]
  )

  return (
    <Pressable
      style={[styles.item, styles.itemWithIndicator, style]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <View style={styles.indicatorContainer}>{checked && <Icon name="Check" size="sm" />}</View>
      {children ? children : title ? <Text size="sm">{title}</Text> : null}
    </Pressable>
  )
}

export type DropdownMenuRadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const DropdownMenuRadioGroup = ({
  value,
  onValueChange,
  children,
  style
}: DropdownMenuRadioGroupProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const contextValue = useMemo(
    () => ({
      value,
      onValueChange: onValueChange || (() => {})
    }),
    [value, onValueChange]
  )

  return (
    <DropdownMenuRadioContext.Provider value={contextValue}>
      <View style={[styles.group, style]}>{children}</View>
    </DropdownMenuRadioContext.Provider>
  )
}

export type DropdownMenuRadioItemProps = PressableProps & {
  value: string
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const DropdownMenuRadioItem = ({
  value,
  children,
  title,
  onPress,
  closeOnPress = false,
  disabled,
  style,
  ...props
}: DropdownMenuRadioItemProps) => {
  const styles = useStyles(dropdownMenuStyles)

  const dropdownContext = useDropdownMenu()

  const radioContext = useDropdownMenuRadio()

  const isSelected = radioContext?.value === value

  const progress = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    progress.value = withTiming(isSelected ? 1 : 0, { duration: durationTokens[150] })
  }, [isSelected, progress])

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      radioContext?.onValueChange(value)
      onPress?.(event)
      if (closeOnPress) {
        dropdownContext?.closeMenu()
      }
    },
    [closeOnPress, dropdownContext, onPress, radioContext, value]
  )

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
      style={[styles.item, styles.itemWithIndicator, style]}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      <View style={styles.indicatorContainer}>
        <Animated.View style={indicatorAnimatedStyle}>
          <Icon name="Circle" size="xs" isFilled />
        </Animated.View>
      </View>
      {children ? children : title ? <Text size="sm">{title}</Text> : null}
    </Pressable>
  )
}

export type DropdownMenuLabelProps = TextProps & {
  inset?: boolean
}

const DropdownMenuLabel = ({ inset, style, ...props }: DropdownMenuLabelProps) => {
  const styles = useStyles(dropdownMenuStyles)

  return (
    <Text
      size="sm"
      weight="medium"
      style={[styles.label, inset && styles.labelInset, style]}
      {...props}
    />
  )
}

export type DropdownMenuSeparatorProps = {
  style?: StyleProp<ViewStyle>
}

const DropdownMenuSeparator = ({ style }: DropdownMenuSeparatorProps) => {
  const styles = useStyles(dropdownMenuStyles)

  return <Separator style={[styles.separator, style]} />
}

export type DropdownMenuShortcutProps = TextProps

const DropdownMenuShortcut = ({ style, ...props }: DropdownMenuShortcutProps) => {
  const styles = useStyles(dropdownMenuStyles)

  return <Text size="xs" color="mutedForeground" style={[styles.shortcut, style]} {...props} />
}

export type DropdownMenuScrollViewProps = ComponentProps<typeof BottomSheetScrollView>

const DropdownMenuScrollView = (props: DropdownMenuScrollViewProps) => {
  return <BottomSheetScrollView {...props} />
}

export type DropdownMenuFlatListProps<T> = FlatListProps<T>

function DropdownMenuFlatList<T>(props: DropdownMenuFlatListProps<T>) {
  return <BottomSheetFlatList<T> {...props} />
}

export type DropdownMenuFlashListProps<T> = FlashListProps<T>

function DropdownMenuFlashList<T>(props: DropdownMenuFlashListProps<T>) {
  return <BottomSheetFlashList<T> {...props} />
}

export type DropdownMenuLegendListProps<T> = LegendListProps<T>

function DropdownMenuLegendList<T>(props: DropdownMenuLegendListProps<T>) {
  return <BottomSheetLegendList<T> {...props} />
}

const dropdownMenuStyles = createStyleSheet(({ theme, runtime }) => ({
  content: {
    paddingVertical: theme.space(1),
    paddingBottom: runtime.insets.bottom + theme.space(1)
  },
  group: {},
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space(2),
    borderRadius: theme.radius("sm"),
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(1.5)
  },
  itemInset: {
    paddingLeft: theme.space(8)
  },
  itemWithIndicator: {
    paddingLeft: theme.space(2)
  },
  itemIconRight: {
    marginLeft: "auto"
  },
  indicatorContainer: {
    width: theme.fontSize("sm"),
    height: theme.fontSize("sm"),
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    marginHorizontal: theme.space(1),
    paddingHorizontal: theme.space(2),
    paddingVertical: theme.space(1.5)
  },
  labelInset: {
    paddingLeft: theme.space(8)
  },
  separator: {
    marginVertical: theme.space(1)
  },
  shortcut: {
    marginLeft: "auto",
    letterSpacing: 0.5
  }
}))

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuFlashList,
  DropdownMenuFlatList,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLegendList,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuScrollView,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
}
