import { useCallback, useEffect, useRef } from "react"

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
 * fingerprints before startup, generating QR code data for mobile pairing,
 * and automatically stopping the server on unmount. It restores server state
 * if the server is already running when the component mounts.
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

  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    const checkServerStatus = async () => {
      const running = await isServerRunning()

      if (!isMounted.current) return

      if (running) {
        const qr = await getQrData()

        if (!isMounted.current) return

        const info = await getServerInfo()

        if (!isMounted.current) return

        setServerRunning(true, info?.url ?? undefined, qr ?? undefined)
      } else {
        reset()
      }
    }

    checkServerStatus()

    return () => {
      isMounted.current = false
    }
  }, [setServerRunning, reset])

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

      if (isMounted.current) {
        setServerRunning(true, info.url, qr ?? undefined)
      }
    } catch (error) {
      if (isMounted.current) {
        setSyncStatus("idle")
      }
      throw error
    }
  }, [setServerRunning, setSyncStatus])

  const stopSync = useCallback(async () => {
    await stopServer()

    if (isMounted.current) {
      reset()
    }
  }, [reset])

  useEffect(() => {
    return () => {
      reset()
      isServerRunning().then((running) => {
        if (running) {
          stopServer()
        }
      })
    }
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
