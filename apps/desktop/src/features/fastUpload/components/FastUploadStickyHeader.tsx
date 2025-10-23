import { useTranslation } from "@repo/i18n"

import { cn } from "@lib/utils"

import { StickyHeader, Typography } from "@components/ui"

import { ProcessingControls } from "./ProcessingControls"
import { ProgressSection } from "./ProgressSection"

type FastUploadStickyHeaderProps = {
  className?: string
}

const FastUploadStickyHeader = ({ className }: FastUploadStickyHeaderProps) => {
  const { t } = useTranslation()

  return (
    <StickyHeader className={cn("flex w-full flex-col gap-6 pb-6", className)}>
      <div className="flex w-full items-center gap-3">
        <Typography variant="h4" className="truncate">
          {t("fastUpload.title")}
        </Typography>
        <ProcessingControls className="ml-auto" />
      </div>
      <ProgressSection />
    </StickyHeader>
  )
}

export { FastUploadStickyHeader }
