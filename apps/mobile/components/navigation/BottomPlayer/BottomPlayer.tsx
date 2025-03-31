import { Fragment, useCallback, useEffect } from "react"

import { useColorTheme } from "@hooks/useColorTheme"

import { useUIStore } from "@stores/useUIStore"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { FadingView } from "../../ui/FadingView"
import { Pressable } from "../../ui/Pressable"

import { PlaybackProgress } from "./PlaybackProgress"
import { TrackInfo } from "./TrackInfo"

import { useSharedValue, withTiming } from "react-native-reanimated"

export function BottomPlayer() {
  const { colors } = useColorTheme()

  const { playerRef } = useUIStore()

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
            borderTopWidth: theme.styles.border.thin
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
