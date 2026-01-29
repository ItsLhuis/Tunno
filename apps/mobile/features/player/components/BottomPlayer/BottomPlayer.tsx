import { View } from "react-native"

import { createStyleSheet, ScopedPalette, spacingTokens, useStyles, viewStyle } from "@styles"

import { usePlayerStore } from "../../stores/usePlayerStore"

import {
  useBottomPlayerLayout,
  useResetBottomPlayerHeight
} from "../../contexts/BottomPlayerLayoutContext"

import { useTabbarHeight } from "@contexts/TabbarContext"

import { useImageColorAndPalette } from "@hooks/useImageColorAndPalette"
import { useThumbnailUri } from "@hooks/useThumbnailUri"

import { useKeyboardHandler } from "react-native-keyboard-controller"

import { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

import { AnimatedBackground, Fade, Pressable } from "@components/ui"

import { useEffect } from "react"
import { PlaybackControls } from "./PlaybackControls"
import { TrackInfo } from "./TrackInfo"

const BottomPlayer = () => {
  const styles = useStyles(bottomPlayerStyles)

  const onLayout = useBottomPlayerLayout()

  const tabbarHeight = useTabbarHeight()

  const resetHeight = useResetBottomPlayerHeight()

  const playerSheetRef = usePlayerStore((state) => state.playerSheetRef)
  const currentTrack = usePlayerStore((state) => state.currentTrack)

  const thumbnailUri = useThumbnailUri({ fileName: currentTrack?.thumbnail })

  const { palette } = useImageColorAndPalette({ imageUri: thumbnailUri })

  const translateY = useSharedValue(0)

  useKeyboardHandler(
    {
      onMove: (event) => {
        "worklet"
        const offset = Math.max(0, event.height - tabbarHeight)
        translateY.value = -offset
      }
    },
    [tabbarHeight]
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }))

  const handlePress = () => {
    playerSheetRef?.present()
  }

  useEffect(() => {
    if (!currentTrack) {
      resetHeight()
    }
  }, [currentTrack, resetHeight])

  if (!currentTrack) {
    return null
  }

  return (
    <Fade direction="up" style={[styles.container(tabbarHeight), animatedStyle]}>
      <Pressable
        disableOpacityEffect
        style={styles.pressable}
        onPress={handlePress}
        onLayout={(event) => onLayout(event, spacingTokens.sm)}
      >
        <ScopedPalette palette={palette}>
          <AnimatedBackground>
            <View style={styles.content}>
              <TrackInfo />
              <PlaybackControls />
            </View>
          </AnimatedBackground>
        </ScopedPalette>
      </Pressable>
    </Fade>
  )
}

const bottomPlayerStyles = createStyleSheet(({ theme }) => ({
  container: (bottomOffset: number) =>
    viewStyle({
      position: "absolute",
      left: theme.space(),
      right: theme.space(),
      bottom: theme.space() + bottomOffset
    }),
  pressable: {
    overflow: "hidden",
    borderRadius: theme.radius("xl"),
    borderWidth: theme.borderWidth(),
    borderColor: theme.withOpacity(theme.colors.border, theme.opacity(50)),
    borderBottomWidth: theme.borderWidth("none"),
    ...theme.shadow("xl")
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.space("sm"),
    gap: theme.space("sm")
  }
}))

export { BottomPlayer }
