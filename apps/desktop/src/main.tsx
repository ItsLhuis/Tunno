import { scan } from "react-scan"
scan({ enabled: import.meta.env.DEV })

import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

import { getCurrentWindow } from "@tauri-apps/api/window"

import { useAllStoresHydrated } from "@utils/stores"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

const router = createRouter({
  routeTree,
  context: {
    queryClient
  }
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

import { ThemeProvider } from "@contexts/ThemeContext"

import { Toaster } from "@components/ui"

import "@repo/i18n"
import "./global.css"

const Main = () => {
  const allStoresHydrated = useAllStoresHydrated()

  useEffect(() => {
    if (!allStoresHydrated) return

    const showMainWindow = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      await getCurrentWindow().show()
      if (!import.meta.env.DEV) await getCurrentWindow().setFocus()
    }

    showMainWindow()
  }, [allStoresHydrated])

  if (!allStoresHydrated) return

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
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
