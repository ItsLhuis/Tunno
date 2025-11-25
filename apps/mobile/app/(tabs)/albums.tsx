import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { FadingScreen } from "@components/navigation"
import { Text } from "@components/ui"

import { View } from "react-native"

export default function Albums() {
  const styles = useStyles(albumsStyles)

  const { t } = useTranslation()

  return (
    <FadingScreen style={styles.container}>
      <View style={styles.content}>
        <Text variant="h1" color="foreground">
          {t("albums.title")}
        </Text>
      </View>
    </FadingScreen>
  )
}

const albumsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.space(4)
  }
}))
