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
    <div className="flex flex-[0_1_125px] items-center gap-2">
      <IconButton
        name={iconName}
        tooltip={isMuted || displayVolume === 0 ? t("common.unmute") : t("common.mute")}
        variant="ghost"
        className="shrink-0"
        onClick={() => setIsMuted(!isMuted)}
      />
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
  )
}

export { PlaybackVolumeControl }
