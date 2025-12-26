import { useTranslation } from "@repo/i18n"

import {
  calculateRetentionRate,
  calculateStreak,
  formatDuration,
  formatNumber,
  formatRelativeDate
} from "@repo/utils"

import {
  Card,
  CardDescription,
  CardTitle,
  Icon,
  IconButton,
  Marquee,
  SafeLink,
  ScrollArea,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Thumbnail,
  Typography
} from "@components/ui"

import StreakLottie from "@assets/lotties/Streak.json"
import Lottie from "lottie-react"

import { type SongWithAllRelations } from "@repo/api"

type SongStatsSheetProps = {
  song: SongWithAllRelations
}

const SongStatsSheet = ({ song }: SongStatsSheetProps) => {
  const { t, i18n } = useTranslation()

  const playCount = song.playCount || 0
  const totalPlayTime = song.stats?.totalPlayTime ?? 0
  const playHistory = song.playHistory ?? []

  const averageListenTime = playCount > 0 ? Math.round(totalPlayTime / playCount) : 0

  const retentionRate = calculateRetentionRate(playHistory, song.duration)
  const streak = calculateStreak(playHistory)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton
          name="ChartNoAxesCombined"
          tooltip={t("common.stats")}
          variant="ghost"
          className="shrink-0"
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-0 p-0">
        <SheetHeader className="flex flex-col gap-6 p-6">
          <SheetTitle>{t("common.stats")}</SheetTitle>
          <div className="flex items-center gap-3">
            <Thumbnail placeholderIcon="Music" fileName={song.thumbnail} alt={song.name} />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/songs/$id" params={{ id: song.id.toString() }}>
                  <Typography className="truncate">{song.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                {song.artists.length > 0 ? (
                  song.artists.map((artist, index) => (
                    <span key={artist.artistId}>
                      <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                        <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                      </SafeLink>
                      {index < song.artists.length - 1 && (
                        <Typography affects={["muted", "small"]}>, </Typography>
                      )}
                    </span>
                  ))
                ) : (
                  <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
                )}
              </Marquee>
            </div>
          </div>
        </SheetHeader>
        <Separator />
        <ScrollArea className="h-full">
          <div className="p-6">
            <div className="flex flex-col gap-3">
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
                    {streak >= 2 && (
                      <Lottie animationData={StreakLottie} className="-mt-1 h-6 w-6" />
                    )}
                  </div>
                </CardDescription>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export { SongStatsSheet }
