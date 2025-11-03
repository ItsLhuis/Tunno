import { useTranslation } from "@repo/i18n"

import { formatDuration, formatNumber } from "@repo/utils"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Typography
} from "@components/ui"

import { AlbumItem } from "@features/albums/components/AlbumItem"
import { ArtistItem } from "@features/artists/components/ArtistItem"
import { PlaylistItem } from "@features/playlists/components/PlaylistItem"
import { SongItem } from "@features/songs/components/SongItem"

import { type UserStats } from "@repo/api"

type YourStatsProps = {
  stats: UserStats | null
}

const YourStats = ({ stats }: YourStatsProps) => {
  const { t } = useTranslation()

  if (!stats) return null

  const topItems = [
    stats.topSong ? { type: "song" as const, data: stats.topSong } : null,
    stats.topAlbum ? { type: "album" as const, data: stats.topAlbum } : null,
    stats.topPlaylist ? { type: "playlist" as const, data: stats.topPlaylist } : null,
    stats.topArtist ? { type: "artist" as const, data: stats.topArtist } : null
  ].filter(Boolean)

  const hasTopItems = topItems.length > 0

  return (
    <section className="flex w-full flex-col gap-8">
      <div className="flex flex-col gap-1">
        <Typography variant="h3">{t("home.yourStats.title")}</Typography>
        <Typography affects={["muted", "small"]}>{t("home.yourStats.description")}</Typography>
      </div>
      <div className="grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Music" />
            <Typography className="truncate">{t("songs.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalSongs)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Disc" />
            <Typography className="truncate">{t("albums.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalAlbums)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="List" />
            <Typography className="truncate">{t("playlists.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalPlaylists)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Users" />
            <Typography className="truncate">{t("artists.title")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalArtists)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Play" />
            <Typography className="truncate">{t("common.totalPlays")}</Typography>
          </div>
          <Typography affects={["bold", "medium"]} className="truncate">
            {formatNumber(stats.totalPlayCount)}
          </Typography>
        </div>
        <div className="min-w-0 truncate">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Icon name="Clock" />
            <Typography className="truncate">{t("common.listenTime")}</Typography>
          </div>
          <div className="relative flex items-center truncate">
            <Typography affects={["bold", "medium"]} className="truncate">
              {formatDuration(stats.totalPlayTime, t)}
            </Typography>
            <Popover>
              <PopoverTrigger asChild>
                <IconButton name="ChevronDown" variant="link" className="shrink-0" />
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="flex flex-col gap-3">
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Calendar" />
                      <Typography className="truncate">{t("common.today")}</Typography>
                    </div>
                    <Typography affects={["bold", "medium"]} className="truncate">
                      {t("common.songsPlayed", { count: stats.recentActivity.songsPlayedToday })}{" "}
                      •{" "}
                    </Typography>
                    <Typography affects={["muted", "small"]} className="truncate">
                      {formatDuration(stats.recentActivity.timeListenedToday, t, { maxParts: 2 })}
                    </Typography>
                  </div>
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="CalendarRange" />
                      <Typography className="truncate">{t("common.thisWeek")}</Typography>
                    </div>
                    <Typography affects={["bold", "medium"]} className="truncate">
                      {t("common.songsPlayed", { count: stats.recentActivity.songsPlayedThisWeek })}{" "}
                      •{" "}
                    </Typography>
                    <Typography affects={["muted", "small"]} className="truncate">
                      {formatDuration(stats.recentActivity.timeListenedThisWeek, t, {
                        maxParts: 2
                      })}
                    </Typography>
                  </div>
                  <div className="min-w-0 truncate">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="CalendarDays" />
                      <Typography className="truncate">{t("common.thisMonth")}</Typography>
                    </div>
                    <Typography affects={["bold", "medium"]} className="truncate">
                      {t("common.songsPlayed", {
                        count: stats.recentActivity.songsPlayedThisMonth
                      })}{" "}
                      •{" "}
                    </Typography>
                    <Typography affects={["muted", "small"]} className="truncate">
                      {formatDuration(stats.recentActivity.timeListenedThisMonth, t, {
                        maxParts: 2
                      })}
                    </Typography>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      {hasTopItems && (
        <Carousel
          opts={{
            loop: true,
            align: "start"
          }}
          className="-mx-9"
        >
          <CarouselContent containerClassName="px-11">
            {topItems.map((item, index) => {
              if (!item) return null

              return (
                <CarouselItem key={index} className="basis-full">
                  {item.type === "song" && (
                    <SongItem
                      song={item.data}
                      variant="hero"
                      heroLabel={t("home.yourStats.topSong")}
                    />
                  )}
                  {item.type === "album" && (
                    <AlbumItem
                      album={item.data}
                      variant="hero"
                      heroLabel={t("home.yourStats.topAlbum")}
                    />
                  )}
                  {item.type === "artist" && (
                    <ArtistItem
                      artist={item.data}
                      variant="hero"
                      heroLabel={t("home.yourStats.topArtist")}
                    />
                  )}
                  {item.type === "playlist" && (
                    <PlaylistItem
                      playlist={item.data}
                      variant="hero"
                      heroLabel={t("home.yourStats.topPlaylist")}
                    />
                  )}
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className="ml-20" />
          <CarouselNext className="mr-20" />
        </Carousel>
      )}
    </section>
  )
}

export { YourStats }
