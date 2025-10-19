import { useTranslation } from "@repo/i18n"

import { Header, Typography } from "@components/ui"

const HomeHeader = () => {
  const { t } = useTranslation()

  return (
    <Header className="flex flex-col gap-6 pb-9">
      <div className="flex flex-1 items-end gap-6">
        <Typography
          variant="h1"
          className="line-clamp-2 break-all text-4xl md:text-6xl lg:text-7xl xl:text-8xl"
        >
          {t("home.title")}
        </Typography>
      </div>
    </Header>
  )
}

export { HomeHeader }
