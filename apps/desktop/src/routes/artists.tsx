import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/artists")({
  component: Artists
})

import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function Artists() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("artists.title")}</Typography>
    </div>
  )
}
