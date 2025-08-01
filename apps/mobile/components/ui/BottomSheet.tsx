import { type ReactNode, forwardRef, useCallback, useEffect, useMemo, useState } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useColorTheme } from "@hooks/useColorTheme"

import { theme } from "@styles/theme"

import { BackHandler, StyleProp, ViewStyle } from "react-native"

import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
  useBottomSheetTimingConfigs
} from "@gorhom/bottom-sheet"

import { Easing } from "react-native-reanimated"

export type BottomSheetProps = BottomSheetModalProps & {
  backgroundStyle?: StyleProp<Omit<ViewStyle, "position" | "top" | "left" | "bottom" | "right">>
  handleIndicatorStyle?: StyleProp<ViewStyle>
  containerViewStyle?: StyleProp<ViewStyle>
  children: ReactNode
}

const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  (
    {
      snapPoints,
      backgroundStyle,
      handleIndicatorStyle,
      containerViewStyle,
      topInset,
      bottomInset,
      children,
      onChange,
      ...props
    },
    ref
  ) => {
    const insets = useSafeAreaInsets()

    const { colors } = useColorTheme()

    const snap = useMemo(() => snapPoints, [snapPoints])

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      []
    )

    const timingConfig = useBottomSheetTimingConfigs({
      duration: 300,
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

      BackHandler.addEventListener("hardwareBackPress", onBackPress)

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress)
      }
    }, [isBottomSheetOpen, ref])

    return (
      <BottomSheetModal
        ref={ref}
        topInset={topInset ?? insets.top}
        bottomInset={bottomInset ?? 0}
        snapPoints={snap}
        backdropComponent={renderBackdrop}
        backgroundStyle={[
          {
            backgroundColor: colors.background,
            borderRadius: theme.styles.borderRadius.small
          },
          backgroundStyle
        ]}
        animationConfigs={timingConfig}
        handleIndicatorStyle={[handleIndicatorStyle, { backgroundColor: colors.mutedForeground }]}
        enableOverDrag={false}
        enablePanDownToClose={true}
        {...props}
        onChange={(index, position, type) => {
          setIsBottomSheetOpen(index >= 0)
          if (typeof onChange === "function") {
            onChange(index, position, type)
          }
        }}
      >
        <BottomSheetView style={[{ paddingBottom: insets.bottom }, containerViewStyle]}>
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    )
  }
)

export { BottomSheet }

