import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { Marquee, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const currentTrack = usePlayerStore((state) => state.currentTrack)

  return (
    <div className="border-border bg-sidebar h-auto w-full border-t p-3">
      {currentTrack ? (
        <div className="flex w-full flex-col gap-1 truncate">
          <Marquee>
            <Typography variant="h5">{currentTrack.title}</Typography>
          </Marquee>
          <Marquee>
            <Typography affects={["muted", "small"]}>
              {currentTrack.artist
                ? currentTrack.artists.map((artist) => artist.artist.name).join(", ")
                : t("common.unknownArtist")}
            </Typography>
          </Marquee>
        </div>
      ) : (
        <Typography affects={["muted", "small"]}>{t("common.noSongPlaying")}</Typography>
      )}
    </div>
  )
}

export { TrackInfo }
