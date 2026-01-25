import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { LyricsScreen } from "@features/lyrics/components"

const Lyrics = () => {
  const styles = useStyles(lyricsStyles)

  return (
    <View style={styles.container}>
      <LyricsScreen />
    </View>
  )
}

const lyricsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Lyrics }
