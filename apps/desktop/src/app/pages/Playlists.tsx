import { useTranslation } from "@i18n/hooks"

import { Typography } from "@components/ui"

function Playlists() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("playlists.title")}</Typography>
    </div>
  )
}

export default Playlists
