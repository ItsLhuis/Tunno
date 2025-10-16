import { useTranslation } from "@repo/i18n"

import { Typography } from "@components/ui"

import { type UserStats } from "@repo/api"

type YourStatsProps = {
  stats: UserStats | null
}

const YourStats = ({ stats }: YourStatsProps) => {
  const { t } = useTranslation()

  if (!stats) return null

  return (
    <section className="flex w-full flex-col gap-3">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.yourStats.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.yourStats.description")}</Typography>
      </div>
    </section>
  )
}

export { YourStats }
