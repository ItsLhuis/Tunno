import { useColorTheme } from "@hooks/useColorTheme"

import { spacing, borderRadius, imageSize } from "@constants/styles"

import { View } from "react-native"

import { Image } from "../../ui/Image"
import { Text } from "../../ui/Text"

import { PlaybackControls } from "./PlaybackControls"

export function TrackInfo() {
  const { colors } = useColorTheme()

  return (
    <View
      style={{
        padding: spacing.small,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: spacing.xSmall
      }}
    >
      <Image
        style={{
          width: imageSize.low,
          aspectRatio: 1,
          borderRadius: borderRadius.xSmall
        }}
        source={require("@assets/images/thumb.jpg")}
      />
      <View style={{ flex: 1 }}>
        <Text size="large" variant="bold" numberOfLines={1}>
          Marisola - Remix
        </Text>
        <Text size="xSmall" numberOfLines={1} style={{ color: colors.placeholder }}>
          Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile
        </Text>
      </View>
      <PlaybackControls />
    </View>
  )
}
