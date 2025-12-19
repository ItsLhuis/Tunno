import { useTranslation } from "@repo/i18n"

import { Header, Typography } from "@components/ui"

const HomeHeader = () => {
  const { t } = useTranslation()

  return (
    <Header className="flex flex-col gap-6 pb-3">
      <Typography
        variant="h1"
        className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
      >
        {t("home.title")}
      </Typography>
    </Header>
  )
}

export { HomeHeader }
