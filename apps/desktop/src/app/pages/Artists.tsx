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

export default Artists
