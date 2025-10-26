import { useTranslation } from "@repo/i18n"

import { open } from "@tauri-apps/plugin-shell"

import { Header, IconButton, Typography } from "@components/ui"

import { ProcessingControls } from "./ProcessingControls"
import { ProgressSection } from "./ProgressSection"

const FastUploadHeader = () => {
  const { t } = useTranslation()

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
          <Typography variant="p" affects={["muted", "small"]}>
            {t("fastUpload.description")}
          </Typography>
          <IconButton
            name="ExternalLink"
            variant="text"
            tooltip={t("fastUpload.cliTooltip")}
            onClick={() => open("https://github.com/ItsLhuis/Tunno/blob/main/apps/cli/README.md")}
          />
        </div>
      </div>
      <ProgressSection />
    </Header>
  )
}

export { FastUploadHeader }
