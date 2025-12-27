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

import { type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import {
  BottomSheet,
  BottomSheetView,
  type BottomSheetProps,
  type BottomSheetRef,
  type SNAP_POINT_TYPE
} from "@components/ui/BottomSheet"
import { Button, type ButtonProps } from "@components/ui/Button"

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
}

const Popover = ({ open: controlledOpen, onOpenChange, children }: PopoverProps) => {
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

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
}

export type PopoverTriggerProps = ButtonProps

const PopoverTrigger = ({ onPress, ...props }: PopoverTriggerProps) => {
  const popoverContext = usePopover()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      popoverContext?.onOpenChange(true)
      onPress?.(event)
    },
    [popoverContext, onPress]
  )

  return <Button onPress={handlePress} {...props} />
}

const PopoverAnchor = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

export type PopoverCloseProps = ButtonProps & {
  onClose?: () => void
}

const PopoverClose = ({ onPress, onClose, ...props }: PopoverCloseProps) => {
  const context = useContext(PopoverContext)

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

export type PopoverContentProps = Omit<BottomSheetProps, "ref">

const PopoverContent = ({ children, onChange, ...props }: PopoverContentProps) => {
  const styles = useStyles(popoverStyles)

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
      <BottomSheetView style={styles.content}>
        <PopoverContext.Provider value={popoverContext}>{children}</PopoverContext.Provider>
      </BottomSheetView>
    </BottomSheet>
  )
}

const popoverStyles = createStyleSheet(({ theme }) => ({
  content: {
    padding: theme.space(4)
  }
}))

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger }
