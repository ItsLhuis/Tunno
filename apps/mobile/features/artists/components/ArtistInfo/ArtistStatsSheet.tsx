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

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistStatsSheetProps = {
  artist: ArtistWithAllRelations
}

const ArtistStatsSheet = ({ artist }: ArtistStatsSheetProps) => {
  const styles = useStyles(artistStatsSheetStyles)

  const { t, i18n } = useTranslation()

  const totalTracks = artist.totalTracks || 0
  const totalDuration = artist.totalDuration || 0
  const playCount = artist.playCount || 0
  const totalPlayTime = artist.stats?.totalPlayTime ?? 0
  const lastPlayedAt = artist.lastPlayedAt

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton name="ChartNoAxesCombined" variant="ghost" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("common.stats")}</SheetTitle>
          <View style={styles.artistInfo}>
            <Thumbnail placeholderIcon="User" fileName={artist.thumbnail} />
            <View style={styles.artistDetails}>
              <Text numberOfLines={1}>{artist.name}</Text>
              <Text size="sm" color="mutedForeground" numberOfLines={1}>
                {t("common.songsPlayed", { count: totalTracks })}
              </Text>
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

const artistStatsSheetStyles = createStyleSheet(({ theme }) => ({
  artistInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  artistDetails: {
    flex: 1,
    gap: theme.space("xs")
  },
  content: {
    gap: theme.space(),
    padding: theme.space("lg")
  }
}))

export { ArtistStatsSheet }
