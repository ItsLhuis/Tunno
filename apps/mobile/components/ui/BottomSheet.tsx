import {
  type ComponentProps,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

import {
  BackHandler,
  type BlurEvent,
  ColorValue,
  FlatList,
  type FlatListProps,
  type FocusEvent,
  type TextInputProps as RNTextInputProps,
  type StyleProp,
  type ViewStyle
} from "react-native"

import {
  type ColorKey,
  createStyleSheet,
  createVariant,
  durationTokens,
  resolveColor,
  type StyleVariants,
  ThemeContext,
  useAnimatedTheme,
  useBaseTheme,
  useStyles,
  useTheme
} from "@styles"

import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from "react-native-reanimated"

import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetTextInput as GorhomBottomSheetTextInput,
  type SNAP_POINT_TYPE,
  useBottomSheetModal,
  useBottomSheetScrollableCreator,
  useBottomSheetTimingConfigs
} from "@gorhom/bottom-sheet"

import { FlashList, type FlashListProps } from "@shopify/flash-list"

import { LegendList, type LegendListProps } from "@legendapp/list"

export type BottomSheetRef = BottomSheetModal

export type BottomSheetProps = BottomSheetModalProps & {
  ref?: Ref<BottomSheetModal>
  backgroundStyle?: StyleProp<Omit<ViewStyle, "position" | "top" | "left" | "bottom" | "right">>
  handleIndicatorStyle?: StyleProp<ViewStyle>
  containerViewStyle?: StyleProp<ViewStyle>
  inheritPalette?: boolean
  children: ReactNode
}

const BottomSheet = ({
  snapPoints,
  backgroundStyle,
  handleIndicatorStyle,
  containerViewStyle,
  topInset,
  bottomInset,
  children,
  onChange,
  inheritPalette = false,
  ref,
  ...props
}: BottomSheetProps) => {
  const styles = useStyles(bottomSheetStyles)

  const { runtime } = useTheme()

  const baseTheme = useBaseTheme()

  const baseStyles = useMemo(
    () => ({
      background: {
        backgroundColor: baseTheme.theme.colors.background,
        borderRadius: baseTheme.theme.radius("2xl")
      },
      handleIndicator: {
        backgroundColor: baseTheme.theme.colors.mutedForeground
      }
    }),
    [baseTheme.theme]
  )

  const resolvedStyles = inheritPalette ? styles : baseStyles

  const snap = useMemo(() => snapPoints, [snapPoints])

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={1}
        style={styles.backdrop}
      />
    ),
    []
  )

  const timingConfig = useBottomSheetTimingConfigs({
    duration: durationTokens[300],
    easing: Easing.bezier(0.4, 0, 0.2, 1).factory()
  })

  useEffect(() => {
    const onBackPress = () => {
      if (isBottomSheetOpen && ref && typeof ref === "object" && ref.current) {
        ref.current.close()
        return true
      }
      return false
    }

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress)

    return () => {
      subscription.remove()
    }
  }, [isBottomSheetOpen, ref])

  return (
    <BottomSheetModal
      ref={ref}
      topInset={topInset ?? runtime.insets.top}
      bottomInset={bottomInset ?? 0}
      snapPoints={snap}
      backdropComponent={renderBackdrop}
      backgroundStyle={[resolvedStyles.background, backgroundStyle]}
      animationConfigs={timingConfig}
      handleIndicatorStyle={[resolvedStyles.handleIndicator, handleIndicatorStyle]}
      enableOverDrag={false}
      enablePanDownToClose
      {...props}
      onChange={(index, position, type) => {
        setIsBottomSheetOpen(index >= 0)

        if (typeof onChange === "function") {
          onChange(index, position, type)
        }
      }}
    >
      {inheritPalette ? (
        children
      ) : (
        <ThemeContext.Provider value={baseTheme}>{children}</ThemeContext.Provider>
      )}
    </BottomSheetModal>
  )
}

const bottomSheetStyles = createStyleSheet(({ theme, runtime }) => ({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)"
  },
  background: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius("2xl")
  },
  handleIndicator: {
    backgroundColor: theme.colors.mutedForeground
  },
  container: {
    flex: 1,
    paddingBottom: runtime.insets.bottom
  }
}))

type BottomSheetScrollViewProps = ComponentProps<typeof GorhomBottomSheetScrollView>

