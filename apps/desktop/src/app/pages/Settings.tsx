import { Fragment, useState } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@repo/i18n"

import {
  Button,
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Header,
  Icon,
  Image,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components/ui"

function Settings() {
  const { t } = useTranslation()

  const { setTheme, theme } = useTheme()

  const { setLanguage, language } = useSettingsStore()

  const { locales } = useTranslation()

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "theme",
      title: t("settings.theme.title"),
      description: t("settings.theme.description"),
      renderRight: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icon name={theme === "system" ? "Laptop" : theme === "dark" ? "Moon" : "Sun"} />
              <Typography>{t(`settings.theme.${theme}`)}</Typography>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    {
      key: "language",
      title: t("settings.language.title"),
      description: t("settings.language.description"),
      renderRight: () => {
        const [open, setOpen] = useState<boolean>(false)

        return (
          <Fragment>
            <Button variant="outline" onClick={() => setOpen(true)}>
              <Image
                className="aspect-4/3 h-3"
                src={locales[language].flag}
                alt={locales[language].name}
              />
              <Typography>{locales[language].name}</Typography>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
              <Command>
                <CommandInput placeholder="Search language" />
                <CommandList>
                  <CommandEmpty>No results found</CommandEmpty>
                  <CommandGroup heading="Languages">
                    {Object.values(locales).map((locale) => (
                      <CommandItem
                        key={locale.code}
                        onSelect={() => {
                          setLanguage(locale.code)
                          setOpen(false)
                        }}
                        className="flex cursor-pointer flex-col items-start"
                      >
                        <div className="grid grid-cols-[auto,1fr] items-center gap-1 gap-x-2">
                          <Image className="aspect-4/3 h-3" src={locale.flag} alt={locale.name} />
                          <Typography>{locale.name}</Typography>
                          <Typography affects={["small", "muted"]} className="col-start-2">
                            {locale.code}
                          </Typography>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>
          </Fragment>
        )
      }
    },
    {
      key: "sync",
      title: t("settings.sync.title"),
      description: t("settings.sync.description"),
      renderLeft: () => (
        <Button variant="outline" size="icon">
          Ola
        </Button>
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

export default Settings
