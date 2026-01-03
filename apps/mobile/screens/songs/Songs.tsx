import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { SongsList } from "@features/songs/components"

const Songs = () => {
  const styles = useStyles(songsStyles)

  return (
    <FadingScreen style={styles.container}>
      <SongsList />
    </FadingScreen>
  )
}

const songsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Songs }
