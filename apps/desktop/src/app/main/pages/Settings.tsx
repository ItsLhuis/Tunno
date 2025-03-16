import { useTheme } from "@contexts/ThemeContext"

import { useSettingsStore } from "@stores/useSettingsStore"

import { useTranslation } from "@i18n/hooks"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Icon,
  Image
} from "@components/ui"

import { toast } from "sonner"

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

  const { languages } = useTranslation()

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
            <Image
              className="size-4"
              src={languages[language].flag}
              alt={languages[language].name}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {Object.values(languages).map((language) => {
            return (
              <DropdownMenuItem key={language.code} onClick={() => setLanguage(language.code)}>
                <Image className="size-4" src={language.flag} alt={language.name} />
                {language.name}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Settings
