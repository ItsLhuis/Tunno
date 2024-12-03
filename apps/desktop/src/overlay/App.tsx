import { useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { getSettingsStore } from "@tauri/stores/settings"

import { getCurrentWindow, currentMonitor, LogicalPosition } from "@tauri-apps/api/window"

import { TitleBar } from "@components/window"
import {
  Button,
  Typography,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui"

import { Layout, GripHorizontal } from "lucide-react"

function App() {
  const { setTheme } = useTheme()

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
    }
  }

  return (
    <main className="flex flex-col h-dvh w-dvw">
      <TitleBar onClose={() => getCurrentWindow().hide()}>
        <div data-tauri-drag-region className="flex flex-1 h-9 justify-between items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-none">
                <Layout />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-2 -mt-8 grid grid-cols-2 gap-1">
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
      <Typography variant="h1" affects="lead">
        Ola
      </Typography>
    </main>
  )
}

export default App
