import { View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton, FadingScreen } from "@components/navigation"
import { Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

const Sync = () => {
  const styles = useStyles(syncStyles)

  const { t } = useTranslation()

  return (
    <FadingScreen style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={({ scrollY, showHeader }) => (
          <Header
            scrollY={scrollY}
            showHeader={showHeader}
            headerCenter={
              <Text weight="semibold" numberOfLines={1}>
                {t("settings.sync.title")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("settings.sync.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionsContainer}></View>
      </ScrollViewWithHeaders>
    </FadingScreen>
  )
}

const syncStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  },
  sectionsContainer: {
    gap: theme.space("xl")
  }
}))

export { Sync }
