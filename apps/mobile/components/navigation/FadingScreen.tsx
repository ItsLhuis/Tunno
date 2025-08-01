import { useCallback } from "react"

import { useFocusEffect } from "expo-router"

import { FadingView, type FadingViewProps } from "@components/ui/FadingView"

import { Easing, useSharedValue, withTiming } from "react-native-reanimated"

export type FadingScreenProps = Omit<FadingViewProps, "opacity"> & {
  duration?: number
}

function FadingScreen({
  duration = 300,
  opacityThresholdToEnablePointerEvents = 0,
  children,
  ...props
}: FadingScreenProps) {
  const opacity = useSharedValue<number>(0)

  useFocusEffect(
    useCallback(() => {
      const bezier = Easing.bezier(0.33, 1, 0.68, 1).factory()
      opacity.value = withTiming(1, {
        duration,
        easing: Easing.out(bezier)
      })
      return () => {
        opacity.value = withTiming(0, {
          duration,
          easing: Easing.in(bezier)
        })
      }
    }, [])
  )

  return (
    <FadingView
      opacity={opacity}
      opacityThresholdToEnablePointerEvents={opacityThresholdToEnablePointerEvents}
      {...props}
    >
      {children}
    </FadingView>
  )
}

export { FadingScreen }
