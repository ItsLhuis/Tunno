import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

function Home() {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("home.title")}</Typography>
    </div>
  )
}

export default Home
