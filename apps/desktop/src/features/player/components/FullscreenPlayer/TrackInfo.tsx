import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { Marquee, Typography } from "@components/ui"

import { type Palette } from "@repo/utils"

import { TrackArtwork } from "./TrackArtwork"

type TrackInfoProps = {
  onPaletteChange: (palette: Palette | null) => void
  onDominantColorChange: (color: string | null) => void
}

const TrackInfo = ({ onPaletteChange, onDominantColorChange }: TrackInfoProps) => {
  const { t } = useTranslation()

  const { currentTrack } = usePlayerStore(
    useShallow((state) => ({
      currentTrack: state.currentTrack
    }))
  )

  return (
    <div className="flex w-full items-end gap-[2.5vh]">
      <div className="shrink-0">
        <TrackArtwork
          onPaletteChange={onPaletteChange}
          onDominantColorChange={onDominantColorChange}
        />
      </div>
      {currentTrack ? (
        <div className="flex w-full flex-col gap-[0.75vh] truncate">
          <Marquee className="w-full">
            <Typography variant="h1" className="text-[clamp(3rem,8vh,10rem)] text-primary">
              {currentTrack.title}
            </Typography>
          </Marquee>
          <Marquee className="w-full">
            <Typography affects={["muted"]} className="text-[clamp(1rem,2.5vh,2.5rem)]">
              {currentTrack.artist
                ? currentTrack.artists.map((artist) => artist.artist.name).join(", ")
                : t("common.unknownArtist")}
            </Typography>
          </Marquee>
        </div>
      ) : (
        <Typography affects={["muted"]} className="text-[clamp(1rem,2.5vh,2.5rem)]">
          {t("common.noSongPlaying")}
        </Typography>
      )}
    </div>
  )
}

export { TrackInfo }
