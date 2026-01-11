import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type OrderablePlaylistColumns, type PlaylistFilters } from "@repo/api"

const PLAYLISTS_STORE_NAME = "playlists"

/**
 * Represents the state structure of the {@link usePlaylistsStore}.
 */
type PlaylistsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: PlaylistFilters
  debouncedFilters: PlaylistFilters
  orderBy: { column: OrderablePlaylistColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link usePlaylistsStore}.
 */
type PlaylistsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<PlaylistFilters>) => void
  clearFilters: () => void
  setOrderBy: (
    orderBy: { column: OrderablePlaylistColumns; direction: "asc" | "desc" } | null
  ) => void
  setViewMode: (viewMode: "grid" | "list") => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link usePlaylistsStore}.
 */
type PlaylistsStore = PlaylistsState & PlaylistsActions

/**
 * Zustand store for managing playlist-related UI state and preferences.
 *
 * This store handles:
 * - `searchTerm`: The current search query for playlists.
 * - `filters`: Active filters applied to the playlist list.
 * - `orderBy`: Sorting preferences for playlists.
 * - `viewMode`: Display mode for playlists (grid or list).
 * - Persistence of filters, sorting, and view mode across app sessions.
 *
 * It uses debouncing for search and filter updates to optimize performance and reduce re-renders.
 *
 * @returns A Zustand store instance with playlist state and actions.
 */
export const usePlaylistsStore = create<PlaylistsStore>()(
  persist(
    (set, get) => {
      const debouncedSearchUpdate = debounce((term: string) => {
        set({ debouncedSearchTerm: term })
        const currentFilters = get().filters
        const currentDebouncedFilters = get().debouncedFilters

        const updatedFilters: Partial<PlaylistFilters> = {
          ...currentFilters,
          search: term || undefined
        }
        const updatedDebouncedFilters: Partial<PlaylistFilters> = {
          ...currentDebouncedFilters,
          search: term || undefined
        }

        set({
          filters: updatedFilters,
          debouncedFilters: updatedDebouncedFilters
        })
      }, 300)

      const debouncedFiltersUpdate = debounce((filters: PlaylistFilters) => {
        set({ debouncedFilters: filters })
      }, 300)

      return {
        searchTerm: "",
        debouncedSearchTerm: "",
        filters: {},
        debouncedFilters: {},
        orderBy: { column: "createdAt", direction: "desc" },
        viewMode: "grid",
        hasHydrated: false,
        setSearchTerm: (term: string) => {
          set({ searchTerm: term })
          debouncedSearchUpdate(term)
        },
        setFilters: (filters: Partial<PlaylistFilters>) => {
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
      name: PLAYLISTS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${PLAYLISTS_STORE_NAME}.json`),
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
