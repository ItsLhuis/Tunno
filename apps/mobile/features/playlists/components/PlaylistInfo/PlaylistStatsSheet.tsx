import { View } from "react-native"

import { createStyleSheet, useStyles } from "@styles"

import { useTranslation } from "@repo/i18n"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

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

import { type PlaylistWithAllRelations } from "@repo/api"

type PlaylistStatsSheetProps = {
  playlist: PlaylistWithAllRelations
}

const PlaylistStatsSheet = ({ playlist }: PlaylistStatsSheetProps) => {
  const styles = useStyles(playlistStatsSheetStyles)

  const { t, i18n } = useTranslation()

  const totalTracks = playlist.totalTracks || 0
  const totalDuration = playlist.totalDuration || 0
  const playCount = playlist.playCount || 0
  const totalPlayTime = playlist.stats?.totalPlayTime ?? 0
  const lastPlayedAt = playlist.lastPlayedAt

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton name="ChartNoAxesCombined" variant="ghost" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("common.stats")}</SheetTitle>
          <View style={styles.playlistInfo}>
            <Thumbnail placeholderIcon="ListMusic" fileName={playlist.thumbnail} />
            <View style={styles.playlistDetails}>
              <Text numberOfLines={1}>{playlist.name}</Text>
            </View>
          </View>
        </SheetHeader>
        <Separator />
        <SheetScrollView>
          <View style={styles.content}>
            <Card>
              <CardTitle leftIcon="Music" color="mutedForeground">
                {t("songs.title")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatNumber(totalTracks)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Clock" color="mutedForeground">
                {t("common.duration")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatDuration(totalDuration, t)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="CirclePlay" color="mutedForeground">
                {t("common.totalPlays")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatNumber(playCount)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Clock4" color="mutedForeground">
                {t("common.listenTime")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {formatDuration(totalPlayTime, t)}
              </CardDescription>
            </Card>
            <Card>
              <CardTitle leftIcon="Play" color="mutedForeground">
                {t("common.lastPlayed")}
              </CardTitle>
              <CardDescription weight="bold" color="foreground">
                {lastPlayedAt
                  ? formatRelativeDate(lastPlayedAt, i18n.language, t)
                  : t("common.neverPlayed")}
              </CardDescription>
            </Card>
          </View>
        </SheetScrollView>
      </SheetContent>
    </Sheet>
  )
}

const playlistStatsSheetStyles = createStyleSheet(({ theme }) => ({
  playlistInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  playlistDetails: {
    flex: 1,
    gap: theme.space("xs")
  },
  content: {
    gap: theme.space(),
    padding: theme.space("lg")
  }
}))

export { PlaylistStatsSheet }
