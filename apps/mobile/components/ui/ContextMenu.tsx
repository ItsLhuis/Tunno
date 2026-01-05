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

import {
  Pressable as RNPressable,
  View,
  type GestureResponderEvent,
  type PressableProps as RNPressableProps,
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
  BottomSheetScrollView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Icon } from "@components/ui/Icon"
import { Pressable, type PressableProps } from "@components/ui/Pressable"
import { Separator } from "@components/ui/Separator"
import { Text, type TextProps } from "@components/ui/Text"

type ContextMenuContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
  closeMenu: () => void
}

const ContextMenuContext = createContext<ContextMenuContextValue | undefined>(undefined)

function useContextMenu() {
  const context = useContext(ContextMenuContext)

  return context
}

function useContextMenuRequired() {
  const context = useContext(ContextMenuContext)

  if (!context) throw new Error("ContextMenu components must be used within ContextMenu")

  return context
}

type ContextMenuRadioContextValue = {
  value: string | undefined
  onValueChange: (value: string) => void
}

const ContextMenuRadioContext = createContext<ContextMenuRadioContextValue | undefined>(undefined)

function useContextMenuRadio() {
  return useContext(ContextMenuRadioContext)
}

export type ContextMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  ref?: React.Ref<BottomSheetRef>
}

const ContextMenu = ({ open: controlledOpen, onOpenChange, children, ref }: ContextMenuProps) => {
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

  return <ContextMenuContext.Provider value={value}>{children}</ContextMenuContext.Provider>
}

type ContextMenuTriggerRenderProps = {
  onLongPress: (e: GestureResponderEvent) => void
}

export type ContextMenuTriggerProps = Omit<RNPressableProps, "onLongPress" | "children"> & {
  children?: ReactNode | ((props: ContextMenuTriggerRenderProps) => ReactNode)
  asChild?: boolean
  onLongPress?: (event: GestureResponderEvent) => void
}

const ContextMenuTrigger = ({
  onLongPress,
  children,
  asChild,
  style,
  ...props
}: ContextMenuTriggerProps) => {
  const contextMenuContext = useContextMenu()

  const handleLongPress = useCallback(
    (event: GestureResponderEvent) => {
      contextMenuContext?.onOpenChange(true)
      onLongPress?.(event)
    },
    [contextMenuContext, onLongPress]
  )

  if (typeof children === "function") {
    return <Fragment>{children({ onLongPress: handleLongPress })}</Fragment>
  }

  if (asChild && isValidElement(children)) {
    return cloneElement(children as ReactElement<{ onLongPress?: typeof handleLongPress }>, {
      onLongPress: handleLongPress
    })
  }

  return (
    <RNPressable onLongPress={handleLongPress} style={style} {...props}>
      {children}
    </RNPressable>
  )
}

const ContextMenuPortal = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

export type ContextMenuGroupProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ContextMenuGroup = ({ children, style }: ContextMenuGroupProps) => {
  const styles = useStyles(contextMenuStyles)

  return <View style={[styles.group, style]}>{children}</View>
}

type ContextMenuSubContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
}

const ContextMenuSubContext = createContext<ContextMenuSubContextValue | undefined>(undefined)

function useContextMenuSub() {
  return useContext(ContextMenuSubContext)
}

function useContextMenuSubRequired() {
  const context = useContext(ContextMenuSubContext)

  if (!context) throw new Error("ContextMenuSub components must be used within ContextMenuSub")

  return context
}

export type ContextMenuSubProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const ContextMenuSub = ({ open: controlledOpen, onOpenChange, children }: ContextMenuSubProps) => {
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

  return <ContextMenuSubContext.Provider value={value}>{children}</ContextMenuSubContext.Provider>
}

export type ContextMenuSubTriggerProps = PressableProps & {
  inset?: boolean
  children?: ReactNode
  title?: string
}

