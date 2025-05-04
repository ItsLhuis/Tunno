import { scan } from "react-scan"
scan({ enabled: import.meta.env.DEV })

import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { useSettingsStore } from "@stores/useSettingsStore"

import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

import { ThemeProvider } from "@contexts/ThemeContext"

import App from "./App"

import { Toaster } from "@components/ui"

import "@i18n/config"

import "../global.css"

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
