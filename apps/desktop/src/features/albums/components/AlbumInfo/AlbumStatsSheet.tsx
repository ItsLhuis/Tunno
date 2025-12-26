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
  Separator,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Thumbnail,
  Typography
} from "@components/ui"

import { type AlbumWithAllRelations } from "@repo/api"

type AlbumStatsSheetProps = {
  album: AlbumWithAllRelations
}

const AlbumStatsSheet = ({ album }: AlbumStatsSheetProps) => {
  const { t, i18n } = useTranslation()

  const totalTracks = album.totalTracks || 0
  const totalDuration = album.totalDuration || 0
  const playCount = album.playCount || 0
  const totalPlayTime = album.stats?.totalPlayTime ?? 0
  const lastPlayedAt = album.lastPlayedAt

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
            <Thumbnail placeholderIcon="Disc" fileName={album.thumbnail} alt={album.name} />
            <div className="flex w-full flex-col gap-1 truncate">
              <Marquee>
                <SafeLink to="/albums/$id" params={{ id: album.id.toString() }}>
                  <Typography className="truncate">{album.name}</Typography>
                </SafeLink>
              </Marquee>
              <Marquee>
                {album.artists.length > 0 ? (
                  album.artists.map((artist, index) => (
                    <span key={artist.artistId}>
                      <SafeLink to="/artists/$id" params={{ id: artist.artistId.toString() }}>
                        <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                      </SafeLink>
                      {index < album.artists.length - 1 && (
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
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

export { AlbumStatsSheet }
