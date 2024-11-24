import { useState, useEffect } from "react"

import { invoke } from "@tauri-apps/api/core"
import { listen } from "@tauri-apps/api/event"

import {
  getWindowTitle,
  isCurrentWindowMaximized,
  minimizeCurrentWindow,
  toggleMaximizeCurrentWindow,
  hideCurrentWindow,
  showCurrentWindow
} from "@utils/window/currentWindow"
import { showOverlayWindow } from "@utils/window/overlayWindow"

import { Typography } from "@components/ui"

import { TitleBar } from "@components/window"

function App() {
  const [windowTitle, setWindowTitle] = useState<string>("")
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(false)

  const [greetMsg, setGreetMsg] = useState("")
  const [name, setName] = useState("")

  async function greet() {
    setGreetMsg(await invoke("greet", { name }))
  }

  useEffect(() => {
    async function initializeWindowState() {
      const title = await getWindowTitle()
      setWindowTitle(title)

      const maximized = await isCurrentWindowMaximized()
      setIsWindowMaximized(maximized)
    }

    const initializeResizeListener = async () => {
      return listen("tauri://resize", async () => {
        const maximized = await isCurrentWindowMaximized()
        setIsWindowMaximized(maximized)
      })
    }

    const timeout = setTimeout(() => {
      showCurrentWindow()
      initializeWindowState()
    }, 200)

    let unlisten: () => void

    initializeResizeListener().then((listener) => {
      unlisten = listener
    })

    return () => {
      clearTimeout(timeout)
      if (unlisten) unlisten()
    }
  }, [])

  return (
    <main className="h-dvh w-dvw">
      <TitleBar
        onMinimize={minimizeCurrentWindow}
        onMaximize={toggleMaximizeCurrentWindow}
        onClose={hideCurrentWindow}
        isMaximize={isWindowMaximized}
      >
        <Typography variant="span" affects="bold" className="m-3">
          {windowTitle}
        </Typography>
      </TitleBar>
      <h1>Welcome to Tauri + React</h1>
      <p>Click on the button below to show the overlay window:</p>
      <button onClick={showOverlayWindow}>Show Overlay</button>
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault()
          greet()
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  )
}

export default App
