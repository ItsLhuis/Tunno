import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { ArtistInfo } from "@features/artists/components"

const Artist = () => {
  const styles = useStyles(artistStyles)

  return (
    <View style={styles.container}>
      <ArtistInfo />
    </View>
  )
}

const artistStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Artist }
