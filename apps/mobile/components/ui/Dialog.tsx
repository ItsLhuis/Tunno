import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode
} from "react"

import {
  BackHandler,
  Pressable,
  StyleSheet,
  View,
  type GestureResponderEvent,
  type ViewProps
} from "react-native"

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type WithTimingConfig
} from "react-native-reanimated"

import { scheduleOnRN } from "react-native-worklets"

import { Portal } from "@gorhom/portal"

import { createStyleSheet, durationTokens, useStyles } from "@styles"

import { Button, type ButtonProps } from "@components/ui/Button"
import { Text, type TextProps } from "@components/ui/Text"

const TIMING_CONFIG: WithTimingConfig = {
  duration: durationTokens[300],
  easing: Easing.bezier(0.4, 0, 0.2, 1)
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

type DialogProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

const Dialog = ({ open: controlledOpen, onOpenChange, children }: DialogProps) => {
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

  const value = useMemo(
    () => ({
      open,
      onOpenChange: handleOpenChange
    }),
    [open, handleOpenChange]
  )

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
}

type DialogTriggerRenderProps = {
  onPress: (e: GestureResponderEvent) => void
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
  onPress: (e: GestureResponderEvent) => void
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
    padding: theme.space("lg")
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8
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
