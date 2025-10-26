import { useTranslation } from "@repo/i18n"

import { open } from "@tauri-apps/plugin-shell"

import { cn } from "@lib/utils"

import { IconButton, StickyHeader, Typography } from "@components/ui"

import { ProcessingControls } from "./ProcessingControls"
import { ProgressSection } from "./ProgressSection"

type FastUploadStickyHeaderProps = {
  className?: string
}

const FastUploadStickyHeader = ({ className }: FastUploadStickyHeaderProps) => {
  const { t } = useTranslation()

  return (
    <StickyHeader className={cn("flex w-full flex-col gap-6 pb-6", className)}>
      <div>
        <div className="flex w-full items-center gap-3">
          <Typography variant="h4" className="truncate">
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
    </StickyHeader>
  )
}

export { FastUploadStickyHeader }
