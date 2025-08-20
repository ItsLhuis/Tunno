import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type VisibilityState } from "@tanstack/react-table"

const SONGS_STORE_NAME = "songs"

type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
  visibleColumns: VisibilityState
  hasHydrated: boolean
}

type SongsActions = {
  setSearchTerm: (term: string) => void
  setVisibleColumns: (columns: VisibilityState) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type SongsStore = SongsState & SongsActions

export const useSongsStore = create<SongsStore>()(
  persist(
    (set) => {
      const debouncedUpdate = debounce((term: string) => {
        set({ debouncedSearchTerm: term })
      }, 300)

      return {
        searchTerm: "",
        debouncedSearchTerm: "",
        visibleColumns: {},
        hasHydrated: false,
        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
          debouncedUpdate(term)
        },
        setVisibleColumns: (columns) => set({ visibleColumns: columns }),
        setHasHydrated: (hasHydrated) => {
          set({ hasHydrated })
        }
      }
    },
    {
      name: SONGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SONGS_STORE_NAME}.json`),
      partialize: (state) => ({
        visibleColumns: state.visibleColumns
      }),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)
