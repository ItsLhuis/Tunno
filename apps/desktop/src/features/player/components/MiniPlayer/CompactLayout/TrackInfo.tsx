import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { Fade, Marquee, Thumbnail, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  return (
    <div className="flex h-full items-center gap-3 truncate">
      {currentTrack ? (
        <Fade>
          <Thumbnail
            placeholderIcon="Music"
            fileName={currentTrack?.thumbnail}
            alt={currentTrack?.title}
            containerClassName="size-14 shrink-0 rounded-lg"
            className={currentTrack?.thumbnail ? "size-14" : "size-6"}
          />
        </Fade>
      ) : (
        <div className="size-14 shrink-0" />
      )}
      <Fade show={!!currentTrack} className="w-full truncate">
        <Marquee>
          <Typography variant="h5">{currentTrack?.title}</Typography>
        </Marquee>
        <Marquee>
          {currentTrack?.artist ? (
            currentTrack.artists.map((artist, index) => (
              <span key={artist.artistId}>
                <Typography affects={["muted", "small"]}>{artist.artist.name}</Typography>
                {index < currentTrack.artists.length - 1 && (
                  <Typography affects={["muted", "small"]}>, </Typography>
                )}
              </span>
            ))
          ) : (
            <Typography affects={["muted", "small"]}>{t("common.unknownArtist")}</Typography>
          )}
        </Marquee>
      </Fade>
    </div>
  )
}

export { TrackInfo }
