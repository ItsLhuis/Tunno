import { useState, useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"
import { getOverlayWindow } from "@tauri/window/overlay"

import Logo from "@assets/images/appicon-primary.png"

import {
  Moon,
  Sun,
  Laptop,
  User,
  Settings,
  LogOut,
  Check,
  Music,
  Heart,
  List,
  Users,
  MonitorStop
} from "lucide-react"

import { motion } from "motion/react"

import {
  Button,
  Typography,
  Marquee,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@components/ui"

import { TitleBar } from "@components/window"

const menuItems = [
  { icon: Music, label: "Songs", href: "/" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: List, label: "PLaylists", href: "/playlists" },
  { icon: Users, label: "Artists", href: "/artists" }
]

function App() {
  const { theme, setTheme } = useTheme()

  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true)

  const [windowTitle, setWindowTitle] = useState<string>("")
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false)

  const showOverlayWindow = async () => {
    const overlayWindow = await getOverlayWindow()
    overlayWindow.show()
  }

  useEffect(() => {
    const splashTimeout = setTimeout(() => {
      setIsSplashVisible(false)
    }, 2000)

    async function initializeWindowState() {
      const title = await getCurrentWindow().title()
      setWindowTitle(title)

      const maximized = await getCurrentWindow().isMaximized()
      setIsWindowMaximized(maximized)
    }

    initializeWindowState()

    const initializeResizeListener = async () => {
      return listen("tauri://resize", async () => {
        const maximized = await getCurrentWindow().isMaximized()
        setIsWindowMaximized(maximized)
      })
    }

    let unlisten: () => void

    initializeResizeListener().then((listener) => {
      unlisten = listener
    })

    return () => {
      clearTimeout(splashTimeout)
      if (unlisten) unlisten()
    }
  }, [])

  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <div className="flex flex-col h-dvh w-dvw relative">
      {isSplashVisible && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <img src={Logo} className="w-20" />
        </motion.div>
      )}
      <motion.div
        className="z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <TitleBar
          className="h-full"
          onMinimize={() => getCurrentWindow().minimize()}
          onMaximize={() => getCurrentWindow().toggleMaximize()}
          onClose={() => getCurrentWindow().hide()}
          isMaximize={isWindowMaximized}
        >
          <div data-tauri-drag-region className="flex-1 flex items-center justify-between gap-4">
            <div data-tauri-drag-region className="flex items-center gap-4 m-4">
              <img src={Logo} className="w-4" />
              <Typography variant="h6" affects="muted">
                {windowTitle}
              </Typography>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                {!isSplashVisible && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button
                        tooltip={{ children: "Settings", side: "bottom" }}
                        variant="ghost"
                        size="icon"
                        className="mr-1"
                      >
                        <Settings />
                        <span className="sr-only">Open settings menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                  </motion.div>
                )}
                <DropdownMenuContent>
                  <DropdownMenuLabel>App Settings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <Sun />
                        <span>Theme</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun />
                            <span>Light</span>
                            {theme === "light" && <Check className="ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon />
                            <span>Dark</span>
                            {theme === "dark" && <Check className="ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setTheme("system")}>
                            <Laptop />
                            <span>System</span>
                            {theme === "system" && <Check className="ml-auto" />}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings />
                      <span>General Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </TitleBar>
        <Separator />
      </motion.div>
      <motion.main
        className="flex flex-col h-full w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplashVisible ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-row flex-shrink-0 overflow-auto">
            <div className="min-h-full relative">
              <div
                className="absolute top-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-primary z-10 transition-transform"
                style={{
                  transform: `translateY(${activeIndex * 3}rem)`,
                  height: "3rem"
                }}
              />
              <div className="flex flex-col bg-transparent">
                {menuItems.map((item, index) => (
                  <Button
                    key={item.label}
                    tooltip={item.label}
                    variant="ghost"
                    className="h-12 rounded-none"
                    onClick={() => setActiveIndex(index)}
                    asChild
                  >
                    <a className="flex items-center justify-center">
                      <item.icon
                        className={`transition-colors ${
                          activeIndex === index ? "text-primary" : "text-current"
                        }`}
                      />
                      <span className="sr-only">{item.label}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" />
          </div>
          <main className="flex flex-1 flex-col py-4 items-start bg-background overflow-auto transition-colors">
            <div className="w-full">
              <Marquee className="px-4">
                1 2 3 4 5 6 7 8 9 9 8 7 6 5 4 3 2 1 1 2 3 4 5 6 7 8 9 9 8 7 6 5 4 3 2 1 1 2 3 4 5 6
                7 8 9 9 8 7 6 5 4 3 2 1 1 2 3 4 5 6 7 8 9 9 8 7 6 5 4 3 2 1
              </Marquee>
            </div>
          </main>
        </div>
        <div className="flex flex-col items-center flex-shrink-0">
          <Separator />
          <Button
            tooltip={{ children: "Open miniplayer", side: "top" }}
            variant="ghost"
            size="icon"
            onClick={showOverlayWindow}
            className="ml-auto mr-3 my-3"
          >
            <MonitorStop />
          </Button>
        </div>
      </motion.main>
    </div>
  )
}

export default App
