import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { IconButton, Slider } from "@components/ui"

const PlaybackVolumeControl = () => {
  const { t } = useTranslation()

  const { volume, setVolume, isMuted, setIsMuted } = usePlayerStore(
    useShallow((state) => ({
      volume: state.volume,
      setVolume: state.setVolume,
      isMuted: state.isMuted,
      setIsMuted: state.setIsMuted
    }))
  )

  return (
    <div className="flex flex-[0_1_125px] items-center gap-2">
      <IconButton
        name={
          isMuted ? "VolumeOff" : volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"
        }
        tooltip={isMuted || volume === 0 ? t("common.unmute") : t("common.mute")}
        variant="ghost"
        className="shrink-0"
        onClick={() => setIsMuted(!isMuted)}
      />
      <Slider
        className="w-full"
        min={0}
        max={1}
        step={0.01}
        value={[volume]}
        formatTooltip={(value) => `${Math.round(value * 100)}%`}
        onValueChange={([v]) => setVolume(v)}
        onValueCommit={([v]) => {
          setVolume(v)
          if (isMuted && v > 0) setIsMuted(false)
        }}
      />
    </div>
  )
}

export { PlaybackVolumeControl }
