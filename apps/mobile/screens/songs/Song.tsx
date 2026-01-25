import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { SongInfo } from "@features/songs/components"

const Song = () => {
  const styles = useStyles(songStyles)

  return (
    <View style={styles.container}>
      <SongInfo />
    </View>
  )
}

const songStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Song }
