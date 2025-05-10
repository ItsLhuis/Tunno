import { useTranslation } from "@repo/i18n"

import NotFound from "@assets/lotties/NotFound.json"
import Lottie from "lottie-react"

import { Typography } from "@components/ui"

function Favorites() {
  const { t } = useTranslation()

  return (
    <div className="flex-1 p-9">
      <Typography variant="h1">{t("favorites.title")}</Typography>
      <Lottie animationData={NotFound} className="size-60" />
    </div>
  )
}

export default Favorites
