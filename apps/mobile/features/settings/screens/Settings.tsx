import { useCallback } from "react"

import { View } from "react-native"

import { useRouter } from "expo-router"

import { useTranslation } from "@repo/i18n"

import { createStyleSheet, useStyles } from "@styles"

import { BackButton } from "@components/navigation"
import {
  Header,
  Icon,
  LargeHeader,
  Pressable,
  ScrollViewWithHeaders,
  Text,
  type IconProps,
  type ScrollHeaderProps
} from "@components/ui"

type SettingsItem = {
  icon: IconProps["name"]
  label:
    | "settings.appearance.title"
    | "settings.language.title"
    | "settings.sync.title"
    | "settings.about.title"
  description:
    | "settings.appearance.description"
    | "settings.language.description"
    | "settings.sync.description"
    | "settings.about.description"
  href: "/settings/appearance" | "/settings/language" | "/settings/sync" | "/settings/about"
}

const settingsItems: SettingsItem[] = [
  {
    icon: "Palette",
    label: "settings.appearance.title",
    description: "settings.appearance.description",
    href: "/settings/appearance"
  },
  {
    icon: "Languages",
    label: "settings.language.title",
    description: "settings.language.description",
    href: "/settings/language"
  },
  {
    icon: "FolderSync",
    label: "settings.sync.title",
    description: "settings.sync.description",
    href: "/settings/sync"
  },
  {
    icon: "Info",
    label: "settings.about.title",
    description: "settings.about.description",
    href: "/settings/about"
  }
]

const Settings = () => {
  const styles = useStyles(settingsStyles)

  const { t } = useTranslation()

  const router = useRouter()

  const HeaderComponent = useCallback(
    ({ scrollY, showHeader }: ScrollHeaderProps) => (
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
    ),
    [t]
  )

  const LargeHeaderComponent = useCallback(
    () => (
      <LargeHeader>
        <Text variant="h1" numberOfLines={1}>
          {t("settings.title")}
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
        <View style={styles.itemsContainer}>
          {settingsItems.map((item) => (
            <Pressable key={item.href} style={styles.item} onPress={() => router.push(item.href)}>
              <Icon name={item.icon} size="lg" color="mutedForeground" />
              <View style={styles.itemContent}>
                <Text weight="medium">{t(item.label)}</Text>
                <Text size="sm" color="mutedForeground">
                  {t(item.description)}
                </Text>
              </View>
              <Icon name="ChevronRight" size="lg" color="mutedForeground" />
            </Pressable>
          ))}
        </View>
      </ScrollViewWithHeaders>
    </View>
  )
}

const settingsStyles = createStyleSheet(({ theme, runtime }) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },
  contentContainer: {
    padding: theme.space("lg"),
    paddingBottom: runtime.insets.bottom + theme.space("lg")
  },
  itemsContainer: {
    gap: theme.space("xl")
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: theme.space("sm")
  },
  itemContent: {
    flex: 1,
    gap: theme.space("xs")
  }
}))

export { Settings }
