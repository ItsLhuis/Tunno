import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { PlaylistInfo } from "@features/playlists/components"

const Playlist = () => {
  const styles = useStyles(playlistStyles)

  return (
    <View style={styles.container}>
      <PlaylistInfo />
    </View>
  )
}

const playlistStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Playlist }
