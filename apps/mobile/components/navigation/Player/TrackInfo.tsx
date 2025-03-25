import { borderRadius, spacing } from "@constants/styles"

import { View } from "react-native"

import { IconButton } from "../../ui/IconButton"
import { Image } from "../../ui/Image"
import { ListItemText } from "../../ui/ListItemText"

export function TrackInfo() {
  return (
    <View style={{ width: "100%", alignItems: "center", gap: spacing.large }}>
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          maxWidth: 640,
          maxHeight: 640,
          borderRadius: borderRadius.small
        }}
        source={require("@assets/thumbs/1.jpg")}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.small
        }}
      >
        <ListItemText
          title="Marisola - Remix"
          titleProps={{ size: "xxLarge", numberOfLines: 1 }}
          description="Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile"
          descriptionProps={{
            size: "large",
            numberOfLines: 1
          }}
        />
        <IconButton name="More" />
      </View>
    </View>
  )
}