const ContextMenuSubTrigger = ({
  inset,
  children,
  title,
  style,
  onPress,
  ...props
}: ContextMenuSubTriggerProps) => {
  const styles = useStyles(contextMenuStyles)

  const subContext = useContextMenuSub()

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

export type ContextMenuSubContentProps = Omit<BottomSheetProps, "ref">

const ContextMenuSubContent = ({ children, onChange, ...props }: ContextMenuSubContentProps) => {
  const styles = useStyles(contextMenuStyles)

  const subContext = useContextMenuSubRequired()

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
    (): ContextMenuContextValue => ({
      open: subContext.open,
      onOpenChange: onSubOpenChange,
      sheetRef,
      closeMenu
    }),
    [subContext.open, onSubOpenChange, sheetRef, closeMenu]
  )

  return (
    <BottomSheet ref={sheetRef} onChange={handleChange} {...props}>
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <ContextMenuContext.Provider value={subContextValue}>
          {children}
        </ContextMenuContext.Provider>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export type ContextMenuContentProps = Omit<BottomSheetProps, "ref">

const ContextMenuContent = ({ children, onChange, ...props }: ContextMenuContentProps) => {
  const styles = useStyles(contextMenuStyles)

  const contextMenuContext = useContextMenuRequired()

  const { sheetRef, onOpenChange } = contextMenuContext

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
        <ContextMenuContext.Provider value={contextMenuContext}>
          {children}
        </ContextMenuContext.Provider>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

export type ContextMenuItemProps = PressableProps & {
  inset?: boolean
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const ContextMenuItem = ({
  inset,
  children,
  title,
  onPress,
  closeOnPress = true,
  disabled,
  style,
  ...props
}: ContextMenuItemProps) => {
  const styles = useStyles(contextMenuStyles)

  const contextMenuContext = useContextMenu()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onPress?.(event)
      if (closeOnPress) {
        contextMenuContext?.closeMenu()
      }
    },
    [closeOnPress, contextMenuContext, onPress]
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

export type ContextMenuCheckboxItemProps = PressableProps & {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const ContextMenuCheckboxItem = ({
  checked = false,
  onCheckedChange,
  children,
  title,
  onPress,
  closeOnPress = false,
  disabled,
  style,
  ...props
}: ContextMenuCheckboxItemProps) => {
  const styles = useStyles(contextMenuStyles)

  const contextMenuContext = useContextMenu()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onCheckedChange?.(!checked)
      onPress?.(event)
      if (closeOnPress) {
        contextMenuContext?.closeMenu()
      }
    },
    [checked, closeOnPress, onCheckedChange, contextMenuContext, onPress]
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

export type ContextMenuRadioGroupProps = {
  value?: string
  onValueChange?: (value: string) => void
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const ContextMenuRadioGroup = ({
  value,
  onValueChange,
  children,
  style
}: ContextMenuRadioGroupProps) => {
  const styles = useStyles(contextMenuStyles)

  const contextValue = useMemo(
    () => ({
      value,
      onValueChange: onValueChange || (() => {})
    }),
    [value, onValueChange]
  )

  return (
    <ContextMenuRadioContext.Provider value={contextValue}>
      <View style={[styles.group, style]}>{children}</View>
    </ContextMenuRadioContext.Provider>
  )
}

export type ContextMenuRadioItemProps = PressableProps & {
  value: string
  children?: ReactNode
  title?: string
  closeOnPress?: boolean
}

const ContextMenuRadioItem = ({
  value,
  children,
  title,
  onPress,
  closeOnPress = false,
  disabled,
  style,
  ...props
}: ContextMenuRadioItemProps) => {
  const styles = useStyles(contextMenuStyles)

  const contextMenuContext = useContextMenu()

  const radioContext = useContextMenuRadio()

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
        contextMenuContext?.closeMenu()
      }
    },
    [closeOnPress, contextMenuContext, onPress, radioContext, value]
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

export type ContextMenuLabelProps = TextProps & {
  inset?: boolean
}

const ContextMenuLabel = ({ inset, style, ...props }: ContextMenuLabelProps) => {
  const styles = useStyles(contextMenuStyles)

  return (
    <Text
      size="sm"
      weight="medium"
      style={[styles.label, inset && styles.labelInset, style]}
      {...props}
    />
  )
}

export type ContextMenuSeparatorProps = {
  style?: StyleProp<ViewStyle>
}

const ContextMenuSeparator = ({ style }: ContextMenuSeparatorProps) => {
  const styles = useStyles(contextMenuStyles)

  return <Separator style={[styles.separator, style]} />
}

export type ContextMenuShortcutProps = TextProps

const ContextMenuShortcut = ({ style, ...props }: ContextMenuShortcutProps) => {
  const styles = useStyles(contextMenuStyles)

  return <Text size="xs" color="mutedForeground" style={[styles.shortcut, style]} {...props} />
}

const contextMenuStyles = createStyleSheet(({ theme, runtime }) => ({
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
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger
}
