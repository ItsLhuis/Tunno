import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { type VisibilityState } from "@tanstack/react-table"

const SONGS_SETTINGS_STORE_NAME = "songs.settings"

type SongSettingsState = {
  visibleColumns: VisibilityState
  hasHydrated: boolean
}

type SongSettingsActions = {
  setVisibleColumns: (columns: VisibilityState) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type SongSettingsStore = SongSettingsState & SongSettingsActions

export const useSongsSettingsStore = create<SongSettingsStore>()(
  persist(
    (set) => ({
      visibleColumns: {},
      hasHydrated: false,
      setVisibleColumns: (columns) => set({ visibleColumns: columns }),
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      }
    }),
    {
      name: SONGS_SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SONGS_SETTINGS_STORE_NAME}.json`),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)
