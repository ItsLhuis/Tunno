import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { Marquee, Typography } from "@components/ui"

const TrackInfo = () => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  return (
    <div className="h-auto w-full border-t border-border bg-sidebar p-3">
      {currentTrack ? (
        <div>
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
        <Typography affects={["muted", "small"]}>No track playing</Typography>
      )}
    </div>
  )
}

export { TrackInfo }
