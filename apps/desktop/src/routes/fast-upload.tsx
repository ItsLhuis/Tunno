import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/fast-upload")({
  component: FastUpload
})

import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function FastUpload() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("fastUpload.title")}</Typography>
    </div>
  )
}
