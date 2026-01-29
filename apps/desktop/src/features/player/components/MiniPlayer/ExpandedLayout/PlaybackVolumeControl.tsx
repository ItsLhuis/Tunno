import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { useTranslation } from "@repo/i18n"

import { usePlayerStore } from "../../../stores/usePlayerStore"

import { throttle } from "lodash"

import { inverseVolumeCurve, volumeCurve, volumePercentage } from "../../../utils/player"

import { IconButton, Slider } from "@components/ui"

const PlaybackVolumeControl = () => {
  const { t } = useTranslation()

  const volume = usePlayerStore((state) => state.volume)
  const isMuted = usePlayerStore((state) => state.isMuted)
  const setVolume = usePlayerStore((state) => state.setVolume)
  const setIsMuted = usePlayerStore((state) => state.setIsMuted)

  const [isDragging, setIsDragging] = useState(false)

  const [localVolume, setLocalVolume] = useState<number | null>(null)

  const linearVolume = inverseVolumeCurve(volume)
  const displayVolume = localVolume !== null ? localVolume : linearVolume

  const throttledSetVolume = useMemo(
    () =>
      throttle(
        (curvedVolume: number) => {
          setVolume(curvedVolume)
        },
        50,
        { leading: true, trailing: false }
      ),
    [setVolume]
  )

  const cleanupRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    cleanupRef.current = () => {
      throttledSetVolume.cancel()
    }
    return () => {
      cleanupRef.current?.()
    }
  }, [throttledSetVolume])

  useEffect(() => {
    if (!isDragging && localVolume !== null) {
      const diff = Math.abs(linearVolume - localVolume)
      if (diff < 0.01) {
        setLocalVolume(null)
      }
    }
  }, [linearVolume, isDragging, localVolume])

  const handleValueChange = useCallback(
    ([linearValue]: number[]) => {
      if (!isDragging) {
        setIsDragging(true)
      }
      setLocalVolume(linearValue)
      throttledSetVolume(volumeCurve(linearValue))
    },
    [isDragging, throttledSetVolume]
  )

  const handleValueCommit = useCallback(
    ([linearValue]: number[]) => {
      throttledSetVolume.cancel()
      setVolume(volumeCurve(linearValue))
      if (isMuted && linearValue > 0) {
        setIsMuted(false)
      }
      setIsDragging(false)
    },
    [setVolume, isMuted, setIsMuted, throttledSetVolume]
  )

  const iconName =
    isMuted || displayVolume === 0 ? "VolumeOff" : displayVolume < 0.5 ? "Volume1" : "Volume2"

  return (
    <div className="group/volume relative flex items-center">
      <IconButton
        name={iconName}
        tooltip={isMuted || displayVolume === 0 ? t("common.unmute") : t("common.mute")}
        variant="ghost"
        className="shrink-0"
        onClick={() => setIsMuted(!isMuted)}
      />
      <div className="absolute left-full flex w-0 items-center overflow-visible px-2 py-2 opacity-0 transition-all group-hover/volume:w-20 group-hover/volume:opacity-100">
        <Slider
          className="w-full"
          min={0}
          max={1}
          step={0.01}
          value={[displayVolume]}
          formatTooltip={(linearValue) => `${volumePercentage(linearValue)}%`}
          onValueChange={handleValueChange}
          onValueCommit={handleValueCommit}
        />
      </div>
    </div>
  )
}

export { PlaybackVolumeControl }
