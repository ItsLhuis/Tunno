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

import { BrowserRouter } from "react-router-dom"

import { MotionConfig } from "motion/react"

import App from "./App"

import { Toaster } from "@components/ui"

import "@repo/i18n"

import "../global.css"

const Main = () => {
  const { hasHydrated } = useSettingsStore()

  useEffect(() => {
    if (!hasHydrated) return

    const showMainWindow = async () => {
      await getCurrentWindow().show()
      if (!import.meta.env.DEV) await getCurrentWindow().setFocus()
    }

    showMainWindow()
  }, [hasHydrated])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MotionConfig
          transition={{
            duration: 0.3
          }}
        >
          <BrowserRouter>
            <App />
          </BrowserRouter>
          <Toaster />
        </MotionConfig>
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
