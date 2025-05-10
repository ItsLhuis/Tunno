import { useEffect, useState } from "react"

import { getVersion } from "@tauri-apps/api/app"

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
  Icon,
  Image,
  toast,
  Typography
} from "@components/ui"

function getRandomPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve("Success") : reject("Error")
    }, 5000)
  })
}

function Settings() {
  const { setTheme } = useTheme()

  const { setLanguage, language } = useSettingsStore()

  const [open, setOpen] = useState(false)

  const { locales } = useTranslation()

  const [version, setVersion] = useState<string | null>(null)

  useEffect(() => {
    const fetchVersion = async () => {
      const appVersion = await getVersion()
      setVersion(appVersion)
    }
    fetchVersion()
  }, [])

  return (
    <div className="m-9 flex flex-col gap-3">
      {version && <Typography>App Version: {version}</Typography>}
      <Button
        onClick={() =>
          toast.promise(getRandomPromise, {
            loading: "Loading",
            success: "Success",
            error: "Error",
            description:
              "Vivamus maximus. Morbi non eros vitae diam lacinia mattis. Aliquam pharetra enim vitae leo condimentum molestie",
            cancel: { label: "Cancel", onClick: () => {} },
            action: { label: "Continue", onClick: () => {} }
          })
        }
      >
        Show Toast
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Icon
              name="Sun"
              className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0"
            />
            <Icon
              name="Moon"
              className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
            />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        size="icon"
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <Image
          className="aspect-4/3 h-3"
          src={locales[language].flag}
          alt={locales[language].name}
        />
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
    </div>
  )
}

export default Settings
