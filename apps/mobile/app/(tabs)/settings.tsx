import { useSafeAreaInsets } from "react-native-safe-area-context"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@i18n/hooks"

import { iconSize, spacing } from "@constants/styles"

import { View } from "react-native"

import { FadingScreen } from "@components/navigation"
import { Button, Header, Image, LargeHeader, ScrollViewWithHeaders, Text } from "@components/ui"

import { SettingButton } from "@features/settings/components"

type Setting = {
  id: string
  title: string
  description?: string | null | undefined
}

export default function Settings() {
  const insets = useSafeAreaInsets()

  const { language, setLanguage } = useSettingsStore()

  const { t, languages } = useTranslation()

  const data: Setting[] = [
    {
      id: "1",
      title: "Music",
      description: "Settings related to music playback, including audio preferences and playlists"
    },
    {
      id: "2",
      title: "General",
      description: "General app settings, such as language and notification preferences"
    },
    {
      id: "3",
      title: "Multimedia",
      description: "Adjustments for multimedia, such as video quality and image display settings"
    }
  ]

  return (
    <FadingScreen style={{ flex: 1 }}>
      <Text style={{ marginTop: insets.top + spacing.large }}>{t("settings.title")}</Text>
      <Image
        source={languages[language].flag}
        containerStyle={{ height: iconSize.large, aspectRatio: 4 / 3 }}
        style={{ flex: 1 }}
      />
      <Button title="English" onPress={() => setLanguage("en")} />
      <Button title="Spanish" onPress={() => setLanguage("es")} />
      <Button title="French" onPress={() => setLanguage("fr")} />
      <Button title="Portuguese" onPress={() => setLanguage("pt")} />
      <Button title="Chinese" onPress={() => setLanguage("zh")} />
      {/* <ScrollViewWithHeaders
        HeaderComponent={({ showHeader }) => (
          <Header
            showHeader={showHeader}
            headerCenter={
              <Text variant="bold" size="large" numberOfLines={1}>
                Settings
              </Text>
            }
          />
        )}
        LargeHeaderComponent={() => (
          <LargeHeader style={{ paddingBottom: spacing.small }}>
            <Text variant="bold" size="xxxLarge" numberOfLines={1}>
              Settings
            </Text>
          </LargeHeader>
        )}
        automaticallyAdjustsScrollIndicatorInsets={false}
        contentContainerStyle={{ paddingHorizontal: spacing.large, paddingBottom: insets.bottom }}
      >
        <View style={{ paddingTop: spacing.medium, gap: spacing.large }}>
          {data.map((item) => (
            <SettingButton key={item.id} title={item.title} description={item.description} />
          ))}
        </View>
      </ScrollViewWithHeaders> */}
    </FadingScreen>
  )
}
