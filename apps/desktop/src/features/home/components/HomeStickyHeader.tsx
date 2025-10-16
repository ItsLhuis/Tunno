import { useTranslation } from "@repo/i18n"

import { StickyHeader, Typography } from "@components/ui"

const HomeStickyHeader = () => {
  const { t } = useTranslation()

  return (
    <StickyHeader className="flex items-center gap-3 pb-9">
      <Typography variant="h4" className="truncate">
        {t("home.title")}
      </Typography>
    </StickyHeader>
  )
}

export { HomeStickyHeader }