const BottomSheetScrollView = (props: BottomSheetScrollViewProps) => {
  return (
    <GorhomBottomSheetScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      {...props}
    />
  )
}

function BottomSheetFlashList<T>(props: FlashListProps<T>) {
  const ScrollComponent = useBottomSheetScrollableCreator()

  return (
    <FlashList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      viewabilityConfig={{
        waitForInteraction: true,
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 1000
      }}
      bounces={false}
      {...props}
      renderScrollComponent={ScrollComponent}
    />
  )
}

function BottomSheetLegendList<T>(props: LegendListProps<T>) {
  const ScrollComponent = useBottomSheetScrollableCreator()

  return (
    <LegendList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      viewabilityConfig={{
        waitForInteraction: true,
        itemVisiblePercentThreshold: 50,
        minimumViewTime: 1000
      }}
      recycleItems
      {...props}
      renderScrollComponent={ScrollComponent}
    />
  )
}

function BottomSheetFlatList<T>(props: FlatListProps<T>) {
  const ScrollComponent = useBottomSheetScrollableCreator()

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      bounces={false}
      overScrollMode="never"
      {...props}
      renderScrollComponent={ScrollComponent}
    />
  )
}

const AnimatedBottomSheetTextInput = Animated.createAnimatedComponent(GorhomBottomSheetTextInput)

export type BottomSheetTextInputProps = Omit<
  RNTextInputProps,
  "placeholderTextColor" | "selectionColor" | "editable"
> &
  StyleVariants<typeof bottomSheetTextInputStyles, "input"> & {
    disableBorderAnimation?: boolean
    placeholderTextColor?: ColorKey | undefined
    selectionColor?: ColorKey | undefined
  }

const BottomSheetTextInput = ({
  disableBorderAnimation = false,
  disabled = false,
  style,
  onFocus,
  onBlur,
  placeholderTextColor,
  selectionColor,
  ...props
}: BottomSheetTextInputProps) => {
  const styles = useStyles(bottomSheetTextInputStyles)

  const { theme } = useTheme()

  const animatedTheme = useAnimatedTheme()

  const isFocused = useSharedValue(0)

  const resolvedPlaceholderColor = placeholderTextColor
    ? resolveColor(theme, placeholderTextColor)
    : undefined
  const finalPlaceholderColor: ColorValue = resolvedPlaceholderColor ?? theme.colors.mutedForeground

  const resolvedSelectionColor = selectionColor ? resolveColor(theme, selectionColor) : undefined
  const finalSelectionColor: ColorValue = resolvedSelectionColor ?? theme.colors.primary

  const borderStyle = useAnimatedStyle(() => {
    if (disableBorderAnimation) {
      return {}
    }

    return {
      borderColor: interpolateColor(
        isFocused.value,
        [0, 1],
        [String(animatedTheme.value.colors.input), String(animatedTheme.value.colors.primary)]
      )
    }
  })

  const handleFocus = (event: FocusEvent) => {
    if (!disableBorderAnimation) {
      isFocused.value = withTiming(1, { duration: durationTokens[300] })
    }
    onFocus?.(event)
  }

  const handleBlur = (event: BlurEvent) => {
    if (!disableBorderAnimation) {
      isFocused.value = withTiming(0, { duration: durationTokens[300] })
    }
    onBlur?.(event)
  }

  return (
    <AnimatedBottomSheetTextInput
      editable={!disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      maxFontSizeMultiplier={1}
      selectionColor={finalSelectionColor}
      placeholderTextColor={finalPlaceholderColor}
      style={[styles.input({ disabled }), borderStyle, style]}
      {...props}
    />
  )
}

const bottomSheetTextInputStyles = createStyleSheet(({ theme }) => ({
  input: createVariant({
    base: {
      backgroundColor: theme.withOpacity(theme.colors.tabbar, theme.opacity(75)),
      fontSize: theme.fontSize("sm"),
      fontFamily: "SpaceGrotesk-Regular",
      color: theme.colors.foreground,
      padding: theme.space("sm"),
      borderRadius: theme.radius(),
      borderWidth: theme.borderWidth(),
      borderColor: theme.colors.input
    },
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity(50)
        },
        false: {}
      }
    },
    defaultVariants: {
      disabled: false
    }
  })
}))

export {
  BottomSheet,
  BottomSheetFlashList,
  BottomSheetFlatList,
  BottomSheetLegendList,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetModal,
  type SNAP_POINT_TYPE
}
