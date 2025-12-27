import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject
} from "react"

import { View, type GestureResponderEvent, type ViewProps } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import {
  BottomSheet,
  BottomSheetView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Button, type ButtonProps } from "@components/ui/Button"
import { IconButton } from "@components/ui/IconButton"
import { Text, type TextProps } from "@components/ui/Text"

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
}

const Sheet = ({ open: controlledOpen, onOpenChange, children }: SheetProps) => {
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

  return <SheetContext.Provider value={value}>{children}</SheetContext.Provider>
}

export type SheetTriggerProps = ButtonProps

const SheetTrigger = ({ onPress, ...props }: SheetTriggerProps) => {
  const sheetContext = useSheet()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      sheetContext?.onOpenChange(true)
      onPress?.(event)
    },
    [sheetContext, onPress]
  )

  return <Button onPress={handlePress} {...props} />
}

const SheetPortal = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

export type SheetCloseProps = ButtonProps & {
  onClose?: () => void
}

const SheetClose = ({ onPress, onClose, ...props }: SheetCloseProps) => {
  const context = useContext(SheetContext)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (context) {
        context.onOpenChange(false)
      } else if (onClose) {
        onClose()
      }
      onPress?.(event)
    },
    [context, onClose, onPress]
  )

  return <Button onPress={handlePress} {...props} />
}

const SheetOverlay = () => {
  return null
}

export type SheetContentProps = Omit<BottomSheetProps, "ref"> & {
  side?: "top" | "bottom" | "left" | "right"
}

const SheetContent = ({ children, onChange, side = "bottom", ...props }: SheetContentProps) => {
  const styles = useStyles(sheetStyles)

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
    <BottomSheet ref={sheetRef} onChange={handleChange} {...props}>
      <BottomSheetView style={styles.contentContainer}>
        <SheetContext.Provider value={sheetContext}>
          <View style={styles.closeButtonContainer}>
            <SheetClose variant="ghost" size="icon">
              <IconButton name="X" variant="ghost" />
            </SheetClose>
          </View>
          {children}
        </SheetContext.Provider>
      </BottomSheetView>
    </BottomSheet>
  )
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

const sheetStyles = createStyleSheet(({ theme }) => ({
  contentContainer: {
    flex: 1
  },
  closeButtonContainer: {
    position: "absolute",
    top: 0,
    right: theme.space(2),
    zIndex: 1
  },
  header: {
    gap: theme.space(1.5),
    padding: theme.space(4)
  },
  footer: {
    marginTop: "auto",
    flexDirection: "column",
    gap: theme.space(2),
    padding: theme.space(4)
  }
}))

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger
}
