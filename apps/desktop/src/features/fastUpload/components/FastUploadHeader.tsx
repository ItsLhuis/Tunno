import { useTranslation } from "@repo/i18n"

import { open } from "@tauri-apps/plugin-shell"

import { Header, IconButton, SafeLink, Typography } from "@components/ui"

import { ProcessingControls } from "./ProcessingControls"
import { ProgressSection } from "./ProgressSection"

const FastUploadHeader = () => {
  const { t } = useTranslation()

  const handleOpenCliReadme = () => {
    open("https://github.com/ItsLhuis/Tunno/blob/main/apps/cli/README.md")
  }

  return (
    <Header className="space-y-6 pb-6">
      <div>
        <div className="flex w-full items-center gap-3">
          <Typography variant="h1" className="truncate">
            {t("fastUpload.title")}
          </Typography>
          <ProcessingControls className="ml-auto" />
        </div>
        <div className="flex items-center gap-1">
          <Typography
            variant="p"
            affects={["muted", "small"]}
            className="flex flex-row items-center gap-1"
          >
            {t("fastUpload.description")}{" "}
            <SafeLink to="/settings/sync">
              <Typography variant="p" affects={["muted", "small", "underline"]}>
                {t("settings.title")} → {t("settings.sync.title")}
              </Typography>
            </SafeLink>
          </Typography>
          <IconButton
            name="ExternalLink"
            variant="text"
            tooltip={t("fastUpload.cliTooltip")}
            onClick={handleOpenCliReadme}
          />
        </div>
      </div>
      <ProgressSection />
    </Header>
  )
}

export { FastUploadHeader }
