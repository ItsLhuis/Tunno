import { create } from "zustand"

/**
 * Represents the possible states of the sync server lifecycle.
 */
type SyncServerStatus =
  | "idle"
  | "waiting"
  | "connected"
  | "syncing"
  | "completed"
  | "cancelled"
  | "timedOut"

/**
 * Represents the state structure of the {@link useSyncServerStore}.
 */
type SyncServerState = {
  isServerRunning: boolean
  serverUrl: string | null
  qrData: string | null
  syncStatus: SyncServerStatus
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useSyncServerStore}.
 */
type SyncServerActions = {
  setServerRunning: (running: boolean, url?: string, qrData?: string) => void
  setSyncStatus: (status: SyncServerStatus) => void
  reset: () => void
}

/**
 * Combines the state and actions interfaces for the {@link useSyncServerStore}.
 */
type SyncServerStore = SyncServerState & SyncServerActions

/**
 * Zustand store for managing the state and actions of the sync server.
 *
 * This store centralizes all information related to the local sync server,
 * tracking whether it's running, its URL, QR code data for mobile pairing,
 * and the current sync status throughout the connection lifecycle.
 */
export const useSyncServerStore = create<SyncServerStore>()((set) => ({
  isServerRunning: false,
  serverUrl: null,
  qrData: null,
  syncStatus: "idle",
  setServerRunning: (running, url, qrData) => {
    set({
      isServerRunning: running,
      serverUrl: url ?? null,
      qrData: qrData ?? null,
      syncStatus: running ? "waiting" : "idle"
    })
  },
  setSyncStatus: (syncStatus) => {
    set({ syncStatus })
  },
  reset: () => {
    set({
      isServerRunning: false,
      serverUrl: null,
      qrData: null,
      syncStatus: "idle"
    })
  }
}))
