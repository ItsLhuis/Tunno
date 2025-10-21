import { useTranslation } from "@repo/i18n"

import { Icon, Typography } from "@components/ui"

import { formatNumber } from "@repo/utils"

import { type UserStats } from "@repo/api"

type YourStatsProps = {
  stats: UserStats | null
}

const YourStats = ({ stats }: YourStatsProps) => {
  const { t } = useTranslation()

  if (!stats) return null

  return (
    <section className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.yourStats.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.yourStats.description")}</Typography>
      </div>
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Music" />
            <Typography className="truncate">{t("songs.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalSongs)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Users" />
            <Typography className="truncate">{t("artists.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalArtists)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Disc" />
            <Typography className="truncate">{t("albums.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalAlbums)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="List" />
            <Typography className="truncate">{t("playlists.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalPlaylists)}
          </Typography>
        </div>
      </div>
    </section>
  )
}

export { YourStats }
