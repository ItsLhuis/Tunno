import { useTranslation } from "@repo/i18n"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import { Card, CardDescription, CardTitle, Header, Icon, Typography } from "@components/ui"

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistInfoStatsProps = {
  playlist: PlaylistWithAllRelations
}

const PlaylistInfoStats = ({ playlist }: PlaylistInfoStatsProps) => {
  const { t, i18n } = useTranslation()

  const totalTracks = playlist.totalTracks || 0
  const totalDuration = playlist.totalDuration || 0
  const playCount = playlist.playCount || 0
  const totalPlayTime = playlist.stats?.totalPlayTime ?? 0
  const lastPlayedAt = playlist.lastPlayedAt

  return (
    <Header className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardTitle>
          <Icon name="Music" className="text-muted-foreground" />
          <Typography affects={["muted", "small"]} className="truncate">
            {t("songs.title")}
          </Typography>
        </CardTitle>
        <CardDescription>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(totalTracks)}
          </Typography>
        </CardDescription>
      </Card>
      <Card>
        <CardTitle>
          <Icon name="Clock" className="text-muted-foreground" />
          <Typography affects={["muted", "small"]} className="truncate">
            {t("common.duration")}
          </Typography>
        </CardTitle>
        <CardDescription>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatDuration(totalDuration, t)}
          </Typography>
        </CardDescription>
      </Card>
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
          <Icon name="Play" className="text-muted-foreground" />
          <Typography affects={["muted", "small"]} className="truncate">
            {t("common.lastPlayed")}
          </Typography>
        </CardTitle>
        <CardDescription>
          <Typography affects={["bold", "medium"]} className="truncate">
            {lastPlayedAt
              ? formatRelativeDate(lastPlayedAt, i18n.language, t)
              : t("common.neverPlayed")}
          </Typography>
        </CardDescription>
      </Card>
    </Header>
  )
}

export { PlaylistInfoStats }
