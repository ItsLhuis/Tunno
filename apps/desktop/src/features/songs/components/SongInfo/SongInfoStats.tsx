import { useTranslation } from "@repo/i18n"

import {
  calculateRetentionRate,
  calculateStreak,
  formatDuration,
  formatNumber,
  formatRelativeDate
} from "@repo/utils"

import { Fade, Header, Icon, Typography } from "@components/ui"

import StreakLottie from "@assets/lotties/Streak.json"
import Lottie from "lottie-react"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoStatsProps = {
  song: SongWithAllRelations
}

const SongInfoStats = ({ song }: SongInfoStatsProps) => {
  const { t, i18n } = useTranslation()

  const playCount = song.playCount || 0
  const totalPlayTime = song.stats?.totalPlayTime ?? 0
  const playHistory = song.playHistory ?? []

  const averageListenTime = playCount > 0 ? Math.round(totalPlayTime / playCount) : 0

  const retentionRate = calculateRetentionRate(playHistory, song.duration)
  const streak = calculateStreak(playHistory)

  return (
    <Fade show={Boolean(song)} mode="popLayout" className="w-full">
      <Header className="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="PlayCircle" />
            <Typography className="truncate">{t("common.totalPlays")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(playCount)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" />
            <Typography className="truncate">{t("common.listenTime")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatDuration(totalPlayTime, t)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="ClockFading" />
            <Typography className="truncate">{t("common.averageListenTime")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatDuration(averageListenTime, t)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="TrendingUp" />
            <Typography className="truncate">{t("common.retentionRate")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {retentionRate.toFixed(1)}%
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Play" />
            <Typography className="truncate">{t("common.lastPlayed")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {song.lastPlayedAt
              ? formatRelativeDate(song.lastPlayedAt, i18n.language, t)
              : t("common.neverPlayed")}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Flame" />
            <Typography className="truncate">{t("common.streak")}</Typography>
          </div>
          <div className="flex items-center gap-1">
            <Typography affects={["bold", "medium"]}>{formatNumber(streak)}</Typography>
            {streak >= 2 && <Lottie animationData={StreakLottie} className="-mt-1 h-6 w-6" />}
          </div>
        </div>
      </Header>
    </Fade>
  )
}

export { SongInfoStats }
