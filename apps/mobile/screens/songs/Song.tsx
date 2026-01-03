import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { SongInfo } from "@features/songs/components"

const Song = () => {
  const styles = useStyles(songStyles)

  return (
    <FadingScreen style={styles.container}>
      <SongInfo />
    </FadingScreen>
  )
}

const songStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Song }
