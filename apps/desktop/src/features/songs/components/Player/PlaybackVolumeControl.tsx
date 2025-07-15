import { useState } from "react"

import { useTranslation } from "@repo/i18n"

import { useSettingsStore } from "@stores/useSettingsStore"

import { IconButton, Slider } from "@components/ui"

const PlaybackVolumeControl = () => {
  const { t } = useTranslation()

  const { volume, setVolume, isMuted, setIsMuted } = useSettingsStore()

  const [localVolume, setLocalVolume] = useState<number>(volume)

  return (
    <div className="flex flex-[0_1_125px] items-center gap-2">
      <IconButton
        name={
          isMuted ? "VolumeOff" : volume === 0 ? "VolumeX" : volume < 0.5 ? "Volume1" : "Volume2"
        }
        tooltip={{
          children: isMuted || volume === 0 ? t("common.unmute") : t("common.mute"),
          side: "top"
        }}
        variant="ghost"
        className="shrink-0"
        onClick={() => setIsMuted(!isMuted)}
      />
      <Slider
        className="w-full"
        min={0}
        max={1}
        step={0.01}
        value={[localVolume]}
        formatTooltip={(value) => `${Math.round(value * 100)}%`}
        onValueChange={([v]) => {
          setLocalVolume(v)
        }}
        onValueCommit={([v]) => {
          setVolume(v)
          if (isMuted && v > 0) setIsMuted(false)
        }}
      />
    </div>
  )
}
PlaybackVolumeControl.displayName = "PlaybackVolumeControl"

export { PlaybackVolumeControl }
