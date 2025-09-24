import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type OrderableSongColumns, type SongFilters } from "@repo/api"

const SONGS_STORE_NAME = "songs"

type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
  hasHydrated: boolean
  filters: SongFilters
  debouncedFilters: SongFilters
  orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null
}

type SongsActions = {
  setSearchTerm: (term: string) => void
  setHasHydrated: (hasHydrated: boolean) => void
  setFilters: (filters: Partial<SongFilters>) => void
  clearFilters: () => void
  setOrderBy: (orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null) => void
}

type SongsStore = SongsState & SongsActions

export const useSongsStore = create<SongsStore>()(
  persist(
    (set, get) => {
      const debouncedSearchUpdate = debounce((term: string) => {
        set({ debouncedSearchTerm: term })
        const currentFilters = get().filters
        const currentDebouncedFilters = get().debouncedFilters

        const updatedFilters: Partial<SongFilters> = {
          ...currentFilters,
          search: term || undefined
        }
        const updatedDebouncedFilters: Partial<SongFilters> = {
          ...currentDebouncedFilters,
          search: term || undefined
        }

        set({
          filters: updatedFilters,
          debouncedFilters: updatedDebouncedFilters
        })
      }, 300)

      const debouncedFiltersUpdate = debounce((filters: SongFilters) => {
        set({ debouncedFilters: filters })
      }, 300)

      return {
        searchTerm: "",
        debouncedSearchTerm: "",
        hasHydrated: false,
        filters: {},
        debouncedFilters: {},
        orderBy: { column: "createdAt", direction: "desc" },
        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
          debouncedSearchUpdate(term)
        },
        setHasHydrated: (hasHydrated) => {
          set({ hasHydrated })
        },
        setFilters: (filters: Partial<SongFilters>) => {
          const currentFilters = get().filters
          const updatedFilters = {
            ...currentFilters,
            ...filters
          }
          set({ filters: updatedFilters })
          debouncedFiltersUpdate(updatedFilters)
        },
        clearFilters: () => {
          set({
            filters: {},
            debouncedFilters: {},
            searchTerm: "",
            debouncedSearchTerm: "",
            orderBy: { column: "createdAt", direction: "desc" }
          })
        },
        setOrderBy: (orderBy) => {
          set({ orderBy })
        }
      }
    },
    {
      name: SONGS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${SONGS_STORE_NAME}.json`),
      partialize: (state) => ({
        filters: state.filters,
        orderBy: state.orderBy
      }),
      onRehydrateStorage: (state) => {
        return () => state?.setHasHydrated(true)
      }
    }
  )
)
