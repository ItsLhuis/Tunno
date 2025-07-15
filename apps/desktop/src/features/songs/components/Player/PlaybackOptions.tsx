import { useTranslation } from "@repo/i18n"

import { PlaybackVolumeControl } from "./PlaybackVolumeControl"

import { IconButton } from "@components/ui"

const PlaybackOptions = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-end gap-2 truncate">
      <PlaybackVolumeControl />
      <IconButton
        name="MonitorSpeaker"
        tooltip={{ children: t("common.devices"), side: "top" }}
        variant="ghost"
      />
      <IconButton
        name="ListMusic"
        tooltip={{ children: t("common.queue"), side: "top" }}
        variant="ghost"
      />
    </div>
  )
}
PlaybackOptions.displayName = "PlaybackOptions"

export { PlaybackOptions }
