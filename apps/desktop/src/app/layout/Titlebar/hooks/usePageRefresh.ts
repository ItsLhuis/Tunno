import { useEffect, useRef } from "react"

import { useRouterState } from "@tanstack/react-router"

import { useRefreshStore } from "../stores/useRefreshStore"

type RefreshFunction = () => Promise<void> | void

type UsePageRefreshOptions = {
  refreshFn: RefreshFunction
  tooltip?: string
  enabled?: boolean
}

export function usePageRefresh({ refreshFn, tooltip, enabled = true }: UsePageRefreshOptions) {
  const routerState = useRouterState()

  const { registerRefresh, unregisterRefresh, clearAll } = useRefreshStore()

  const refreshFnRef = useRef<RefreshFunction | null>(null)

  const currentPathRef = useRef<string>("")

  useEffect(() => {
    const currentPath = routerState.location.pathname

    if (currentPathRef.current !== "" && currentPathRef.current !== currentPath) {
      clearAll()
    }

    currentPathRef.current = currentPath
  }, [routerState.location.pathname, clearAll])

  useEffect(() => {
    if (!enabled) {
      if (refreshFnRef.current) {
        unregisterRefresh(refreshFnRef.current)
        refreshFnRef.current = null
      }
      return
    }

    registerRefresh(refreshFn, tooltip)
    refreshFnRef.current = refreshFn

    return () => {
      if (refreshFnRef.current) {
        unregisterRefresh(refreshFnRef.current)
        refreshFnRef.current = null
      }
    }
  }, [refreshFn, tooltip, enabled, registerRefresh, unregisterRefresh])

  useEffect(() => {
    return () => {
      if (refreshFnRef.current) {
        unregisterRefresh(refreshFnRef.current)
        refreshFnRef.current = null
      }
    }
  }, [unregisterRefresh])
}
