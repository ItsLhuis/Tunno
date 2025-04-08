import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useUIStore } from "@stores/useUIStore"

import { theme } from "@styles/theme"

import { View } from "react-native"

import { BottomSheet } from "@components/ui/BottomSheet"

import { BottomSheetScrollView } from "@gorhom/bottom-sheet"

import { PlaybackControls } from "./PlaybackControls"
import { PlaybackOptions } from "./PlaybackOptions"
import { PlaybackProgress } from "./PlaybackProgress"
import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { TrackInfo } from "./TrackInfo"

export function Player() {
  const insets = useSafeAreaInsets()

  const { playerRef } = useUIStore()

  return (
    <BottomSheet
      activeOffsetY={[-1, 1]}
      failOffsetX={[-5, 5]}
      topInset={0}
      handleIndicatorStyle={{ marginTop: insets.top }}
      backgroundStyle={{ flex: 1 }}
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
          gap: theme.styles.spacing.large,
          padding: theme.styles.spacing.large
        }}
      >
        <View style={{ width: "100%", gap: theme.styles.spacing.large }}>
          <TrackInfo />
          <PlaybackProgress />
        </View>
        <PlaybackControls />
        <View style={{ width: "100%", gap: theme.styles.spacing.large }}>
          <PlaybackVolumeControl />
          <PlaybackOptions />
        </View>
      </BottomSheetScrollView>
    </BottomSheet>
  )
}
