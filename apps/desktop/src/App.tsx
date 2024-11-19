import { useEffect, useState } from "react"
import { invoke } from "@tauri-apps/api/core"
import "./App.css"

import { listen } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

const appWindow = getCurrentWindow()

function App() {
  const [isMaximized, setIsMaximized] = useState(false)

  const [greetMsg, setGreetMsg] = useState("")
  const [name, setName] = useState("")

  async function greet() {
    setGreetMsg(await invoke("greet", { name }))
  }

  useEffect(() => {
    setTimeout(() => {
      appWindow.show()
    }, 200)
  }, [])

  useEffect(() => {
    async function initializeWindowState() {
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
    }

    const unlisten = listen("tauri://resize", async () => {
      const maximized = await appWindow.isMaximized()
      setIsMaximized(maximized)
    })

    setTimeout(() => {
      appWindow.show()
      initializeWindowState()
    }, 200)

    return () => {
      unlisten.then((fn) => fn())
    }
  }, [])

  return (
    <main className="container">
      <h1>Welcome to Tauri + React</h1>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>
      <p>{isMaximized ? "True" : "False"}</p>

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
