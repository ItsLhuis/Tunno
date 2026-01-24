import { View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton, FadingScreen } from "@components/navigation"
import { Header, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { LanguageSection } from "@features/settings/features/language/components"

const Language = () => {
  const styles = useStyles(languageStyles)

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
                {t("settings.language.title")}
              </Text>
            }
            headerLeft={<BackButton />}
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader>
            <Text variant="h1" numberOfLines={1}>
              {t("settings.language.title")}
            </Text>
          </LargeHeader>
        )}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionsContainer}>
          <LanguageSection />
        </View>
      </ScrollViewWithHeaders>
    </FadingScreen>
  )
}

const languageStyles = createStyleSheet(({ theme, runtime }) => ({
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

export { Language }
