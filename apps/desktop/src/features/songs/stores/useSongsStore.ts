import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type OrderableSongColumns, type SongFilters } from "@repo/api"

const SONGS_STORE_NAME = "songs"

type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: SongFilters
  debouncedFilters: SongFilters
  orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null
  hasHydrated: boolean
}

type SongsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<SongFilters>) => void
  clearFilters: () => void
  setOrderBy: (orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null) => void
  setHasHydrated: (hasHydrated: boolean) => void
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
        filters: {},
        debouncedFilters: {},
        orderBy: { column: "createdAt", direction: "desc" },
        hasHydrated: false,
        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
          debouncedSearchUpdate(term)
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
      partialize: (state) => ({
        filters: state.filters,
        orderBy: state.orderBy
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.debouncedFilters = state.filters
            state.debouncedSearchTerm = state.searchTerm

            state.setHasHydrated(true)
          }
        }
      }
    }
  )
)
