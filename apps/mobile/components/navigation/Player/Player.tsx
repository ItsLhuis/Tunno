import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useAppStore } from "@stores/useAppStore"

import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import { BottomSheet } from "../../ui/BottomSheet"

import { BottomSheetScrollView } from "@gorhom/bottom-sheet"

import { TrackInfo } from "./TrackInfo"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackControls } from "./PlaybackControls"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { PlaybackOptions } from "./PlaybackOptions"

export function Player() {
  const insets = useSafeAreaInsets()

  const { playerRef } = useAppStore()

  return (
    <BottomSheet
      activeOffsetY={[-1, 1]}
      failOffsetX={[-5, 5]}
      topInset={0}
      handleIndicatorStyle={{ marginTop: insets.top }}
      backgroundStyle={{ flex: 1, borderRadius: borderRadius.none }}
      containerViewStyle={{ flex: 1 }}
      enableDynamicSizing={false}
      snapPoints={["100%"]}
      ref={playerRef}
    >
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: spacing.large,
          padding: spacing.large
        }}
      >
        <View style={{ width: "100%", gap: spacing.large }}>
          <TrackInfo />
          <PlaybackProgress />
        </View>
        <PlaybackControls />
        <View style={{ width: "100%", gap: spacing.large }}>
          <PlaybackVolumeControl />
          <PlaybackOptions />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
