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

import { type GestureResponderEvent } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import {
  BottomSheet,
  BottomSheetScrollView,
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

type PopoverTriggerRenderProps = {
  onPress: (e: GestureResponderEvent) => void
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
  return <Fragment>{children}</Fragment>
}

type PopoverCloseRenderProps = {
  onPress: (e: GestureResponderEvent) => void
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
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        <PopoverContext.Provider value={popoverContext}>{children}</PopoverContext.Provider>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}

const popoverStyles = createStyleSheet(({ theme, runtime }) => ({
  content: {
    gap: theme.space("lg"),
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  }
}))

export { Popover, PopoverAnchor, PopoverClose, PopoverContent, PopoverTrigger }
