import { useEffect, StrictMode } from "react"
import ReactDOM from "react-dom/client"

import { listen } from "@tauri-apps/api/event"

import { useSettingsStore } from "@stores/useSettingsStore"

import { ThemeProvider } from "@contexts/ThemeContext"

import { ScopedTheme, Toaster } from "@components/ui"

import { MiniPlayer } from "@features/player/components/MiniPlayer"

import "@repo/i18n"
import { i18n, type LocaleKeys } from "@repo/i18n"
import "./global.css"

const Main = () => {
  const language = useSettingsStore((state) => state.language)

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    const setupLanguageListener = async () => {
      const unlisten = await listen<LocaleKeys>("settings:language-changed", (event) => {
        i18n.changeLanguage(event.payload)
      })

      return unlisten
    }

    let cleanup: (() => void) | undefined

    setupLanguageListener().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

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
  <StrictMode>
    <Main />
  </StrictMode>
)
