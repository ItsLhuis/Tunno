import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react"

import { createStyleSheet, useStyles } from "@styles"

import { View, type GestureResponderEvent, type ViewProps } from "react-native"

import { BottomSheetModal, type SNAP_POINT_TYPE } from "@gorhom/bottom-sheet"

import { BottomSheet, type BottomSheetProps } from "@components/ui/BottomSheet"
import { Button, type ButtonProps } from "@components/ui/Button"
import { Text, type TextProps } from "@components/ui/Text"

type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
  sheetRef: React.RefObject<BottomSheetModal | null>
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

const useDialog = () => {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("Dialog components must be used within Dialog")
  }
  return context
}

type DialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const Dialog = ({ open: controlledOpen, onOpenChange, children }: DialogProps) => {
  const sheetRef = useRef<BottomSheetModal | null>(null)
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

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

type DialogTriggerProps = ButtonProps

const DialogTrigger = ({ onPress, ...props }: DialogTriggerProps) => {
  const { onOpenChange } = useDialog()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      onOpenChange(true)
      onPress?.(event)
    },
    [onOpenChange, onPress]
  )

  return <Button onPress={handlePress} {...props} />
}

const DialogPortal = ({ children }: { children: ReactNode }) => {
  return <>{children}</>
}

type DialogCloseProps = ButtonProps & {
  onClose?: () => void
}

const DialogClose = ({ onPress, onClose, ...props }: DialogCloseProps) => {
  const context = useContext(DialogContext)

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

type DialogContentProps = Omit<BottomSheetProps, "ref">

const DialogContent = ({ children, onChange, ...props }: DialogContentProps) => {
  const { sheetRef, onOpenChange } = useDialog()

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
      {children}
    </BottomSheet>
  )
}

const DialogHeader = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(dialogStyles)

  return <View style={[styles.header, style]} {...props} />
}

const DialogFooter = ({ style, ...props }: ViewProps) => {
  const styles = useStyles(dialogStyles)

  return <View style={[styles.footer, style]} {...props} />
}

const DialogTitle = ({ ...props }: TextProps) => {
  return <Text variant="h3" {...props} />
}

const DialogDescription = ({ ...props }: TextProps) => {
  return <Text size="sm" color="mutedForeground" {...props} />
}

const dialogStyles = createStyleSheet(({ theme }) => ({
  header: {
    gap: theme.space(2),
    paddingHorizontal: theme.space("lg")
  },
  footer: {
    flexDirection: "row",
    gap: theme.space(2),
    padding: theme.space("lg"),
    justifyContent: "flex-end"
  }
}))

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger
}
