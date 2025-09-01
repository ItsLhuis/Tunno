import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

const Albums = () => {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("albums.title")}</Typography>
    </div>
  )
}

export { Albums }
