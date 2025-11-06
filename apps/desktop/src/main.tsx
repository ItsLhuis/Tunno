import { scan } from "react-scan"
scan({ enabled: import.meta.env.DEV })

import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"

import { listen } from "@tauri-apps/api/event"
import { getCurrentWindow } from "@tauri-apps/api/window"

import { useAllStoresHydrated } from "@utils/stores"

import { useToggleSongFavorite } from "@features/songs/hooks/useToggleSongFavorite"

import { cleanupAllFastUploadCache } from "@features/fastUpload/api/tauri"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

import { queryClient } from "@lib/queryClient"

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

const PlayerFavoriteListener = () => {
  const toggleFavoriteMutation = useToggleSongFavorite()

  useEffect(() => {
    const setupFavoriteListener = async () => {
      const unlisten = await listen<number>("player:toggle-favorite", (event) => {
        toggleFavoriteMutation.mutate({ id: event.payload })
      })

      return unlisten
    }

    let cleanup: (() => void) | undefined

    setupFavoriteListener().then((cleanupFn) => {
      cleanup = cleanupFn
    })

    return () => {
      if (cleanup) cleanup()
    }
  }, [toggleFavoriteMutation])

  return null
}

const Main = () => {
  const allStoresHydrated = useAllStoresHydrated()

  useEffect(() => {
    if (!allStoresHydrated) return

    const showMainWindow = async () => {
      await cleanupAllFastUploadCache()
      await new Promise((resolve) => setTimeout(resolve, 300))
      await getCurrentWindow().show()
      if (!import.meta.env.DEV) await getCurrentWindow().setFocus()
    }

    showMainWindow()
  }, [allStoresHydrated])

  if (!allStoresHydrated) return

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <PlayerFavoriteListener />
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
