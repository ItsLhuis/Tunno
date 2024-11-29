import { useState, useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { listen } from "@tauri-apps/api/event"

import { getCurrentWindow } from "@tauri-apps/api/window"
import { getOverlayWindow } from "@tauri/window/overlay"

import Logo from "@assets/images/appicon-primary.png"

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
  DropdownMenuTrigger,
  Input
} from "@components/ui"

import { TitleBar } from "@components/window"

function App() {
  const { theme, setTheme } = useTheme()

  const [windowTitle, setWindowTitle] = useState<string>("")
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false)

  const showOverlayWindow = async () => {
    const overlayWindow = await getOverlayWindow()
    overlayWindow.show()
  }

  useEffect(() => {
    async function initializeWindowState() {
      const title = await getCurrentWindow().title()
      setWindowTitle(title)
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
      if (unlisten) unlisten()
    }
  }, [])

  return (
    <main className="flex flex-col h-dvh w-dvw">
      <TitleBar
        className="border-b"
        onMinimize={() => getCurrentWindow().minimize()}
        onMaximize={() => getCurrentWindow().toggleMaximize()}
        onClose={() => getCurrentWindow().hide()}
        isMaximize={isWindowMaximized}
      >
        <div data-tauri-drag-region className="flex-1 flex items-center justify-between">
          <div data-tauri-drag-region className="flex items-center m-4 ml-6 gap-4">
            <img src={Logo} className="w-4" />
            <Typography variant="h6" affects="muted">
              {windowTitle}
            </Typography>
          </div>
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
          <Input />
        </main>
      </div>
      <div className="h-16 border-t flex-shrink-0"></div>
    </main>
  )
}

export default App
