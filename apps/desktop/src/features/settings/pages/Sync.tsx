import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function Sync() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("settings.sync.title")}</Typography>
    </div>
  )
}

export default Sync
