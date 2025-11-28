import { useTranslation } from "@repo/i18n"

import {
  calculateRetentionRate,
  calculateStreak,
  formatDuration,
  formatNumber,
  formatRelativeDate
} from "@repo/utils"

import { Card, CardDescription, CardTitle, Fade, Header, Icon, Typography } from "@components/ui"

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
        <Card>
          <CardTitle>
            <Icon name="PlayCircle" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.totalPlays")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography affects={["bold", "medium"]} className="truncate">
              {formatNumber(playCount)}
            </Typography>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>
            <Icon name="Clock" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.listenTime")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography affects={["bold", "medium"]} className="truncate">
              {formatDuration(totalPlayTime, t)}
            </Typography>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>
            <Icon name="ClockFading" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.averageListenTime")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography affects={["bold", "medium"]} className="truncate">
              {formatDuration(averageListenTime, t)}
            </Typography>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>
            <Icon name="TrendingUp" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.retentionRate")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography affects={["bold", "medium"]} className="truncate">
              {retentionRate.toFixed(1)}%
            </Typography>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>
            <Icon name="Play" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.lastPlayed")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <Typography affects={["bold", "medium"]} className="truncate">
              {song.lastPlayedAt
                ? formatRelativeDate(song.lastPlayedAt, i18n.language, t)
                : t("common.neverPlayed")}
            </Typography>
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>
            <Icon name="Flame" className="text-muted-foreground" />
            <Typography affects={["muted", "small"]} className="truncate">
              {t("common.streak")}
            </Typography>
          </CardTitle>
          <CardDescription>
            <div className="flex items-center gap-1">
              <Typography affects={["bold", "medium"]}>{formatNumber(streak)}</Typography>
              {streak >= 2 && <Lottie animationData={StreakLottie} className="-mt-1 h-6 w-6" />}
            </div>
          </CardDescription>
        </Card>
      </Header>
    </Fade>
  )
}

export { SongInfoStats }
