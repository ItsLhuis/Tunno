import { useTranslation } from "@repo/i18n"

import { formatDuration, formatNumber, formatRelativeDate } from "@repo/utils"

import {
  Card,
  CardDescription,
  CardTitle,
  Icon,
  IconButton,
  Marquee,
  SafeLink,
  ScrollArea,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  Thumbnail,
  Typography
} from "@components/ui"

import { type ArtistWithAllRelations } from "@repo/api"

type ArtistStatsSheetProps = {
  artist: ArtistWithAllRelations
}

const ArtistStatsSheet = ({ artist }: ArtistStatsSheetProps) => {
  const { t, i18n } = useTranslation()

  const totalTracks = artist.totalTracks || 0
  const totalDuration = artist.totalDuration || 0
  const playCount = artist.playCount || 0
  const totalPlayTime = artist.stats?.totalPlayTime ?? 0
  const lastPlayedAt = artist.lastPlayedAt

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
          <Typography variant="h3">{t("common.stats")}</Typography>
          <div className="flex items-center gap-3">
            <Thumbnail
              placeholderIcon="User"
              fileName={artist.thumbnail}
              alt={artist.name}
              className="rounded-full"
            />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/artists/$id" params={{ id: artist.id.toString() }}>
                  <Typography className="truncate">{artist.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                <Typography affects={["muted", "small"]}>
                  {t("common.songsPlayed", { count: totalTracks })}
                </Typography>
              </Marquee>
            </div>
          </div>
        </SheetHeader>
        <ScrollArea className="h-full p-6 pt-0">
          <div className="flex flex-col gap-3">
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export { ArtistStatsSheet }
