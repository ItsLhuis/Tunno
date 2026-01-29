import { useCallback } from "react"

import { View } from "react-native"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton } from "@components/navigation"
import {
  Header,
  LargeHeader,
  ScrollViewWithHeaders,
  Text,
  type ScrollHeaderProps
} from "@components/ui"

import { LanguageSection } from "@features/settings/features/language/components"

const Language = () => {
  const styles = useStyles(languageStyles)

  const { t } = useTranslation()

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => (
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
    ),
    [t]
  )

  const LargeHeaderComponent = useCallback(
    () => (
      <LargeHeader>
        <Text variant="h1" numberOfLines={1}>
          {t("settings.language.title")}
        </Text>
      </LargeHeader>
    ),
    [t]
  )

  return (
    <View style={styles.container}>
      <ScrollViewWithHeaders
        HeaderComponent={HeaderComponent}
        LargeHeaderComponent={LargeHeaderComponent}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.sectionsContainer}>
          <LanguageSection />
        </View>
      </ScrollViewWithHeaders>
    </View>
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
