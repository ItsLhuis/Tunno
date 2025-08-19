import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { type VisibilityState } from "@tanstack/react-table"

const SONGS_SETTINGS_STORE_NAME = "songs.settings"

type SongSettingsState = {
  visibleColumns: VisibilityState
  volume: number
  isMuted: boolean
  hasHydrated: boolean
}

type SongSettingsActions = {
  setVisibleColumns: (columns: VisibilityState) => void
  setVolume: (volume: number) => void
  setIsMuted: (isMuted: boolean) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type SongSettingsStore = SongSettingsState & SongSettingsActions

export const useSongsSettingsStore = create<SongSettingsStore>()(
  persist(
    (set) => ({
      visibleColumns: {},
      setVisibleColumns: (columns) => set({ visibleColumns: columns }),
      volume: 1,
      setVolume: (volume) => set({ volume }),
      isMuted: false,
      setIsMuted: (isMuted) => set({ isMuted }),
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => {
        set({ hasHydrated })
      }
    }),
    {
      name: SONGS_SETTINGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SONGS_SETTINGS_STORE_NAME}.json`),
      onRehydrateStorage: (state) => {
        console.log("ola")
        return () => state.setHasHydrated(true)
      }
    }
  )
)
