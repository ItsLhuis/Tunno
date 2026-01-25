import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { HomeScreen } from "@features/home/components"

const Home = () => {
  const styles = useStyles(homeStyles)

  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  )
}

const homeStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Home }
