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
  MonitorStop,
  Play,
  SkipBack,
  SkipForward,
  Volume1,
  Repeat,
  Shuffle
} from "lucide-react"

import { motion } from "motion/react"

import {
  Button,
  Typography,
  Marquee,
  Separator,
  Slider,
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

import Thumbnail120x120 from "./thumbnail120x120.jpg"

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
        </TitleBar>
        <Separator />
      </motion.div>
      <motion.main
        className="flex flex-col h-full w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isSplashVisible ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-row h-full">
            <div className="relative h-full overflow-hidden overflow-y-auto">
              <div
                className="absolute top-0 left-0 w-1 rounded-tr-lg rounded-br-lg bg-primary z-10 transition-[transform,opacity]"
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
                  >
                    <item.icon
                      className={`transition-colors ${
                        activeIndex === index ? "text-primary" : "text-current"
                      }`}
                    />
                    <span className="sr-only">{item.label}</span>
                  </Button>
                ))}
              </div>
            </div>
            <Separator orientation="vertical" />
          </div>
          <main className="flex flex-1 flex-col py-4 items-start bg-background overflow-auto transition-colors p-3"></main>
        </div>
        <footer className="flex flex-col items-center w-full">
          <Separator />
          <div className="flex items-center justify-center w-full p-3 pb-0 gap-3">
            <Typography variant="span" affects="bold">
              0:01
            </Typography>
            <Slider />
            <Typography variant="span" affects="bold">
              2:24
            </Typography>
          </div>
          <div className="flex flex-row items-center gap-3 p-3 w-full">
            <div className="flex items-center gap-3 truncate flex-1">
              <img src={Thumbnail120x120} className="size-16 object-cover rounded-md" />
              <div className="w-full truncate">
                <Marquee>
                  <Typography variant="h6">MALA (feat. Anuel AA)</Typography>
                </Marquee>
                <Marquee className="-mt-1">
                  <Typography affects="small" className="text-muted-foreground truncate">
                    6ix9ine - Topic
                  </Typography>
                </Marquee>
              </div>
            </div>
            <div className="flex flex-col gap-3 flex-none">
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  tooltip={{ children: "Enable shuffle", side: "top" }}
                  variant="ghost"
                  size="icon"
                >
                  <Shuffle />
                </Button>
                <Button tooltip={{ children: "Previous", side: "top" }} variant="ghost" size="icon">
                  <SkipBack />
                </Button>
                <Button
                  className="rounded-full [&_svg]:size-5 w-11 h-11"
                  tooltip={{ children: "Play", side: "top" }}
                  variant="default"
                  size="icon"
                >
                  <Play />
                </Button>
                <Button tooltip={{ children: "Next", side: "top" }} variant="ghost" size="icon">
                  <SkipForward />
                </Button>
                <Button
                  tooltip={{ children: "Enable repeat", side: "top" }}
                  variant="ghost"
                  size="icon"
                >
                  <Repeat />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 truncate flex-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button tooltip={{ children: "Volume", side: "top" }} variant="ghost" size="icon">
                    <Volume1 />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="flex items-center p-2 mr-3 w-[15rem]">
                  <Button
                    tooltip={{ children: "Mute", side: "top" }}
                    variant="ghost"
                    size="icon"
                    className="min-h-9 min-w-9"
                  >
                    <Volume1 />
                  </Button>
                  <Slider />
                  <Typography variant="span" affects="bold" className="ml-3">
                    15%
                  </Typography>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                tooltip={{ children: "Open miniplayer", side: "top", className: "mr-3" }}
                variant="ghost"
                size="icon"
                onClick={showOverlayWindow}
              >
                <MonitorStop />
              </Button>
            </div>
          </div>
        </footer>
      </motion.main>
    </div>
  )
}

export default App
