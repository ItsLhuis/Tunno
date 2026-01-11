import { create } from "zustand"

import { type SyncState, type SyncStatus } from "../types"

/**
 * Represents the actions available in the sync store.
 */
type SyncActions = {
  setStatus: (status: SyncStatus) => void
  setOutputPath: (path: string) => void
  setTotalSongs: (count: number) => void
  setCurrentSongIndex: (index: number) => void
  incrementExportedCount: () => void
  incrementErrorCount: () => void
  setError: (error: string | null) => void
  setBundlePath: (path: string) => void
  resetStore: () => void
}

/**
 * Combines the state and actions for the sync store.
 */
type SyncStore = SyncState & SyncActions

/**
 * Zustand store for managing the state of the library export/synchronization process.
 *
 * This store tracks the status, progress, output paths, and any errors that occur
 * during the creation of a library export bundle.
 */
export const useSyncStore = create<SyncStore>()((set, get) => ({
  status: "idle",
  outputPath: null,
  totalSongs: 0,
  currentSongIndex: 0,
  exportedCount: 0,
  errorCount: 0,
  error: null,
  startedAt: null,
  completedAt: null,
  bundlePath: null,
  setStatus: (status) => {
    const update: Partial<SyncState> = { status }

    if (status === "exporting" && !get().startedAt) {
      update.startedAt = new Date().toISOString()
    }

    if (status === "completed") {
      update.completedAt = new Date().toISOString()
    }

    set(update)
  },
  setOutputPath: (path) => {
    set({ outputPath: path })
  },
  setTotalSongs: (count) => {
    set({ totalSongs: count })
  },
  setCurrentSongIndex: (index) => {
    set({ currentSongIndex: index })
  },
  incrementExportedCount: () => {
    set((state) => ({
      exportedCount: state.exportedCount + 1
    }))
  },
  incrementErrorCount: () => {
    set((state) => ({
      errorCount: state.errorCount + 1
    }))
  },
  setError: (error) => {
    set({ error, status: error ? "error" : get().status })
  },
  setBundlePath: (path) => {
    set({ bundlePath: path })
  },
  resetStore: () => {
    set({
      status: "idle",
      outputPath: null,
      totalSongs: 0,
      currentSongIndex: 0,
      exportedCount: 0,
      errorCount: 0,
      error: null,
      startedAt: null,
      completedAt: null,
      bundlePath: null
    })
  }
}))
