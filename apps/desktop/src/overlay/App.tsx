import { hideOverlayWindow } from "@utils/window/overlayWindow"

import { TitleBar } from "@components/window"
import { Button, Typography } from "@components/ui"

import { Layout, GripHorizontal } from "lucide-react"

function App() {
  return (
    <main className="h-dvh w-dvw">
      <TitleBar onClose={hideOverlayWindow}>
        <div data-tauri-drag-region className="flex flex-1 h-9 justify-between items-center">
          <Button variant="ghost" className="rounded-none">
            <Layout />
          </Button>
          <GripHorizontal
            data-tauri-drag-region
            size={20}
            className="cursor-grab active:cursor-grabbing"
          />
          <Button variant="ghost" className="h-full text-transparent rounded-none -z-50">
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
