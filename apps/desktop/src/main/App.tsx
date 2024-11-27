import { useState, useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { listen } from "@tauri-apps/api/event"

import {
  getWindowTitle,
  isCurrentWindowMaximized,
  minimizeCurrentWindow,
  toggleMaximizeCurrentWindow,
  hideCurrentWindow,
  showCurrentWindow
} from "@/utils/window/main"
import { initializeOverlayWindow, showOverlayWindow } from "@/utils/window/overlay"

import { Moon, Sun, Laptop, User, Settings, LogOut, Check } from "lucide-react"

import {
  Button,
  Typography,
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

function App() {
  const { theme, setTheme } = useTheme()

  const [windowTitle, setWindowTitle] = useState<string>("")
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false)

  useEffect(() => {
    async function initializeWindowState() {
      await initializeOverlayWindow()

      const title = await getWindowTitle()
      setWindowTitle(title)

      showCurrentWindow()
    }

    initializeWindowState()

    const initializeResizeListener = async () => {
      return listen("tauri://resize", async () => {
        const maximized = await isCurrentWindowMaximized()
        setIsWindowMaximized(maximized)
      })
    }

    let unlisten: () => void

    initializeResizeListener().then((listener) => {
      unlisten = listener
    })

    return () => {
      if (unlisten) unlisten()
    }
  }, [])

  return (
    <main className="flex flex-col h-dvh w-dvw">
      <TitleBar
        className="border-b"
        onMinimize={minimizeCurrentWindow}
        onMaximize={toggleMaximizeCurrentWindow}
        onClose={hideCurrentWindow}
        isMaximize={isWindowMaximized}
      >
        <div data-tauri-drag-region className="flex-1 flex items-center justify-between">
          <Typography variant="h6" affects="muted" className="m-3 ml-4">
            {windowTitle}
          </Typography>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-40">
                <Settings />
                <span className="sr-only">Open settings menu</span>
              </Button>
            </DropdownMenuTrigger>
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
      <div className="flex flex-1 overflow-hidden">
        <div className="w-16 border-r flex-shrink-0"></div>
        <main className="flex flex-1 flex-col p-4 items-start bg-background overflow-auto transition-colors">
          <Typography>
            Welcome to Tauri + React <br /> Click on the button below to show the overlay window:
          </Typography>
          <Button onClick={showOverlayWindow}>Show Overlay</Button>
          <Button variant="secondary" onClick={showOverlayWindow}>
            Show Overlay
          </Button>
          <Button variant="ghost" onClick={showOverlayWindow}>
            Show Overlay
          </Button>
          <Button variant="outline" onClick={showOverlayWindow}>
            Show Overlay
          </Button>
          <Button variant="link" onClick={showOverlayWindow}>
            Show Overlay
          </Button>
          <Button variant="destructive" onClick={showOverlayWindow}>
            getValueFromStore
          </Button>
        </main>
      </div>
      <div className="h-16 border-t flex-shrink-0"></div>
    </main>
  )
}

export default App
