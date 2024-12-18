import { useState, useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { getSettingsStore } from "@tauri/stores/settings"

import { getCurrentWindow, currentMonitor, LogicalPosition } from "@tauri-apps/api/window"

import { Layout, GripHorizontal, Play, SkipBack, SkipForward } from "lucide-react"

import { TitleBar } from "@components/window"
import {
  Button,
  Marquee,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Slider,
  Typography
} from "@components/ui"

function App() {
  const { setTheme } = useTheme()

  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)

  const handleOpenChange = (open: boolean) => {
    setDropdownOpen(open)
  }

  useEffect(() => {
    const watchSettingsChange = async () => {
      const store = await getSettingsStore()
      const unlisten = await store.onKeyChange<string>("theme", (theme) => {
        setTheme(theme as "dark" | "light" | "system", false)
      })

      return unlisten
    }

    let unlisten: () => void

    watchSettingsChange().then((listener) => {
      unlisten = listener
    })

    return () => {
      if (unlisten) unlisten()
    }
  }, [])

  const moveToCorner = async (
    corner: "bottom-left" | "bottom-right" | "top-left" | "top-right"
  ) => {
    const monitor = await currentMonitor()

    if (monitor) {
      const { position, size, scaleFactor } = monitor

      const currentWindow = getCurrentWindow()

      const isCurrentWindowMaximized = await currentWindow.isMaximized()
      if (isCurrentWindowMaximized) await currentWindow.toggleMaximize()

      const windowSize = await currentWindow.outerSize()

      let newX = position.x
      let newY = position.y

      switch (corner) {
        case "bottom-left":
          newX = position.x + 10
          newY = position.y + size.height - windowSize.height - 10
          break
        case "bottom-right":
          newX = position.x + size.width - windowSize.width - 10
          newY = position.y + size.height - windowSize.height - 10
          break
        case "top-left":
          newX = position.x + 10
          newY = position.y + 10
          break
        case "top-right":
          newX = position.x + size.width - windowSize.width - 10
          newY = position.y + 10
          break
      }

      newX = Math.max(newX, position.x)
      newY = Math.max(newY, position.y)

      const newPosition = new LogicalPosition(
        Math.floor(newX / scaleFactor),
        Math.floor(newY / scaleFactor)
      )

      await getCurrentWindow().setPosition(newPosition)

      setDropdownOpen(false)
    }
  }

  return (
    <main className="relative group flex flex-col h-dvh w-dvw">
      <div className="flex flex-col absolute inset-0 bg-background/50 opacity-0 group-hover:opacity-100 transition-opacity z-50">
        <TitleBar onClose={() => getCurrentWindow().hide()}>
          <div data-tauri-drag-region className="flex flex-1 h-9 justify-between items-center">
            <DropdownMenu open={isDropdownOpen} onOpenChange={handleOpenChange}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-background/50 rounded-none">
                  <Layout />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="grid grid-cols-2 gap-1 ml-2 -mt-8">
                <Button
                  variant="secondary"
                  className="p-1 rounded-none rounded-tl-sm hover:bg-primary"
                  onClick={() => moveToCorner("top-left")}
                />
                <Button
                  variant="secondary"
                  className="p-1 rounded-none rounded-tr-sm hover:bg-primary"
                  onClick={() => moveToCorner("top-right")}
                />
                <Button
                  variant="secondary"
                  className="p-1 rounded-none rounded-bl-sm hover:bg-primary"
                  onClick={() => moveToCorner("bottom-left")}
                />
                <Button
                  variant="secondary"
                  className="p-1 rounded-none rounded-br-sm hover:bg-primary"
                  onClick={() => moveToCorner("bottom-right")}
                />
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              data-tauri-drag-region
              className="mr-auto ml-auto cursor-grab active:cursor-grabbing p-2"
            >
              <GripHorizontal data-tauri-drag-region size={20} />
            </div>
          </div>
        </TitleBar>
        <div className="absolute flex flex-col h-full w-full">
          <div className="absolute flex h-full w-full items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <SkipBack />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <Play />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-background/50 w-[30%] h-[30%] [&_svg]:size-[40%]"
            >
              <SkipForward />
            </Button>
          </div>
          <div className="flex flex-col gap-3 mt-auto p-4">
            <Marquee>
              <Typography variant="h6">Luis Fonsi, Stefflon Don - Calypso</Typography>
            </Marquee>
            <div className="flex gap-2 items-center justify-center">
              <Typography variant="h6" affects="tiny">
                0:01
              </Typography>
              <Slider />
              <Typography variant="h6" affects="tiny">
                2:24
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 flex-1 flex flex-col items-center justify-center">
        <img
          src="https://lh3.googleusercontent.com/Ngkk0l6jdQ0hlmrNKFBIvvVmduC-YaWbjq4cQHciDtZo9xy2p4KVyZ68zyFeWqBjYGt2rgZUacMpfdFC=w120-h120-l90-rj"
          className="absolute inset-0 w-full h-full object-cover z-10 blur-xl"
        />
        <img
          src="https://lh3.googleusercontent.com/Ngkk0l6jdQ0hlmrNKFBIvvVmduC-YaWbjq4cQHciDtZo9xy2p4KVyZ68zyFeWqBjYGt2rgZUacMpfdFC=w800-h800-l90-rj"
          className="z-20 w-[70%] h-[70%] max-w-[1200px] max-h-[1200px] rounded-lg object-contain"
        />
      </div>
    </main>
  )
}

export default App
