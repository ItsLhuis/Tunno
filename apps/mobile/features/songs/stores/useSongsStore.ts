import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type OrderableSongColumns, type SongFilters } from "@repo/api"

const SONGS_STORE_NAME = "songs"

/**
 * Represents the state structure of the {@link useSongsStore}.
 */
type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: SongFilters
  debouncedFilters: SongFilters
  orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useSongsStore}.
 */
type SongsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<SongFilters>) => void
  clearFilters: () => void
  setOrderBy: (orderBy: { column: OrderableSongColumns; direction: "asc" | "desc" } | null) => void
  setViewMode: (viewMode: "grid" | "list") => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link useSongsStore}.
 */
type SongsStore = SongsState & SongsActions

/**
 * Zustand store for managing song-related UI state and preferences.
 *
 * This store handles:
 * - `searchTerm`: The current search query for songs.
 * - `filters`: Active filters applied to the song list.
 * - `orderBy`: Sorting preferences for songs.
 * - `viewMode`: Display mode for songs (grid or list).
 * - Persistence of filters, sorting, and view mode across app sessions.
 *
 * It uses debouncing for search and filter updates to optimize performance and reduce re-renders.
 *
 * @returns A Zustand store instance with song state and actions.
 */
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
        viewMode: "list",
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
        setViewMode: (viewMode) => {
          set({ viewMode })
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
        // Only persist filters, orderBy, and viewMode. Exclude search term from persistence.
        filters: { ...state.filters, search: undefined },
        orderBy: state.orderBy,
        viewMode: state.viewMode
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            // After rehydration, ensure debouncedFilters is initialized with the restored filters.
            // This is important because `filters` might be restored from persistence, but `debouncedFilters` is not part of partialize.
            state.debouncedFilters = state.filters

            state.setHasHydrated(true)
          }
        }
      }
    }
  )
)
