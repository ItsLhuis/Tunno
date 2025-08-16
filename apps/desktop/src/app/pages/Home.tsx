import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

const Home = () => {
  const { t } = useTranslation()

  return (
    <div className="p-9">
      <Typography variant="h1">{t("home.title")}</Typography>
    </div>
  )
}

export { Home }
