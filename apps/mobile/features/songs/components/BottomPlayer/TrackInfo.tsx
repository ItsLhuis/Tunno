import { theme } from "@styles/theme"

import { View } from "react-native"

import { Image, ListItemText } from "@components/ui"

import { PlaybackControls } from "./PlaybackControls"

const TrackInfo = () => {
  return (
    <View
      style={{
        padding: theme.styles.spacing.small,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.styles.spacing.xSmall
      }}
    >
      <Image
        style={{
          width: theme.styles.image.size.large,
          aspectRatio: 1,
          borderRadius: theme.styles.borderRadius.xSmall
        }}
        source={require("@assets/thumbs/1.jpg")}
      />
      <ListItemText
        title="Marisola - Remix"
        titleProps={{ size: "large", numberOfLines: 1 }}
        description="Cris Mj, Duki, Nicki Nicole, Standly, Stars Music Chile"
        descriptionProps={{
          size: "xSmall",
          numberOfLines: 1
        }}
      />
      <PlaybackControls />
    </View>
  )
}

export { TrackInfo }
