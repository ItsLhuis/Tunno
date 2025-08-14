import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/playlists")({
  component: Playlists
})

import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function Playlists() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("playlists.title")}</Typography>
    </div>
  )
}
