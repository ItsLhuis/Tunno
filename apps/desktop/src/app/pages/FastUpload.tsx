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

export default FastUpload
