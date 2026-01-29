import { createStyleSheet, useStyles } from "@styles"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation, type LocaleKeys } from "@repo/i18n"

import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
  Icon,
  Image
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

const LanguageSection = () => {
  const styles = useStyles(languageSectionStyles)

  const { t, i18n, locales } = useTranslation()

  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "language",
      title: t("settings.language.title"),
      description: t("settings.language.description"),
      renderLeft: () => <Icon name="Languages" size="lg" color="mutedForeground" />,
      children: (
        <Choicebox value={language} onValueChange={(value) => setLanguage(value as LocaleKeys)}>
          {Object.values(locales).map((locale) => (
            <ChoiceboxItem value={locale.code} key={locale.code}>
              <Image source={locale.flag} style={styles.flagImage} contentFit="cover" />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{locale.name}</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>
                  {
                    locales[i18n.language as keyof typeof locales]?.translations.languages[
                      locale.code as keyof typeof locales
                    ]
                  }
                </ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value={locale.code} />
              </ChoiceboxItemContent>
            </ChoiceboxItem>
          ))}
        </Choicebox>
      )
    }
  ]

  return (
    <SettingButton
      key={settings[0].key}
      title={settings[0].title}
      description={settings[0].description}
      renderLeft={settings[0].renderLeft}
      renderRight={settings[0].renderRight}
      children={settings[0].children}
    />
  )
}

const languageSectionStyles = createStyleSheet(({ theme }) => ({
  flagImage: {
    width: theme.size(6),
    height: theme.size(4),
    borderRadius: theme.radius("sm")
  }
}))

export { LanguageSection }
