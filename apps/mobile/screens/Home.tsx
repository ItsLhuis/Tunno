import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"

import { HomeScreen } from "@features/home/components"

const Home = () => {
  const styles = useStyles(homeStyles)

  return (
    <FadingScreen style={styles.container}>
      <HomeScreen />
    </FadingScreen>
  )
}

const homeStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Home }
