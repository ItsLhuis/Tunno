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
  Download,
  Music,
  Heart,
  List,
  Users,
  SquareArrowOutUpRight
} from "lucide-react"

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
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  Input
} from "@/components/ui"

import { TitleBar } from "@components/window"

const menuItems = [
  { icon: Music, label: "Songs", href: "/" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: List, label: "PLaylists", href: "/playlists" },
  { icon: Users, label: "Artists", href: "/artists" }
]

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
        <div data-tauri-drag-region className="flex-1 flex items-center justify-between gap-4">
          <div data-tauri-drag-region className="flex items-center m-4 gap-4">
            <img src={Logo} className="w-4" />
            <Typography variant="h6" affects="muted">
              {windowTitle}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download />
                  <span className="sr-only">Open downloads menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Downloads</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-muted-foreground font-normal">
                  Nothing here!
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-1">
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
        </div>
      </TitleBar>
      <div className="flex flex-1 overflow-hidden">
        <div className="border-r flex-shrink-0 overflow-auto">
          <SidebarProvider className="min-h-full">
            <Sidebar collapsible="none" className="w-[var(--sidebar-width-icon)] bg-transparent">
              <SidebarContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton tooltip={item.label} asChild size="lg">
                        <a href={item.href} className="flex items-center justify-center">
                          <item.icon />
                          <span className="sr-only">{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
        <main className="flex flex-1 flex-col p-4 items-start bg-background overflow-auto transition-colors">
          <Input />
        </main>
      </div>
      <div className="flex items-center border-t flex-shrink-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={showOverlayWindow}
          className="ml-auto mr-3 my-3"
        >
          <SquareArrowOutUpRight />
        </Button>
      </div>
    </main>
  )
}

export default App
