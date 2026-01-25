import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { ArtistsList } from "@features/artists/components"

const Artists = () => {
  const styles = useStyles(artistsStyles)

  return (
    <View style={styles.container}>
      <ArtistsList />
    </View>
  )
}

const artistsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Artists }
