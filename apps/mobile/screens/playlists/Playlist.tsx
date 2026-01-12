import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { PlaylistInfo } from "@features/playlists/components"

const Playlist = () => {
  const styles = useStyles(playlistStyles)

  return (
    <FadingScreen style={styles.container}>
      <PlaylistInfo />
    </FadingScreen>
  )
}

const playlistStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Playlist }
