import { useEffect } from "react"

import { useTheme } from "@contexts/ThemeContext"

import { listen } from "@tauri-apps/api/event"

import { initializeOverlayWindow, hideOverlayWindow } from "@/utils/window/overlay"

import { TitleBar } from "@components/window"
import { Button, Typography } from "@components/ui"

import { Layout, GripHorizontal } from "lucide-react"

function App() {
  const { setTheme } = useTheme()

  useEffect(() => {
    async function initializeWindowState() {
      await initializeOverlayWindow()
    }

    initializeWindowState()

    const initializeThemeChangeListener = async () => {
      return listen("tauri://theme-changed", async (data) => {
        setTheme(data.payload as "dark" | "light")
      })
    }

    let unlisten: () => void

    initializeThemeChangeListener().then((listener) => {
      unlisten = listener
    })

    return () => {
      if (unlisten) unlisten()
    }
  }, [])

  return (
    <main className="flex flex-col h-dvh w-dvw">
      <TitleBar onClose={hideOverlayWindow}>
        <div data-tauri-drag-region className="flex flex-1 h-9 justify-between items-center">
          <Button variant="ghost" className="p-5 rounded-none">
            <Layout />
          </Button>
          <GripHorizontal
            data-tauri-drag-region
            size={20}
            className="cursor-grab active:cursor-grabbing"
          />
          <Button variant="ghost" className="p-5 text-transparent -z-50">
            <Layout />
          </Button>
        </div>
      </TitleBar>
      <Typography variant="h1" affects="lead">
        Ola
      </Typography>
    </main>
  )
}

export default App
