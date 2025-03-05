import { Fragment, useCallback, useEffect } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useApp } from "@stores/useApp"

import { border } from "@constants/styles"

import { View } from "react-native"

import { FadingView } from "../../ui/FadingView"
import { Pressable } from "../../ui/Pressable"

import { TrackInfo } from "./TrackInfo"
import { PlaybackProgress } from "./PlaybackProgress"

import { useSharedValue, withTiming } from "react-native-reanimated"

export function BottomPlayer() {
  const { colors } = useColorTheme()

  const { playerRef } = useApp()

  const opacity = useSharedValue<number>(0)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 })
    return () => {
      opacity.value = withTiming(0, { duration: 300 })
    }
  }, [])

  const handleOpenPlayer = useCallback(() => {
    playerRef.current?.present()
  }, [])

  return (
    <Fragment>
      <FadingView opacity={opacity}>
        <View
          style={{
            borderTopColor: colors.muted,
            borderTopWidth: border.thin
          }}
        >
          <Pressable onPress={handleOpenPlayer} disableOpacityEffect>
            <TrackInfo />
          </Pressable>
        </View>
      </FadingView>
      <PlaybackProgress />
    </Fragment>
  )
}
