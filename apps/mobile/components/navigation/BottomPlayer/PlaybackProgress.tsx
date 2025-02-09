import { useColorTheme } from "@hooks/useColorTheme"

import { Platform, View } from "react-native"

import Slider from "@react-native-community/slider"

export function PlaybackProgress() {
  const { colors } = useColorTheme()

  return (
    <View style={{ width: "100%" }} pointerEvents="none">
      <Slider
        value={0.3}
        thumbTintColor="transparent"
        minimumTrackTintColor={colors.primary}
        maximumTrackTintColor={colors.placeholder}
        style={{
          height: 1,
          marginHorizontal: Platform.select({ ios: 0, android: -16 })
        }}
      />
    </View>
  )
}
