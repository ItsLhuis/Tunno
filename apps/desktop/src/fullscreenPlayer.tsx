import { useEffect, StrictMode } from "react"
import ReactDOM from "react-dom/client"

import { listen } from "@tauri-apps/api/event"
import { WebviewWindow } from "@tauri-apps/api/webviewWindow"

import { useShallow } from "zustand/shallow"

import { useSettingsStore } from "@stores/useSettingsStore"

import { ThemeProvider } from "@contexts/ThemeContext"

import { ScopedTheme, Toaster } from "@components/ui"

import { FullscreenPlayer } from "@features/player/components/FullscreenPlayer"

import "@repo/i18n"
import { i18n, type LocaleKeys } from "@repo/i18n"
import "./global.css"

const Main = () => {
  const { language } = useSettingsStore(
    useShallow((state) => ({
      language: state.language
    }))
  )

  useEffect(() => {
    const ensureMainWindowHidden = async () => {
      const mainWindow = await WebviewWindow.getByLabel("main")
      if (mainWindow) {
        await mainWindow.hide()
      }
    }

    ensureMainWindowHidden()
  }, [])

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
        <FullscreenPlayer />
        <Toaster />
      </ScopedTheme>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById("fullscreenPlayer") as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
)
