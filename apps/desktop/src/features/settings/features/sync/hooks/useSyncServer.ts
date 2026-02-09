import { useCallback, useEffect } from "react"

import { useSyncServerStore } from "../stores/useSyncServerStore"

import {
  backfillFingerprints,
  getQrData,
  getServerInfo,
  getSyncStatus,
  isServerRunning,
  startServer,
  stopServer
} from "../api/tauri"

/**
 * A custom hook that manages the sync server lifecycle for desktop-to-mobile pairing.
 *
 * This hook handles starting and stopping the local Warp server, backfilling
 * fingerprints before startup, and generating QR code data for mobile pairing.
 * The server persists across navigation — it is only stopped when the user
 * explicitly clicks "Stop Server" via `stopSync`. On mount, the hook restores
 * store state if the server is already running.
 *
 * @returns An object containing:
 * - `isServerRunning`: Whether the sync server is currently active.
 * - `serverUrl`: The local network URL of the running server.
 * - `qrData`: JSON string for QR code generation (contains host, port, token).
 * - `syncStatus`: Current sync lifecycle status.
 * - `startSync`: Function to backfill fingerprints and start the server.
 * - `stopSync`: Function to stop the server and reset state.
 */
export function useSyncServer() {
  const isRunning = useSyncServerStore((state) => state.isServerRunning)
  const serverUrl = useSyncServerStore((state) => state.serverUrl)
  const qrData = useSyncServerStore((state) => state.qrData)
  const syncStatus = useSyncServerStore((state) => state.syncStatus)
  const setServerRunning = useSyncServerStore((state) => state.setServerRunning)
  const setSyncStatus = useSyncServerStore((state) => state.setSyncStatus)
  const reset = useSyncServerStore((state) => state.reset)

  useEffect(() => {
    const checkServerStatus = async () => {
      const running = await isServerRunning()

      if (running) {
        const qr = await getQrData()
        const info = await getServerInfo()

        setServerRunning(true, info?.url ?? undefined, qr ?? undefined)
      }
    }

    checkServerStatus()
  }, [setServerRunning])

  // Poll sync status while server is running
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(async () => {
      try {
        const status = await getSyncStatus()
        const validStatuses = [
          "waiting",
          "connected",
          "syncing",
          "completed",
          "cancelled",
          "timedOut"
        ] as const
        type ValidStatus = (typeof validStatuses)[number]

        if (validStatuses.includes(status as ValidStatus)) {
          setSyncStatus(status as ValidStatus)
        }
      } catch {
        // Server may have stopped
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [isRunning, setSyncStatus])

  const startSync = useCallback(async () => {
    try {
      await backfillFingerprints()

      const info = await startServer()
      const qr = await getQrData()

      setServerRunning(true, info.url, qr ?? undefined)
    } catch (error) {
      setSyncStatus("idle")
      throw error
    }
  }, [setServerRunning, setSyncStatus])

  const stopSync = useCallback(async () => {
    await stopServer()
    reset()
  }, [reset])

  return {
    isServerRunning: isRunning,
    serverUrl,
    qrData,
    syncStatus,
    startSync,
    stopSync
  }
}
