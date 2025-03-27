import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import { getCurrentWindow } from "@tauri-apps/api/window"

import Logo from "@assets/images/app/icons/primary.png"

import { Button, Icon, IconButton, Image, SafeLink, Typography } from "@components/ui"
import { Titlebar as WindowTitlebar } from "@components/window"

import { motion } from "motion/react"

type TitleBarProps = {
  isSplashVisible: boolean
}

function TitleBar({ isSplashVisible }: TitleBarProps) {
  const navigate = useNavigate()

  const [windowTitle, setWindowTitle] = useState<string>("")

  const canGoBack = window.history.state.idx !== 0
  const canGoForward = window.history.state.idx < window.history.length - 1

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

  useEffect(() => {
    async function initializeWindowState() {
      const title = await getCurrentWindow().title()
      setWindowTitle(title)
    }

    initializeWindowState()
  }, [])

  return (
    <div className="h-full border-b bg-sidebar transition-[background-color,border-color]">
      <WindowTitlebar
        onMinimize={() => getCurrentWindow().minimize()}
        onMaximize={() => getCurrentWindow().toggleMaximize()}
        onFullSceen={() => toggleFullScreen()}
        onClose={() => getCurrentWindow().hide()}
      >
        <div data-tauri-drag-region className="flex-1 flex items-center justify-between">
          <div data-tauri-drag-region className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <IconButton
                name="ArrowLeft"
                tooltip={{ children: "Go Back", side: "bottom" }}
                variant="ghost"
                onClick={() => navigate(-1)}
                disabled={!canGoBack}
              />
              <IconButton
                name="ArrowRight"
                tooltip={{ children: "Go Forward", side: "bottom" }}
                variant="ghost"
                onClick={() => navigate(1)}
                disabled={!canGoForward}
              />
            </div>
            <Image
              src={Logo}
              alt="App logo"
              containerClassName="bg-transparent"
              className="w-4 aspect-auto"
            />
            <Typography variant="h6" affects="muted">
              {windowTitle}
            </Typography>
          </div>
          {!isSplashVisible && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                tooltip={{ children: "Settings", side: "bottom" }}
                variant="ghost"
                size="icon"
                asChild
              >
                <SafeLink to="/fast-upload">
                  <Icon name="Zap" />
                </SafeLink>
              </Button>
              <Button
                tooltip={{ children: "Settings", side: "bottom" }}
                variant="ghost"
                size="icon"
                asChild
              >
                <SafeLink to="/settings">
                  <Icon name="Settings" />
                </SafeLink>
              </Button>
            </motion.div>
          )}
        </div>
      </WindowTitlebar>
    </div>
  )
}

export default TitleBar
