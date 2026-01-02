import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { SongsList } from "@features/songs/components"

const Songs = () => {
  const styles = useStyles(songsStyles)

  return (
    <View style={styles.container}>
      <SongsList />
    </View>
  )
}

const songsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Songs }
