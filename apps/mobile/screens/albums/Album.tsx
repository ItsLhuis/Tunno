import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { AlbumInfo } from "@features/albums/components"

const Album = () => {
  const styles = useStyles(albumStyles)

  return (
    <FadingScreen style={styles.container}>
      <AlbumInfo />
    </FadingScreen>
  )
}

const albumStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Album }
