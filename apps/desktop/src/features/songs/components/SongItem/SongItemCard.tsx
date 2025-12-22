import { memo } from "react"

import { useTranslation } from "@repo/i18n"

import { useSongPlayback } from "./hooks"

import PlayingLottie from "@assets/lotties/Playing.json"
import Lottie from "lottie-react"

import { Fade, IconButton, Marquee, SafeLink, Thumbnail, Typography } from "@components/ui"

import { SongActions } from "../SongActions"

import { type SongItemCardProps } from "./types"

const SongItemCard = memo(
  ({ song, playSource = "songs", sourceContextId, queueIndex, playlistId }: SongItemCardProps) => {
    const { t } = useTranslation()

    const { isCurrentlyPlaying, isTrackLoading, handlePlaySong } = useSongPlayback(
      song.id,
      undefined,
      playSource,
      sourceContextId
    )

    return (
      <SongActions
        variant="context"
        songId={song.id}
        queueIndex={queueIndex}
        playlistId={playlistId}
      >
        <div className="group focus-within:bg-accent hover:bg-accent relative flex size-full flex-col items-start rounded p-2 transition-colors">
          <div className="mb-2 size-full">
            <Thumbnail
              placeholderIcon="Music"
              fileName={song.thumbnail}
              alt={song.name}
              containerClassName="size-full rounded"
              className="size-full"
            />
          </div>
          <div className="flex w-full items-start justify-between gap-2">
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <Marquee>
                <SafeLink to="/songs/$id" params={{ id: song.id.toString() }}>
                  <Typography className="w-full truncate">{song.name}</Typography>
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
            <div className="shrink-0 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <SongActions songId={song.id} queueIndex={queueIndex} playlistId={playlistId}>
                <IconButton name="MoreHorizontal" variant="secondary" tooltip={t("common.more")} />
              </SongActions>
            </div>
            <div className="absolute right-4 bottom-5 -z-10 shrink-0 opacity-100 transition-opacity group-focus-within:opacity-0 group-hover:opacity-0">
              <Fade show={isCurrentlyPlaying}>
                <Lottie animationData={PlayingLottie} className="size-5" />
              </Fade>
            </div>
          </div>
          <div className="absolute right-2 bottom-13 z-10 opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100">
            <div className="relative">
              <IconButton
                name={isCurrentlyPlaying ? "Pause" : "Play"}
                tooltip={isCurrentlyPlaying ? t("common.pause") : t("common.play")}
                onClick={handlePlaySong}
                isLoading={isTrackLoading}
              />
            </div>
          </div>
        </div>
      </SongActions>
    )
  }
)

export { SongItemCard }
