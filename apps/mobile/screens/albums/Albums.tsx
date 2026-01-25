import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { AlbumsList } from "@features/albums/components"

const Albums = () => {
  const styles = useStyles(albumsStyles)

  return (
    <View style={styles.container}>
      <AlbumsList />
    </View>
  )
}

const albumsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Albums }
