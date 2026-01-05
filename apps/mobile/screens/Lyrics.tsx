import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { LyricsScreen } from "@features/lyrics/components"

const Lyrics = () => {
  const styles = useStyles(lyricsStyles)

  return (
    <FadingScreen style={styles.container}>
      <LyricsScreen />
    </FadingScreen>
  )
}

const lyricsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Lyrics }
