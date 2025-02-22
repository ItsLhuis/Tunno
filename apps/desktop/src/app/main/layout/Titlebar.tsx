import { useEffect, useState } from "react"

import { getCurrentWindow } from "@tauri-apps/api/window"

import Logo from "@assets/images/appicon-primary.png"

import { ArrowLeft, ArrowRight, Settings, Zap } from "lucide-react"

import { Titlebar as WindowTitlebar } from "@components/window"

import { motion } from "motion/react"

import { useNavigate, Link } from "react-router-dom"

import { Button, Typography } from "@components/ui"

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
            <div className="flex items-center gap-1">
              <Button
                tooltip={{ children: "Go Back", side: "bottom", align: "start" }}
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                disabled={!canGoBack}
              >
                <ArrowLeft />
              </Button>
              <Button
                tooltip={{ children: "Go Forward", side: "bottom" }}
                variant="ghost"
                size="icon"
                onClick={() => navigate(1)}
                disabled={!canGoForward}
              >
                <ArrowRight />
              </Button>
            </div>
            <img src={Logo} className="w-4" />
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
                tooltip={{ children: "Upload fast", side: "bottom" }}
                variant="ghost"
                size="icon"
              >
                <Zap />
                <span className="sr-only">Open upload fast menu</span>
              </Button>
              <Button
                tooltip={{ children: "Settings", side: "bottom" }}
                variant="ghost"
                size="icon"
                asChild
              >
                <Link to="/settings">
                  <Settings />
                  <span className="sr-only">Open settings screen</span>
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </WindowTitlebar>
    </div>
  )
}

export default TitleBar
