import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { PlaylistsList } from "@features/playlists/components"

const Playlists = () => {
  const styles = useStyles(playlistsStyles)

  return (
    <FadingScreen style={styles.container}>
      <PlaylistsList />
    </FadingScreen>
  )
}

const playlistsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Playlists }
