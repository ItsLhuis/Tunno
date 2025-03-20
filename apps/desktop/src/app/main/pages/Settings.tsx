import { useState } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@i18n/hooks"

import {
  Button,
  Command,
  CommandDialog,
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
  toast
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

  return (
    <div className="flex flex-col gap-3 m-9">
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
      <Button variant="outline" className="flex items-center gap-2" onClick={() => setOpen(true)}>
        <Image
          className="h-3 aspect-4/3"
          src={locales[language].flag}
          alt={locales[language].name}
        />
        {locales[language].name}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandGroup heading="Languages">
              {Object.values(locales).map((locale) => (
                <CommandItem
                  key={locale.code}
                  onSelect={() => {
                    setLanguage(locale.code)
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Image className="h-4 w-6 rounded" src={locale.flag} alt={locale.name} />
                  {locale.name}
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
