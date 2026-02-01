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
  type Ref,
  type RefObject
} from "react"

import { type FlatListProps, type GestureResponderEvent, type ViewProps } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import {
  BottomSheet,
  BottomSheetFlatList,
  BottomSheetFlashList,
  BottomSheetLegendList,
  BottomSheetScrollView,
  BottomSheetView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Button, type ButtonProps } from "@components/ui/Button"

import { type FlashListProps } from "@shopify/flash-list"

import { type LegendListProps } from "@legendapp/list"

type PopoverContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
}

const PopoverContext = createContext<PopoverContextValue | undefined>(undefined)

function usePopover() {
  const context = useContext(PopoverContext)

  return context
}

function usePopoverRequired() {
  const context = useContext(PopoverContext)

  if (!context) throw new Error("Popover components must be used within Popover")

  return context
}

export type PopoverProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  ref?: Ref<BottomSheetRef>
}

const Popover = ({ open: controlledOpen, onOpenChange, children, ref }: PopoverProps) => {
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
      sheetRef: internalSheetRef
    }),
    [open, handleOpenChange]
  )

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
}

type PopoverTriggerRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type PopoverTriggerProps = ButtonProps & {
  children?: ReactNode | ((props: PopoverTriggerRenderProps) => ReactNode)
  asChild?: boolean
}

const PopoverTrigger = ({ onPress, children, asChild, ...props }: PopoverTriggerProps) => {
  const popoverContext = usePopover()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      popoverContext?.onOpenChange(true)
      onPress?.(event)
    },
    [popoverContext, onPress]
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

const PopoverAnchor = ({ children }: { children: ReactNode }) => {
  return children
}

type PopoverCloseRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type PopoverCloseProps = ButtonProps & {
  children?: ReactNode | ((props: PopoverCloseRenderProps) => ReactNode)
  asChild?: boolean
}

const PopoverClose = ({ onPress, children, asChild, ...props }: PopoverCloseProps) => {
  const popoverContext = usePopover()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      popoverContext?.onOpenChange(false)
      onPress?.(event)
    },
    [popoverContext, onPress]
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

export type PopoverContentProps = Omit<BottomSheetProps, "ref">

const PopoverContent = ({ children, onChange, ...props }: PopoverContentProps) => {
  const popoverContext = usePopoverRequired()

  const { sheetRef, onOpenChange } = popoverContext

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
      <PopoverContext.Provider value={popoverContext}>{children}</PopoverContext.Provider>
    </BottomSheet>
  )
}

export type PopoverViewProps = ViewProps

const PopoverView = ({ children, style, ...props }: PopoverViewProps) => {
  const styles = useStyles(popoverStyles)

  return (
    <BottomSheetView style={[styles.view, style]} {...props}>
      {children}
    </BottomSheetView>
  )
}

export type PopoverScrollViewProps = ViewProps & {
  contentContainerStyle?: ViewProps["style"]
}

const PopoverScrollView = ({ children, style, contentContainerStyle }: PopoverScrollViewProps) => {
  const styles = useStyles(popoverStyles)

  return (
    <BottomSheetScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
    >
      {children}
    </BottomSheetScrollView>
  )
}

export type PopoverFlatListProps<T> = FlatListProps<T>

function PopoverFlatList<T>(props: PopoverFlatListProps<T>) {
  return <BottomSheetFlatList<T> {...props} />
}

export type PopoverFlashListProps<T> = FlashListProps<T>

function PopoverFlashList<T>(props: PopoverFlashListProps<T>) {
  return <BottomSheetFlashList<T> {...props} />
}

export type PopoverLegendListProps<T> = LegendListProps<T>

function PopoverLegendList<T>(props: PopoverLegendListProps<T>) {
  return <BottomSheetLegendList<T> {...props} />
}

const popoverStyles = createStyleSheet(({ theme, runtime }) => ({
  view: {
    flex: 1,
    gap: theme.space("lg"),
    paddingBottom: runtime.insets.bottom
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    gap: theme.space("lg"),
    paddingBottom: runtime.insets.bottom
  }
}))

export {
  Popover,
  PopoverAnchor,
  PopoverClose,
  PopoverContent,
  PopoverFlatList,
  PopoverFlashList,
  PopoverLegendList,
  PopoverScrollView,
  PopoverTrigger,
  PopoverView
}
