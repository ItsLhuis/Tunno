import { useTranslation } from "@repo/i18n"

import { Header, Typography } from "@components/ui"

import { ProcessingControls } from "./ProcessingControls"
import { ProgressSection } from "./ProgressSection"

const FastUploadHeader = () => {
  const { t } = useTranslation()

  return (
    <Header className="space-y-6 pb-6">
      <div className="flex w-full items-center gap-3">
        <Typography variant="h1" className="truncate">
          {t("fastUpload.title")}
        </Typography>
        <ProcessingControls className="ml-auto" />
      </div>
      <ProgressSection />
    </Header>
  )
}

export { FastUploadHeader }
