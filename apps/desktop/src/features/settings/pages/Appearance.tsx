import { useTheme } from "@contexts/ThemeContext"

import { useTranslation } from "@repo/i18n"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Header,
  Icon,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components/ui"

function Appearance() {
  const { t } = useTranslation()

  const { setTheme, theme } = useTheme()

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "theme",
      title: t("settings.appearance.title"),
      description: t("settings.appearance.description"),
      renderRight: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icon name={theme === "system" ? "Laptop" : theme === "dark" ? "Moon" : "Sun"} />
              <Typography>{t(`settings.appearance.${theme}`)}</Typography>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              {t("settings.appearance.light")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              {t("settings.appearance.dark")}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              {t("settings.appearance.system")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ]

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3 flex items-center gap-3">
            <Typography variant="h1" className="truncate">
              {t("settings.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.title")}
            </Typography>
          </StickyHeader>
        )
      }}
      containerClassName="overflow-x-hidden"
    >
      <div className="flex flex-col gap-6">
        {settings.map((setting) => (
          <SettingButton
            key={setting.key}
            title={setting.title}
            description={setting.description}
            renderRight={setting.renderRight}
          />
        ))}
      </div>
    </ScrollAreaWithHeaders>
  )
}

export default Appearance
