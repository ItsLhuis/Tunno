import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { QueueScreen } from "@features/queue"

const Queue = () => {
  const styles = useStyles(queueStyles)

  return (
    <View style={styles.container}>
      <QueueScreen />
    </View>
  )
}

const queueStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  }
}))

export { Queue }
