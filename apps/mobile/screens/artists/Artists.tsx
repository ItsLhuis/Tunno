import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { ArtistsList } from "@features/artists/components"

const Artists = () => {
  const styles = useStyles(artistsStyles)

  return (
    <FadingScreen style={styles.container}>
      <ArtistsList />
    </FadingScreen>
  )
}

const artistsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Artists }
