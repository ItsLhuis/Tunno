import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useSongPlayback } from "./hooks"

import { Badge, IconButton, SafeLink, Thumbnail, Typography } from "@components/ui"

import { SongActions } from "../SongActions"

import { formatTime } from "@repo/utils"

import { type SongItemHeroProps } from "./types"

const SongItemHero = memo(
  ({
    song,
    playSource = "songs",
    sourceContextId,
    queueIndex,
    playlistId,
    heroLabel
  }: SongItemHeroProps) => {
    const { t } = useTranslation()

    const { isCurrentlyPlaying, isTrackLoading, handlePlaySong } = useSongPlayback(
      song.id,
      undefined,
      playSource,
      sourceContextId
    )

    return (
      <div className="flex flex-1 items-end gap-6">
        <div
          className="shrink-0"
          style={{
            width: "clamp(20rem, 20vw, 35rem)",
            height: "clamp(20rem, 20vw, 35rem)"
          }}
        >
          <Thumbnail
            placeholderIcon="Music"
            fileName={song.thumbnail}
            alt={song.name}
            className={song.thumbnail ? "size-full" : "size-24"}
            containerClassName="size-full"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <div className="flex flex-1 flex-col gap-2">
            {heroLabel && (
              <Badge variant="muted" className="w-fit">
                {heroLabel}
              </Badge>
            )}
            <SafeLink to="/songs/$id" params={{ id: song.id.toString() }}>
              <Typography
                variant="h1"
                className="line-clamp-1 text-4xl break-all md:text-6xl lg:text-7xl xl:text-8xl"
              >
                {song.name}
              </Typography>
            </SafeLink>
            <div className="flex items-end gap-1">
              {song.artists.length > 0 ? (
                <SafeLink to="/artists/$id" params={{ id: song.artists[0].artistId.toString() }}>
                  <Typography affects={["small"]}>{song.artists[0].artist.name}</Typography>{" "}
                  <Typography affects={["small", "muted"]}>•</Typography>
                </SafeLink>
              ) : (
                <Typography affects={["small", "muted"]}>{t("common.unknownArtist")} •</Typography>
              )}
              {song.album ? (
                <SafeLink to="/albums/$id" params={{ id: song.album.id.toString() }}>
                  <Typography affects={["small", "muted"]}>{song.album.name}</Typography>
                </SafeLink>
              ) : (
                <Typography affects={["small", "muted"]}>{t("common.unknownAlbum")}</Typography>
              )}
              {song.releaseYear && (
                <div className="leading-none">
                  <Typography affects={["small", "muted"]}>• {song.releaseYear}</Typography>
                </div>
              )}
              <div className="leading-none">
                <Typography affects={["small", "muted"]}>• {formatTime(song.duration)}</Typography>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 pt-3">
            <IconButton
              name={isCurrentlyPlaying ? "Pause" : "Play"}
              className="size-14 shrink-0 rounded-full [&_svg]:size-7"
              tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
              onClick={handlePlaySong}
              isLoading={isTrackLoading}
            />
            <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId} />
          </div>
        </div>
      </div>
    )
  }
)

export { SongItemHero }
