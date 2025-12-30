import { type ReactElement } from "react"

import { useTheme, type ThemeMode } from "@styles"

import { useTranslation } from "@repo/i18n"

import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemContent,
  ChoiceboxItemHeader,
  ChoiceboxItemIndicator,
  ChoiceboxItemTitle,
  Icon
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

type ThemeOption = {
  value: ThemeMode
  name: string
  icon: ReactElement
}

const ThemeSection = () => {
  const { t } = useTranslation()

  const { themeMode, setThemeMode } = useTheme()

  const themes: ThemeOption[] = [
    {
      value: "light",
      name: t("settings.appearance.theme.light"),
      icon: <Icon name="Sun" size="lg" />
    },
    {
      value: "dark",
      name: t("settings.appearance.theme.dark"),
      icon: <Icon name="Moon" size="lg" />
    },
    {
      value: "system",
      name: t("settings.appearance.theme.system"),
      icon: <Icon name="Smartphone" size="lg" />
    }
  ]

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "theme",
      title: t("settings.appearance.theme.title"),
      description: t("settings.appearance.theme.description"),
      renderLeft: () => <Icon name="Palette" size="lg" color="mutedForeground" />,
      children: (
        <Choicebox value={themeMode} onValueChange={(value) => setThemeMode(value as ThemeMode)}>
          {themes.map((theme) => (
            <ChoiceboxItem value={theme.value} key={theme.value}>
              {theme.icon}
              <ChoiceboxItemHeader>
                <ChoiceboxItemTitle>{theme.name}</ChoiceboxItemTitle>
              </ChoiceboxItemHeader>
              <ChoiceboxItemContent>
                <ChoiceboxItemIndicator value={theme.value} />
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

export { ThemeSection }
