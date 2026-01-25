import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { PlaylistsList } from "@features/playlists/components"

const Playlists = () => {
  const styles = useStyles(playlistsStyles)

  return (
    <View style={styles.container}>
      <PlaylistsList />
    </View>
  )
}

const playlistsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Playlists }
