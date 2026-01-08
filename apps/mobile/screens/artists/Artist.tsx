import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { ArtistInfo } from "@features/artists/components"

const Artist = () => {
  const styles = useStyles(artistStyles)

  return (
    <FadingScreen style={styles.container}>
      <ArtistInfo />
    </FadingScreen>
  )
}

const artistStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Artist }
