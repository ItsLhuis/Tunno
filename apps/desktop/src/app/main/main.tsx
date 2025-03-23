import { scan } from "react-scan"
scan({ enabled: import.meta.env.DEV })

import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { ThemeProvider } from "@contexts/ThemeContext"

import { useSettingsStore } from "@stores/useSettingsStore"

import App from "./App"

import { Toaster } from "@components/ui"

import "@i18n/config"

import "../../global.css"

const Main = () => {
  const { hasHydrated } = useSettingsStore()

  useEffect(() => {
    if (!hasHydrated) return

    let showMainWindowTimeout: NodeJS.Timeout

    showMainWindowTimeout = setTimeout(async () => {
      await getCurrentWindow().show()
      await getCurrentWindow().setFocus()
    }, 200)

    return () => clearTimeout(showMainWindowTimeout)
  }, [hasHydrated])

  return (
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
