import { useNavigate } from "react-router-dom"

import { getCurrentWindow } from "@tauri-apps/api/window"

import Logo from "@assets/images/app/icons/primary.png"

import { Button, Icon, IconButton, Image, SafeLink } from "@components/ui"
import { Titlebar as WindowTitlebar } from "@components/window"

import { motion } from "motion/react"

type TitleBarProps = {
  isSplashVisible: boolean
}

function TitleBar({ isSplashVisible }: TitleBarProps) {
  const navigate = useNavigate()

  const canGoBack = window.history.state.idx !== 0
  const canGoForward = window.history.state.idx < window.history.length - 1

  const toggleFullScreen = async () => {
    const window = getCurrentWindow()
    const fullscreenState = await window.isFullscreen()
    await window.setFullscreen(!fullscreenState)
  }

  return (
    <div className="h-full border-b bg-sidebar transition-[background-color,border-color]">
      <WindowTitlebar
        onMinimize={() => getCurrentWindow().minimize()}
        onMaximize={() => getCurrentWindow().toggleMaximize()}
        onFullSceen={() => toggleFullScreen()}
        onClose={() => getCurrentWindow().hide()}
      >
        <div data-tauri-drag-region className="flex flex-1 items-center justify-between">
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
              className="aspect-auto w-4"
            />
          </div>
          {!isSplashVisible && (
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Button
                tooltip={{ children: "Fast Upload", side: "bottom" }}
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
