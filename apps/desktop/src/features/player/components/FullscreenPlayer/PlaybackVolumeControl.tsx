import { useEffect, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useShallow } from "zustand/shallow"

import { usePlayerStore } from "../../stores/usePlayerStore"

import { inverseVolumeCurve, volumeCurve, volumePercentage } from "../../utils/player"

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

  const [isDragging, setIsDragging] = useState(false)

  const [localVolume, setLocalVolume] = useState<number | null>(null)

  const linearVolume = inverseVolumeCurve(volume)
  const displayVolume = localVolume !== null ? localVolume : linearVolume

  useEffect(() => {
    if (!isDragging && localVolume !== null) {
      const diff = Math.abs(linearVolume - localVolume)
      if (diff < 0.01) {
        setLocalVolume(null)
      }
    }
  }, [linearVolume, isDragging, localVolume])

  const iconName =
    isMuted || displayVolume === 0 ? "VolumeOff" : displayVolume < 0.5 ? "Volume1" : "Volume2"

  return (
    <div className="group/volume relative flex items-center">
      <IconButton
        name={iconName}
        tooltip={isMuted || displayVolume === 0 ? t("common.unmute") : t("common.mute")}
        variant="ghost"
        className="h-[4vh] min-h-[2.25rem] w-[4vh] min-w-[2.25rem] shrink-0 [&_svg]:size-[clamp(1rem,2vh,1.25rem)]"
        onClick={() => setIsMuted(!isMuted)}
      />
      <div className="absolute left-full -my-2 flex w-0 items-center overflow-visible px-[1vh] py-[1vh] opacity-0 transition-all group-hover/volume:w-20 group-hover/volume:opacity-100">
        <Slider
          className="w-full"
          min={0}
          max={1}
          step={0.01}
          value={[displayVolume]}
          formatTooltip={(linearValue) => `${volumePercentage(linearValue)}%`}
          onValueChange={([linearValue]) => {
            if (!isDragging) {
              setIsDragging(true)
            }
            setLocalVolume(linearValue)
          }}
          onValueCommit={([linearValue]) => {
            setVolume(volumeCurve(linearValue))
            if (isMuted && linearValue > 0) {
              setIsMuted(false)
            }
            setIsDragging(false)
          }}
        />
      </div>
    </div>
  )
}

export { PlaybackVolumeControl }
