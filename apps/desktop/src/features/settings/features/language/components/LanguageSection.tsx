import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

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
  const { t } = useTranslation()

  const language = useSettingsStore((state) => state.language)
  const setLanguage = useSettingsStore((state) => state.setLanguage)

  const { locales } = useTranslation()

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "language",
      title: t("settings.language.title"),
      description: t("settings.language.description"),
      renderLeft: () => <Icon name="Languages" />,
      children: (
        <Choicebox defaultValue={language} onValueChange={setLanguage}>
          {Object.values(locales).map((locale) => (
            <ChoiceboxItem value={locale.code} key={locale.code} className="gap-3">
              <Image
                className="h-4 w-auto shrink-0"
                containerClassName="rounded-sm"
                src={locale.flag}
                alt={locale.name}
              />
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{locale.name}</ChoiceboxItemTitle>
                <ChoiceboxItemDescription>
                  {locales[language].translations.languages[locale.code]}
                </ChoiceboxItemDescription>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator />
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

export { LanguageSection }
