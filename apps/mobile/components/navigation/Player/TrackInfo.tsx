import { useColorTheme } from "@hooks/useColorTheme"

import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import { Image } from "../../ui/Image"
import { Text } from "../../ui/Text"
import { IconButton } from "../../ui/IconButton"

export function TrackInfo() {
  const { colors } = useColorTheme()

  return (
    <View style={{ width: "100%", alignItems: "center", gap: spacing.large }}>
      <Image
        style={{
          width: "100%",
          maxWidth: 640,
          maxHeight: 640,
          aspectRatio: 1,
          borderRadius: borderRadius.small
        }}
        source={require("@assets/images/thumb.jpg")}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.small }}>
        <View style={{ flex: 1 }}>
          <Text variant="bold" size="xxLarge" numberOfLines={1}>
            Marisola - Remix
          </Text>
          <Text size="large" numberOfLines={1} style={{ color: colors.placeholder }}>
            Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile
          </Text>
        </View>
        <IconButton name="More" />
      </View>
    </View>
  )
}
