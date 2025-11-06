import { useState, useEffect } from "react"

import { useTranslation } from "@repo/i18n"

import { getCurrentWindow } from "@tauri-apps/api/window"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import { IconButton, SafeLink } from "@components/ui"

import { PlaybackVolumeControl } from "./PlaybackVolumeControl"
import { QueueSheet } from "./QueueSheet"

const PlaybackOptions = () => {
  const { t } = useTranslation()

  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const checkFullscreenState = async () => {
      const fullscreenWindow = await WebviewWindow.getByLabel("fullscreenPlayer")
      if (fullscreenWindow) {
        const isVisible = await fullscreenWindow.isVisible()
        setIsFullscreen(isVisible)
      }
    }

    checkFullscreenState()

    const interval = setInterval(checkFullscreenState, 500)
    return () => clearInterval(interval)
  }, [])

  const handleOpenMiniPlayer = async () => {
    const miniplayerWindow = await WebviewWindow.getByLabel("miniPlayer")

    if (miniplayerWindow) {
      await miniplayerWindow.unminimize()
      await miniplayerWindow.show()
      await miniplayerWindow.setFocus()
    }
  }

  const handleToggleFullscreen = async () => {
    const mainWindow = getCurrentWindow()
    const fullscreenWindow = await WebviewWindow.getByLabel("fullscreenPlayer")

    if (!fullscreenWindow) return

    const isCurrentlyFullscreen = await fullscreenWindow.isVisible()

    if (isCurrentlyFullscreen) {
      await fullscreenWindow.hide()
      await mainWindow.show()
      await mainWindow.setFocus()
      setIsFullscreen(false)
    } else {
      await mainWindow.hide()
      await fullscreenWindow.show()
      await fullscreenWindow.setFocus()
      setIsFullscreen(true)
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
        name={isFullscreen ? "Minimize2" : "Maximize"}
        tooltip={isFullscreen ? t("common.exitFullScreen") : t("common.enterFullScreen")}
        variant="ghost"
        className="shrink-0"
        onClick={handleToggleFullscreen}
      />
    </div>
  )
}

export { PlaybackOptions }
