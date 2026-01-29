import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { inverseVolumeCurve, volumeCurve, volumePercentage } from "../../utils/player"

import { IconButton, Slider } from "@components/ui"

const PlaybackVolumeControl = () => {
  const { t } = useTranslation()

  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const setVolume = usePlayerStore((state) => state.setVolume)
  const setIsMuted = usePlayerStore((state) => state.setIsMuted)

  const linearVolume = inverseVolumeCurve(volume)

  const iconName =
    isMuted || linearVolume === 0 ? "VolumeOff" : linearVolume < 0.5 ? "Volume1" : "Volume2"

  return (
    <div className="flex flex-[0_1_125px] items-center gap-2">
      <IconButton
        name={iconName}
        tooltip={isMuted || linearVolume === 0 ? t("common.unmute") : t("common.mute")}
        variant="ghost"
        className="shrink-0"
        onClick={() => setIsMuted(!isMuted)}
      />
      <Slider
        className="w-full"
        min={0}
        max={1}
        step={0.01}
        value={[linearVolume]}
        formatTooltip={(linearValue) => `${volumePercentage(linearValue)}%`}
        onValueChange={([linearValue]) => {
          setVolume(volumeCurve(linearValue))
          if (isMuted && linearValue > 0) {
            setIsMuted(false)
          }
        }}
      />
    </div>
  )
}

export { PlaybackVolumeControl }
