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
  useState,
  type ReactElement,
  type ReactNode,
  type Ref
} from "react"

import {
  BackHandler,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type ViewProps
} from "react-native"

import { createStyleSheet, durationTokens, ThemeContext, useBaseTheme, useStyles } from "@styles"

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type WithTimingConfig
} from "react-native-reanimated"

import { scheduleOnRN } from "react-native-worklets"

import { Portal } from "@gorhom/portal"

import { Button, type ButtonProps } from "@components/ui/Button"
import { Text, type TextProps } from "@components/ui/Text"

const TIMING_CONFIG: WithTimingConfig = {
  duration: durationTokens[300],
  easing: Easing.bezier(0.4, 0, 0.2, 1)
}

export type DialogRef = {
  open: () => void
  close: () => void
}

type DialogContextValue = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

function useDialog() {
  return useContext(DialogContext)
}

function useDialogRequired() {
  const context = useContext(DialogContext)

  if (!context) throw new Error("Dialog components must be used within Dialog")

  return context
}

export type DialogProps = {
  ref?: Ref<DialogRef>
  open?: boolean
  onOpenChange?: (open: boolean) => void
  inheritPalette?: boolean
  children: ReactNode
}

const Dialog = ({
  open: controlledOpen,
  onOpenChange,
  inheritPalette = false,
  children,
  ref
}: DialogProps) => {
  const baseTheme = useBaseTheme()

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

  useImperativeHandle(ref, () => ({
    open: () => handleOpenChange(true),
    close: () => handleOpenChange(false)
  }))

  const value = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange
    }),
    [open, handleOpenChange]
  )

  return (
    <DialogContext.Provider value={value}>
      {inheritPalette ? (
        children
      ) : (
        <ThemeContext.Provider value={baseTheme}>{children}</ThemeContext.Provider>
      )}
    </DialogContext.Provider>
  )
}

type DialogTriggerRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type DialogTriggerProps = ButtonProps & {
  children?: ReactNode | ((props: DialogTriggerRenderProps) => ReactNode)
  asChild?: boolean
}

const DialogTrigger = ({ onPress, children, asChild, ...props }: DialogTriggerProps) => {
  const dialogContext = useDialog()

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      dialogContext?.onOpenChange(true)
      onPress?.(event)
    },
    [dialogContext, onPress]
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

const DialogPortal = ({ children }: { children: ReactNode }) => {
  return <Fragment>{children}</Fragment>
}

type DialogCloseRenderProps = {
  onPress: (event: GestureResponderEvent) => void
}

export type DialogCloseProps = ButtonProps & {
  children?: ReactNode | ((props: DialogCloseRenderProps) => ReactNode)
  asChild?: boolean
}

const DialogClose = ({ onPress, children, asChild, ...props }: DialogCloseProps) => {
  const dialogContext = useContext(DialogContext)

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      dialogContext?.onOpenChange(false)
      onPress?.(event)
    },
    [dialogContext, onPress]
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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type DialogContentProps = ViewProps

const DialogContent = ({ children, style, ...props }: DialogContentProps) => {
  const styles = useStyles(dialogStyles)

  const dialogContext = useDialogRequired()

  const { open, onOpenChange } = dialogContext

  const [mounted, setMounted] = useState(false)

  const opacity = useSharedValue(0)
  const scale = useSharedValue(0.95)

  const handleAnimationComplete = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      setMounted(false)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setMounted(true)

      opacity.value = withTiming(1, TIMING_CONFIG)
      scale.value = withTiming(1, TIMING_CONFIG)
    } else if (mounted) {
      opacity.value = withTiming(0, TIMING_CONFIG, (finished) => {
        "worklet"
        if (finished) {
          scheduleOnRN(handleAnimationComplete, false)
        }
      })
      scale.value = withTiming(0.95, TIMING_CONFIG)
    }
  }, [open, mounted, opacity, scale, handleAnimationComplete])

  useEffect(() => {
    if (!mounted) return

    const onBackPress = () => {
      onOpenChange(false)
      return true
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      subscription.remove()
    }
  }, [mounted, onOpenChange])

  const backdropAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }]
  }))

  const handleBackdropPress = useCallback(() => {
    onOpenChange(false)
  }, [onOpenChange])

  if (!mounted) {
    return null
  }

  return (
    <Portal hostName="dialog">
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        <AnimatedPressable
          style={[styles.backdrop, backdropAnimatedStyle]}
          onPress={handleBackdropPress}
        />
        <Animated.View style={[styles.content, style, contentAnimatedStyle]} {...props}>
          <DialogContext.Provider value={dialogContext}>{children}</DialogContext.Provider>
        </Animated.View>
      </View>
    </Portal>
  )
}

export type DialogViewProps = ViewProps

const DialogView = ({ children, style, ...props }: DialogViewProps) => {
  const styles = useStyles(dialogStyles)

  return (
    <View style={[styles.view, style]} {...props}>
      {children}
    </View>
  )
}

export type DialogScrollViewProps = ViewProps & {
  contentContainerStyle?: ViewProps["style"]
}

const DialogScrollView = ({ children, style, contentContainerStyle }: DialogScrollViewProps) => {
  const styles = useStyles(dialogStyles)

  return (
    <Animated.ScrollView
      style={[styles.scrollView, style]}
      contentContainerStyle={[styles.scrollViewContent, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </Animated.ScrollView>
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
  return <Text variant="h4" weight="semibold" {...props} />
}

const DialogDescription = ({ ...props }: TextProps) => {
  return <Text size="sm" color="mutedForeground" {...props} />
}

const dialogStyles = createStyleSheet(({ theme }) => ({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.space(),
    zIndex: 9999
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  content: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius("xl"),
    width: "100%",
    maxWidth: 400,
    padding: theme.space("lg"),
    gap: theme.space("lg"),
    ...theme.shadow("xl")
  },
  view: {
    gap: theme.space("lg")
  },
  scrollView: {
    flex: 1
  },
  scrollViewContent: {
    gap: theme.space("lg")
  },
  header: {
    gap: theme.space(2)
  },
  footer: {
    flexDirection: "row",
    gap: theme.space(2),
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
  DialogScrollView,
  DialogTitle,
  DialogTrigger,
  DialogView
}
