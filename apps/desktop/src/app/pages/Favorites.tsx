import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function Favorites() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("favorites.title")}</Typography>
    </div>
  )
}

export default Favorites
