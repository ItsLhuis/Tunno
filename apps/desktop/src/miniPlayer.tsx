import { scan } from "react-scan"
scan({ enabled: import.meta.env.DEV })

import React from "react"
import ReactDOM from "react-dom/client"

import { ThemeProvider } from "@contexts/ThemeContext"

import { ScopedTheme, Toaster } from "@components/ui"

import { MiniPlayer } from "@features/player/components/MiniPlayer"

import "@repo/i18n"
import "./global.css"

const Main = () => {
  return (
    <ThemeProvider>
      <ScopedTheme theme="dark">
        <MiniPlayer />
        <Toaster />
      </ScopedTheme>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("miniPlayer") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
