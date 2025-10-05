import { useTranslation } from "@repo/i18n"

import { Header, Icon, Typography } from "@components/ui"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistInfoStatsProps = {
  artist: ArtistWithAllRelations
}

const ArtistInfoStats = ({ artist }: ArtistInfoStatsProps) => {
  const { t, i18n } = useTranslation()

  const totalTracks = artist.totalTracks || 0
  const totalDuration = artist.totalDuration || 0
  const playCount = artist.playCount || 0
  const lastPlayedAt = artist.lastPlayedAt

  return (
    <Header className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Music" />
          <Typography className="truncate">{t("songs.title")}</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatNumber(totalTracks)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Clock" />
          <Typography className="truncate">{t("common.duration")}</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatDuration(totalDuration, t)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="TrendingUp" />
          <Typography className="truncate">{t("common.averageListenTime")}</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {playCount > 0
            ? formatDuration(Math.round(totalDuration / playCount), t)
            : formatDuration(0, t)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="PlayCircle" />
          <Typography className="truncate">{t("common.totalPlays")}</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatNumber(playCount)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Play" />
          <Typography className="truncate">{t("common.lastPlayed")}</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {lastPlayedAt
            ? formatRelativeDate(lastPlayedAt, i18n.language, t)
            : t("common.neverPlayed")}
        </Typography>
      </div>
    </Header>
  )
}

export { ArtistInfoStats }
