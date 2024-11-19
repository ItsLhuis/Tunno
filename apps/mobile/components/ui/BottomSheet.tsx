import { ReactNode, forwardRef, useState, useEffect, useCallback, useMemo } from "react"

import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useThemeColor } from "@hooks/useThemeColor"

import { borderRadius } from "@constants/styles"

import { BackHandler, StyleProp, ViewStyle } from "react-native"

import {
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetBackdropProps
} from "@gorhom/bottom-sheet"

type BottomSheetProps = BottomSheetModalProps & {
  backgroundStyle?: StyleProp<Omit<ViewStyle, "position" | "top" | "left" | "bottom" | "right">>
  handleIndicatorStyle?: StyleProp<ViewStyle>
  children: ReactNode
}

export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetProps>(
  ({ snapPoints, backgroundStyle, handleIndicatorStyle, children, ...rest }, ref) => {
    const insets = useSafeAreaInsets()

    const { colors } = useThemeColor()

    const snap = useMemo(() => snapPoints, [snapPoints])

    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false)

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
      ),
      []
    )

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
        topInset={insets.top}
        snapPoints={snap}
        backdropComponent={renderBackdrop}
        backgroundStyle={[
          {
            backgroundColor: colors.elevation,
            borderRadius: borderRadius.small
          },
          backgroundStyle
        ]}
        handleIndicatorStyle={[handleIndicatorStyle, { backgroundColor: colors.icon }]}
        enableOverDrag={false}
        enablePanDownToClose={true}
        {...rest}
        onChange={(index, position, type) => {
          setIsBottomSheetOpen(index >= 0)
          if (typeof rest.onChange === "function") {
            rest.onChange(index, position, type)
          }
        }}
      >
        <BottomSheetView style={{ paddingBottom: insets.bottom }}>{children}</BottomSheetView>
      </BottomSheetModal>
    )
  }
)
