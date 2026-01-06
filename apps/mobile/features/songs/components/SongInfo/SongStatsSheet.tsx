import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import {
  calculateRetentionRate,
  calculateStreak,
  formatDuration,
  formatNumber,
  formatRelativeDate
} from "@repo/utils"

import StreakLottie from "@assets/lotties/Streak.json"
import LottieView from "lottie-react-native"

import {
  Card,
  CardDescription,
  CardTitle,
  IconButton,
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetScrollView,
  SheetTitle,
  SheetTrigger,
  Text,
  Thumbnail
} from "@components/ui"

import { type SongWithAllRelations } from "@repo/api"

type SongStatsSheetProps = {
  song: SongWithAllRelations
}

const SongStatsSheet = ({ song }: SongStatsSheetProps) => {
  const styles = useStyles(songStatsSheetStyles)

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
        <IconButton name="ChartNoAxesCombined" variant="ghost" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("common.stats")}</SheetTitle>
          <View style={styles.songInfo}>
            <Thumbnail placeholderIcon="Music" fileName={song.thumbnail} />
            <View style={styles.songDetails}>
              <Text numberOfLines={1}>{song.name}</Text>
              {song.artists.length > 0 ? (
                <Text size="sm" color="mutedForeground" numberOfLines={1}>
                  {song.artists.map((a) => a.artist.name).join(", ")}
                </Text>
              ) : (
                <Text size="sm" color="mutedForeground" numberOfLines={1}>
                  {t("common.unknownArtist")}
                </Text>
              )}
            </View>
          </View>
        </SheetHeader>
        <Separator />
        <SheetScrollView>
          <View style={styles.content}>
            <Card>
              <CardTitle leftIcon="CirclePlay" color="mutedForeground">
                {t("common.totalPlays")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatNumber(playCount)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Clock" color="mutedForeground">
                {t("common.listenTime")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatDuration(totalPlayTime, t)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Clock4" color="mutedForeground">
                {t("common.averageListenTime")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatDuration(averageListenTime, t)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="TrendingUp" color="mutedForeground">
                {t("common.retentionRate")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {retentionRate.toFixed(1)}%
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Play" color="mutedForeground">
                {t("common.lastPlayed")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {song.lastPlayedAt
                  ? formatRelativeDate(song.lastPlayedAt, i18n.language, t)
                  : t("common.neverPlayed")}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Flame" color="mutedForeground">
                {t("common.streak")}
              </CardTitle>
              <View style={styles.streakValue}>
                <CardDescription weight="bold" color="foreground">
                  {formatNumber(streak)}
                </CardDescription>
                {streak >= 2 && (
                  <LottieView source={StreakLottie} autoPlay loop style={styles.streakLottie} />
                )}
              </View>
            </Card>
          </View>
        </SheetScrollView>
      </SheetContent>
    </Sheet>
  )
}

const songStatsSheetStyles = createStyleSheet(({ theme }) => ({
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  songDetails: {
    flex: 1,
    gap: theme.space("xs")
  },
  content: {
    gap: theme.space(),
    padding: theme.space("lg")
  },
  streakValue: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("xs")
  },
  streakLottie: {
    width: theme.size(6),
    height: theme.size(6)
  }
}))

export { SongStatsSheet }
