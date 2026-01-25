import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { AlbumInfo } from "@features/albums/components"

const Album = () => {
  const styles = useStyles(albumStyles)

  return (
    <View style={styles.container}>
      <AlbumInfo />
    </View>
  )
}

const albumStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Album }
