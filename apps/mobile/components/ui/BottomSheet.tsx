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

import { createStyleSheet, durationTokens, useStyles, useTheme } from "@styles"

import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetView,
  type SNAP_POINT_TYPE,
  useBottomSheetModal,
  useBottomSheetScrollableCreator,
  useBottomSheetTimingConfigs
} from "@gorhom/bottom-sheet"

import { FlashList, type FlashListProps } from "@shopify/flash-list"

export type BottomSheetRef = BottomSheetModal

import { Easing } from "react-native-reanimated"

export type BottomSheetProps = BottomSheetModalProps & {
  ref?: Ref<BottomSheetModal>
  backgroundStyle?: StyleProp<Omit<ViewStyle, "position" | "top" | "left" | "bottom" | "right">>
  handleIndicatorStyle?: StyleProp<ViewStyle>
  containerViewStyle?: StyleProp<ViewStyle>
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
  ref,
  ...props
}: BottomSheetProps) => {
  const styles = useStyles(bottomSheetStyles)

  const { runtime } = useTheme()

  const snap = useMemo(() => snapPoints, [snapPoints])

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false)

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
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
      backgroundStyle={[styles.background, backgroundStyle]}
      animationConfigs={timingConfig}
      handleIndicatorStyle={[styles.handleIndicator, handleIndicatorStyle]}
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
      {children}
    </BottomSheetModal>
  )
}

const bottomSheetStyles = createStyleSheet(({ theme, runtime }) => ({
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

  return <FlashList {...props} renderScrollComponent={ScrollComponent} />
}

export {
  BottomSheet,
  BottomSheetFlashList,
  BottomSheetScrollView,
  BottomSheetView,
  useBottomSheetModal
}

export type { SNAP_POINT_TYPE }
