import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { cn } from "@lib/utils"

import { Marquee, Thumbnail, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const currentTrack = usePlayerStore((state) => state.currentTrack)

  return (
    <div className="flex h-full items-center gap-3 truncate">
      <Thumbnail
        placeholderIcon="Music"
        fileName={currentTrack?.thumbnail}
        alt={currentTrack?.title}
        containerClassName={cn("size-14 shrink-0", currentTrack?.thumbnail && "border-none")}
        className={currentTrack?.thumbnail ? "size-14" : "size-6"}
      />
      {currentTrack ? (
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography variant="h5" className="text-primary">
              {currentTrack.title}
            </Typography>
          </Marquee>
          <Marquee>
            {currentTrack.artist ? (
              currentTrack.artists.map((artist, index) => (
                <span key={artist.artistId}>
                  <Typography affects={["small", "muted"]}>{artist.artist.name}</Typography>
                  {index < currentTrack.artists.length - 1 && (
                    <Typography affects={["small", "muted"]}>, </Typography>
                  )}
                </span>
              ))
            ) : (
              <Typography affects={["small", "muted"]}>{t("common.unknownArtist")}</Typography>
            )}
          </Marquee>
        </div>
      ) : (
        <Typography affects={["muted", "small"]}>{t("common.noSongPlaying")}</Typography>
      )}
    </div>
  )
}

export { TrackInfo }
