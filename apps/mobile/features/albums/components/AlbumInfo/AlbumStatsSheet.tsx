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

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumStatsSheetProps = {
  album: AlbumWithAllRelations
}

const AlbumStatsSheet = ({ album }: AlbumStatsSheetProps) => {
  const styles = useStyles(albumStatsSheetStyles)

  const { t, i18n } = useTranslation()

  const totalTracks = album.totalTracks || 0
  const totalDuration = album.totalDuration || 0
  const playCount = album.playCount || 0
  const totalPlayTime = album.stats?.totalPlayTime ?? 0
  const lastPlayedAt = album.lastPlayedAt

  return (
    <Sheet>
      <SheetTrigger asChild>
        <IconButton name="ChartNoAxesCombined" variant="ghost" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t("common.stats")}</SheetTitle>
          <View style={styles.albumInfo}>
            <Thumbnail placeholderIcon="Disc" fileName={album.thumbnail} />
            <View style={styles.albumDetails}>
              <Text numberOfLines={1}>{album.name}</Text>
              {album.artists.length > 0 ? (
                <Text size="sm" color="mutedForeground" numberOfLines={1}>
                  {album.artists.map((a) => a.artist.name).join(", ")}
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

const albumStatsSheetStyles = createStyleSheet(({ theme }) => ({
  albumInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.space("sm")
  },
  albumDetails: {
    flex: 1,
    gap: theme.space("xs")
  },
  content: {
    gap: theme.space(),
    padding: theme.space("lg")
  }
}))

export { AlbumStatsSheet }
