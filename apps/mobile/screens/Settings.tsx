import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { View } from "react-native"

import { BackButton } from "@components/navigation"
import { Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

const Settings = () => {
  const styles = useStyles(settingsStyles)

  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("settings.title")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("settings.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      ></ScrollViewWithHeaders>
    </View>
  )
}

const settingsStyles = createStyleSheet(({ theme }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    paddingLeft: theme.space("lg"),
    paddingBottom: theme.space("lg")
  }
}))

export { Settings }
