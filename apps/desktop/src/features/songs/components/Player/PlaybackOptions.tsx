import { useTranslation } from "@repo/i18n"

import { PlaybackVolumeControl } from "./PlaybackVolumeControl"

import { IconButton } from "@components/ui"

const PlaybackOptions = () => {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-end gap-2 truncate">
      <IconButton
        name="MicVocal"
        tooltip={t("common.queue")}
        variant="ghost"
        className="shrink-0"
      />
      <PlaybackVolumeControl />
      <IconButton
        name="ListMusic"
        tooltip={t("common.queue")}
        variant="ghost"
        className="shrink-0"
      />
      <IconButton
        name="PictureInPicture2"
        tooltip={t("common.queue")}
        variant="ghost"
        className="shrink-0"
      />
      <IconButton
        name="Maximize"
        tooltip={t("common.queue")}
        variant="ghost"
        className="shrink-0"
      />
    </div>
  )
}

export { PlaybackOptions }
