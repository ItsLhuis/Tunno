import { theme } from "@styles/theme"

import { View } from "react-native"

import { IconButton, Image, ListItemText } from "@components/ui"

export function TrackInfo() {
  return (
    <View style={{ width: "100%", alignItems: "center", gap: theme.styles.spacing.large }}>
      <Image
        style={{
          width: "100%",
          aspectRatio: 1,
          maxWidth: 640,
          maxHeight: 640,
          borderRadius: theme.styles.borderRadius.small
        }}
        source={require("@assets/thumbs/1.jpg")}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.styles.spacing.small
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
