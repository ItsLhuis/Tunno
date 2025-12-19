import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { Marquee, Typography } from "@components/ui"

import { type Palette } from "@repo/utils"

import { motion } from "motion/react"

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
    <motion.div layout className="flex w-full items-end gap-[2.5vh]">
      <div className="shrink-0">
        <TrackArtwork
          onPaletteChange={onPaletteChange}
          onDominantColorChange={onDominantColorChange}
        />
      </div>
      {currentTrack ? (
        <div className="flex w-full flex-col gap-[0.75vh] truncate">
          <Marquee className="w-full">
            <Typography variant="h1" className="text-primary text-[8vh]">
              {currentTrack.title}
            </Typography>
          </Marquee>
          <Marquee className="w-full">
            <Typography affects={["muted"]} className="text-[2.5vh]">
              {currentTrack.artist
                ? currentTrack.artists.map((artist) => artist.artist.name).join(", ")
                : t("common.unknownArtist")}
            </Typography>
          </Marquee>
        </div>
      ) : (
        <Typography affects={["muted"]} className="text-[2.5vh]">
          {t("common.noSongPlaying")}
        </Typography>
      )}
    </motion.div>
  )
}

export { TrackInfo }
