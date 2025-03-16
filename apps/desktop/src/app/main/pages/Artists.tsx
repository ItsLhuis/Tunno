import { useTranslation } from "@i18n/hooks"

import { Typography } from "@components/ui"

function Artists() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("pages.artists.title")}</Typography>
    </div>
  )
}

export default Artists
