import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { AlbumsList } from "@features/albums/components"

const Albums = () => {
  const styles = useStyles(albumsStyles)

  return (
    <FadingScreen style={styles.container}>
      <AlbumsList />
    </FadingScreen>
  )
}

const albumsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Albums }
