import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { getName } from "@tauri-apps/api/app"
import { appDataDir } from "@tauri-apps/api/path"
import { revealItemInDir } from "@tauri-apps/plugin-opener"
import { open } from "@tauri-apps/plugin-shell"

import pkg from "../../../../package.json"

import Logo from "@assets/images/app/icons/primary.png"

import {
  Button,
  Header,
  Icon,
  Image,
  ScrollAreaWithHeaders,
  StickyHeader,
  Typography
} from "@components/ui"

import { SettingButton, type SettingButtonProps } from "@features/settings/components"

const About = () => {
  const { t } = useTranslation()

  const currentVersion = pkg.version

  const [appName, setAppName] = useState("")

  useEffect(() => {
    getName().then((name) => {
      setAppName(name)
    })
  }, [])

  const handleOpenAppDataFolder = async () => {
    const appDir = await appDataDir()
    await revealItemInDir(appDir)
  }

  const handleOpenGitHub = () => {
    open("https://github.com/ItsLhuis/Tunno")
  }

  const handleOpenLicense = () => {
    open("https://github.com/ItsLhuis/Tunno/blob/main/LICENSE")
  }

  const handleOpenChangelog = () => {
    open("https://github.com/ItsLhuis/Tunno/blob/main/apps/desktop/CHANGELOG.md")
  }

  const settings: (SettingButtonProps & { key: string })[] = [
    {
      key: "about",
      title: t("settings.about.title"),
      description: t("settings.about.description"),
      renderLeft: () => <Icon name="Info" className="mt-1" />,
      children: (
        <div className="flex items-center">
          <Image
            src={Logo}
            alt="App logo"
            containerClassName="bg-transparent border-none rounded-none"
            className="mr-3 aspect-auto w-6"
          />
          <div className="flex flex-col gap-1">
            <Typography>{appName}&nbsp;</Typography>
            <Typography affects={["small", "muted"]}>Version {currentVersion}</Typography>
          </div>
        </div>
      )
    },
    {
      key: "whatsNew",
      title: t("settings.about.whatsNew.title"),
      description: t("settings.about.whatsNew.description"),
      renderLeft: () => <Icon name="Sparkles" className="mt-1" />,
      children: (
        <Button variant="outline" size="sm" className="w-fit" onClick={handleOpenChangelog}>
          <Icon name="ExternalLink" />
          {t("settings.about.whatsNew.viewChangelog")}
        </Button>
      )
    },
    {
      key: "storage",
      title: t("settings.about.storage.title"),
      description: t("settings.about.storage.description"),
      renderLeft: () => <Icon name="Database" className="mt-1" />,
      children: (
        <Button variant="outline" size="sm" className="w-fit" onClick={handleOpenAppDataFolder}>
          <Icon name="FolderOpen" />
          {t("settings.about.storage.openDataFolder")}
        </Button>
      )
    },
    {
      key: "legal",
      title: t("settings.about.legal.title"),
      description: t("settings.about.legal.description"),
      renderLeft: () => <Icon name="FileText" className="mt-1" />,
      children: (
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Typography affects={["small", "muted"]}>
              {t("settings.about.legal.copyright")} © {new Date().getFullYear()} ItsLhuis
            </Typography>
            <Typography affects={["small", "muted"]}>
              {t("settings.about.legal.licensed")}
            </Typography>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleOpenLicense}>
              <Icon name="Scale" />
              {t("settings.about.legal.viewLicense")}
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenGitHub}>
              <Icon name="Github" />
              {t("settings.about.legal.viewOnGitHub")}
            </Button>
          </div>
        </div>
      )
    }
  ]

  return (
    <ScrollAreaWithHeaders
      HeaderComponent={() => {
        return (
          <Header className="mb-3">
            <Typography variant="h1" className="truncate">
              {t("settings.about.title")}
            </Typography>
          </Header>
        )
      }}
      StickyHeaderComponent={() => {
        return (
          <StickyHeader className="flex items-center gap-3 pb-9">
            <Typography variant="h4" className="truncate">
              {t("settings.about.title")}
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

export { About }
