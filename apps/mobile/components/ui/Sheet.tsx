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

import { View, type FlatListProps, type GestureResponderEvent, type ViewProps } from "react-native"

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
import { Text, type TextProps } from "@components/ui/Text"

import { type FlashListProps } from "@shopify/flash-list"

import { type LegendListProps } from "@legendapp/list"

type SheetContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: RefObject<BottomSheetRef | null>
}

const SheetContext = createContext<SheetContextValue | undefined>(undefined)

function useSheet() {
  const context = useContext(SheetContext)

  return context
}

function useSheetRequired() {
  const context = useContext(SheetContext)

  if (!context) throw new Error("Sheet components must be used within Sheet")
  return context
}

export type SheetProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
  ref?: Ref<BottomSheetRef>
}

const Sheet = ({ open: controlledOpen, onOpenChange, children, ref }: SheetProps) => {
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

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
}

type SheetTriggerRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type SheetTriggerProps = ButtonProps & {
  children?: ReactNode | ((props: SheetTriggerRenderProps) => ReactNode)
  asChild?: boolean
}

const SheetTrigger = ({ onPress, children, asChild, ...props }: SheetTriggerProps) => {
  const sheetContext = useSheet()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      sheetContext?.onOpenChange(true)
      onPress?.(event)
    },
    [sheetContext, onPress]
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

const SheetPortal = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

type SheetCloseRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type SheetCloseProps = ButtonProps & {
  children?: ReactNode | ((props: SheetCloseRenderProps) => ReactNode)
  asChild?: boolean
}

const SheetClose = ({ onPress, children, asChild, ...props }: SheetCloseProps) => {
  const sheetContext = useSheet()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      sheetContext?.onOpenChange(false)
      onPress?.(event)
    },
    [sheetContext, onPress]
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

export type SheetContentProps = Omit<BottomSheetProps, "ref"> & {
  side?: "top" | "bottom" | "left" | "right"
}

const SheetContent = ({
  children,
  onChange,
  side = "bottom",
  enableDynamicSizing = true,
  ...props
}: SheetContentProps) => {
  const sheetContext = useSheetRequired()

  const { sheetRef, onOpenChange } = sheetContext

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
    <BottomSheet
      ref={sheetRef}
      onChange={handleChange}
      enableDynamicSizing={enableDynamicSizing}
      {...props}
    >
      <SheetContext.Provider value={sheetContext}>{children}</SheetContext.Provider>
    </BottomSheet>
  )
}

export type SheetViewProps = ViewProps

const SheetView = ({ children, style, ...props }: SheetViewProps) => {
  const styles = useStyles(sheetStyles)

  return (
    <BottomSheetView style={[styles.view, style]} {...props}>
      {children}
    </BottomSheetView>
  )
}

export type SheetScrollViewProps = ViewProps & {
  contentContainerStyle?: ViewProps["style"]
}

const SheetScrollView = ({ children, style, contentContainerStyle }: SheetScrollViewProps) => {
  const styles = useStyles(sheetStyles)

  return (
    <BottomSheetScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
    >
      {children}
    </BottomSheetScrollView>
  )
}

export type SheetFlatListProps<T> = FlatListProps<T>

function SheetFlatList<T>(props: SheetFlatListProps<T>) {
  return <BottomSheetFlatList<T> {...props} />
}

export type SheetFlashListProps<T> = FlashListProps<T>

function SheetFlashList<T>(props: SheetFlashListProps<T>) {
  return <BottomSheetFlashList<T> {...props} />
}

export type SheetLegendListProps<T> = LegendListProps<T>

function SheetLegendList<T>(props: SheetLegendListProps<T>) {
  return <BottomSheetLegendList<T> {...props} />
}

const SheetHeader = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(sheetStyles)

  return <View style={[styles.header, style]} {...props} />
}

const SheetFooter = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(sheetStyles)

  return <View style={[styles.footer, style]} {...props} />
}

const SheetTitle = ({ ...props }: TextProps) => {
  return <Text variant="h4" weight="semibold" {...props} />
}

const SheetDescription = ({ ...props }: TextProps) => {
  return <Text size="sm" color="mutedForeground" {...props} />
}

const sheetStyles = createStyleSheet(({ theme, runtime }) => ({
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
  },
  header: {
    gap: theme.space("sm"),
    paddingHorizontal: theme.space("lg"),
    paddingBottom: theme.space("lg")
  },
  footer: {
    flexDirection: "row",
    gap: theme.space(2),
    justifyContent: "flex-end",
    paddingHorizontal: theme.space("lg"),
    paddingTop: theme.space("lg")
  }
}))

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFlatList,
  SheetFlashList,
  SheetFooter,
  SheetHeader,
  SheetLegendList,
  SheetPortal,
  SheetScrollView,
  SheetTitle,
  SheetTrigger,
  SheetView
}
