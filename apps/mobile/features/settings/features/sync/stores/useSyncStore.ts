import { create } from "zustand"

import {
  type SyncConnectionData,
  type SyncError,
  type SyncProgress,
  type SyncState
} from "../types"

/**
 * Represents the state structure of the {@link useSyncStore}.
 */
type SyncStoreState = {
  syncState: SyncState
  connectionData: SyncConnectionData | null
  progress: SyncProgress
  errors: SyncError[]
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useSyncStore}.
 */
type SyncStoreActions = {
  setConnectionData: (data: SyncConnectionData) => void
  setSyncState: (state: SyncState) => void
  updateProgress: (progress: Partial<SyncProgress>) => void
  addError: (error: SyncError) => void
  reset: () => void
}

/**
 * Combines the state and actions interfaces for the {@link useSyncStore}.
 */
type SyncStore = SyncStoreState & SyncStoreActions

/**
 * Zustand store for managing sync session state.
 *
 * This store handles:
 * - `syncState`: The current phase of the sync lifecycle.
 * - `connectionData`: Desktop server connection details parsed from the QR code.
 * - `progress`: Real-time tracking of synced items, batches, and current operation.
 * - `errors`: Accumulated errors encountered during the sync process.
 *
 * This store is non-persisted — state is cleared when the app restarts or when
 * `reset()` is called after sync completes.
 */
export const useSyncStore = create<SyncStore>()((set) => ({
  syncState: "idle",
  connectionData: null,
  progress: {
    totalItems: 0,
    syncedItems: 0,
    currentBatch: 0,
    totalBatches: 0,
    currentOperation: null
  },
  errors: [],
  setConnectionData: (data) => {
    set({ connectionData: data })
  },
  setSyncState: (syncState) => {
    set({ syncState })
  },
  updateProgress: (progress) => {
    set((state) => ({
      progress: { ...state.progress, ...progress }
    }))
  },
  addError: (error) => {
    set((state) => ({
      errors: [...state.errors, error]
    }))
  },
  reset: () => {
    set({
      syncState: "idle",
      connectionData: null,
      progress: {
        totalItems: 0,
        syncedItems: 0,
        currentBatch: 0,
        totalBatches: 0,
        currentOperation: null
      },
      errors: []
    })
  }
}))
