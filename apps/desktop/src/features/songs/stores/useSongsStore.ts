import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

const SONGS_STORE_NAME = "songs"

type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
  hasHydrated: boolean
}

type SongsActions = {
  setSearchTerm: (term: string) => void
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
        hasHydrated: false,
        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
          debouncedUpdate(term)
        },
        setHasHydrated: (hasHydrated) => {
          set({ hasHydrated })
        }
      }
    },
    {
      name: SONGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SONGS_STORE_NAME}.json`),
      partialize: () => ({}),
      onRehydrateStorage: (state) => {
        return () => state.setHasHydrated(true)
      }
    }
  )
)
