import React from "react"
import ReactDOM from "react-dom/client"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { ThemeProvider } from "@contexts/ThemeContext"

import MainApp from "@main/App"
import OverlayApp from "@overlay/App"

import "./global.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      {getCurrentWindow().label === "main" ? <MainApp /> : <OverlayApp />}
    </ThemeProvider>
  </React.StrictMode>
)
