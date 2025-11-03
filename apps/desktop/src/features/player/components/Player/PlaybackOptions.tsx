import { useTranslation } from "@repo/i18n"

import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import { IconButton, SafeLink } from "@components/ui"

import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { QueueSheet } from "./QueueSheet"

const PlaybackOptions = () => {
  const { t } = useTranslation()

  const handleOpenMiniPlayer = async () => {
    const miniplayerWindow = await WebviewWindow.getByLabel("miniPlayer")

    if (miniplayerWindow) {
      await miniplayerWindow.unminimize()
      await miniplayerWindow.show()
      await miniplayerWindow.setFocus()
    }
  }

  return (
    <div className="flex items-center justify-end gap-2 truncate">
      <SafeLink to="/lyrics">
        <IconButton
          name="MicVocal"
          tooltip={t("common.lyrics")}
          variant="ghost"
          className="shrink-0"
        />
      </SafeLink>
      <PlaybackVolumeControl />
      <QueueSheet />
      <IconButton
        name="PictureInPicture2"
        tooltip={t("common.openMiniplayer")}
        variant="ghost"
        className="shrink-0"
        onClick={handleOpenMiniPlayer}
      />
      <IconButton
        name="Maximize"
        tooltip={t("common.enterFullScreen")}
        variant="ghost"
        className="shrink-0"
      />
    </div>
  )
}

export { PlaybackOptions }
