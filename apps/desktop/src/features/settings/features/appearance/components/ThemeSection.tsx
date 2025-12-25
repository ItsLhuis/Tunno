import { type ReactElement } from "react"

import { useTheme } from "@contexts/ThemeContext"

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

type ThemeValue = "light" | "dark" | "system"

type ThemeOption = {
  value: ThemeValue
  name: string
  icon: ReactElement
}

const ThemeSection = () => {
  const { t } = useTranslation()

  const { theme, setTheme } = useTheme()

  const themes: ThemeOption[] = [
    {
      value: "light",
      name: t("settings.appearance.theme.light"),
      icon: <Icon name="Sun" />
    },
    {
      value: "dark",
      name: t("settings.appearance.theme.dark"),
      icon: <Icon name="Moon" />
    },
    {
      value: "system",
      name: t("settings.appearance.theme.system"),
      icon: <Icon name="Laptop" />
    }
  ]

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "theme",
      title: t("settings.appearance.theme.title"),
      description: t("settings.appearance.theme.description"),
      renderLeft: () => <Icon name="Palette" className="mt-1" />,
      children: (
        <Choicebox defaultValue={theme} onValueChange={setTheme}>
          {themes.map((theme) => (
            <ChoiceboxItem value={theme.value} key={theme.value} className="gap-3">
              {theme.icon}
              <ChoiceboxItemHeader className="gap-0">
                <ChoiceboxItemTitle>{theme.name}</ChoiceboxItemTitle>
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

export { ThemeSection }
