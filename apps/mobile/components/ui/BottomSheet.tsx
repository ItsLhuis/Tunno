import {
  type ComponentProps,
  type ReactNode,
  type Ref,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react"

import { BackHandler, type StyleProp, type ViewStyle } from "react-native"

import {
  createStyleSheet,
  durationTokens,
  ThemeContext,
  useBaseTheme,
  useStyles,
  useTheme
} from "@styles"

import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  type SNAP_POINT_TYPE,
  useBottomSheetModal,
  useBottomSheetScrollableCreator,
  useBottomSheetTimingConfigs
} from "@gorhom/bottom-sheet"

import { FlashList, type FlashListProps } from "@shopify/flash-list"

import { Easing } from "react-native-reanimated"

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
      {...props}
      renderScrollComponent={ScrollComponent}
    />
  )
}

export {
  BottomSheet,
  BottomSheetFlashList,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal
}

export type { SNAP_POINT_TYPE }
