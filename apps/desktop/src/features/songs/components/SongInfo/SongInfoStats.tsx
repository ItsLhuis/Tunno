import { useTranslation } from "@repo/i18n"

import { Header, Icon, Typography } from "@components/ui"

import {
  calculateRetentionRate,
  formatDuration,
  formatNumber,
  formatRelativeDate
} from "@repo/utils"

import { type SongWithAllRelations } from "@repo/api"

type SongInfoStatsProps = {
  song: SongWithAllRelations
}

const SongInfoStats = ({ song }: SongInfoStatsProps) => {
  const { t, i18n } = useTranslation()

  const totalPlayTime = song.stats?.totalPlayTime ?? 0
  const playCount = song.playCount || 0
  const playHistory = song.playHistory ?? []

  const averageListenTime = playCount > 0 ? Math.round(totalPlayTime / playCount) : 0

  const retentionRate = calculateRetentionRate(playHistory, song.duration)

  return (
    <Header className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="Clock" />
          <Typography className="truncate">Listen time</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatDuration(totalPlayTime, t)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="ClockFading" />
          <Typography className="truncate">Average listen time</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatDuration(averageListenTime, t)}
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="TrendingUp" />
          <Typography className="truncate">Retention rate</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {retentionRate.toFixed(1)}%
        </Typography>
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Icon name="PlayCircle" />
          <Typography className="truncate">Total plays</Typography>
        </div>
        <Typography affects={["bold", "medium"]} className="truncate">
          {formatNumber(playCount)}
        </Typography>
      </div>
      {song.lastPlayedAt && (
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Play" />
            <Typography className="truncate">Last played</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatRelativeDate(song.lastPlayedAt, i18n.language, t)}
          </Typography>
        </div>
      )}
    </Header>
  )
}

export { SongInfoStats }
