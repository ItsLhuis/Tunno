import React from "react"
import ReactDOM from "react-dom/client"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { ThemeProvider } from "@contexts/ThemeContext"

import App from "./App"
import { Toaster } from "@components/ui"

import "@i18n/config"

import "../../global.css"

const showMainWindow = async () => {
  let showMainWindowTimeout: NodeJS.Timeout

  showMainWindowTimeout = setTimeout(async () => {
    await getCurrentWindow().show()
    await getCurrentWindow().setFocus()
  }, 200)

  return () => clearTimeout(showMainWindowTimeout)
}

showMainWindow()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
)
