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
  Header,
  Icon,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

type ThemeValue = "light" | "dark" | "system"

type ThemeOption = {
  value: ThemeValue
  name: string
  icon: ReactElement
}

const Appearance = () => {
  const { t } = useTranslation()

  const { theme, setTheme } = useTheme()

  const themes: ThemeOption[] = [
    {
      value: "light",
      name: t("settings.appearance.light"),
      icon: <Icon name="Sun" />
    },
    {
      value: "dark",
      name: t("settings.appearance.dark"),
      icon: <Icon name="Moon" />
    },
    {
      value: "system",
      name: t("settings.appearance.system"),
      icon: <Icon name="Laptop" />
    }
  ]

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "theme",
      title: t("settings.appearance.title"),
      description: t("settings.appearance.description"),
      renderLeft: () => <Icon name="Palette" className="mt-1" />,
      children: (
        <Choicebox defaultValue={theme} onValueChange={setTheme}>
          {themes.map((theme) => (
            <ChoiceboxItem value={theme.value} key={theme.value} className="gap-3">
              {theme.icon}
              <ChoiceboxItemHeader>
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
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <Typography variant="h1" className="truncate">
              {t("settings.appearance.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.appearance.title")}
            </Typography>
          </StickyHeader>
        )
      }}
    >
      <div className="flex flex-col gap-9">
        {settings.map((setting) => (
          <SettingButton
            key={setting.key}
            title={setting.title}
            description={setting.description}
            renderLeft={setting.renderLeft}
            renderRight={setting.renderRight}
            children={setting.children}
          />
        ))}
      </div>
    </ScrollAreaWithHeaders>
  )
}

export { Appearance }
