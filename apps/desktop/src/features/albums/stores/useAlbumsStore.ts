import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type AlbumFilters, type OrderableAlbumColumns } from "@repo/api"

const ALBUMS_STORE_NAME = "albums"

/**
 * Represents the state structure of the {@link useAlbumsStore}.
 */
type AlbumsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: AlbumFilters
  debouncedFilters: AlbumFilters
  orderBy: { column: OrderableAlbumColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useAlbumsStore}.
 */
type AlbumsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<AlbumFilters>) => void
  clearFilters: () => void
  setOrderBy: (orderBy: { column: OrderableAlbumColumns; direction: "asc" | "desc" } | null) => void
  setViewMode: (viewMode: "grid" | "list") => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link useAlbumsStore}.
 */
type AlbumsStore = AlbumsState & AlbumsActions

/**
 * Zustand store for managing album-related UI state and preferences.
 *
 * This store handles:
 * - `searchTerm`: The current search query for albums.
 * - `filters`: Active filters applied to the album list.
 * - `orderBy`: Sorting preferences for albums.
 * - `viewMode`: Display mode for albums (grid or list).
 * - Persistence of filters, sorting, and view mode across app sessions.
 *
 * It uses debouncing for search and filter updates to optimize performance and reduce re-renders.
 *
 * @returns A Zustand store instance with album state and actions.
 */
export const useAlbumsStore = create<AlbumsStore>()(
  persist(
    (set, get) => {
      const debouncedSearchUpdate = debounce((term: string) => {
        set({ debouncedSearchTerm: term })
        const currentFilters = get().filters
        const currentDebouncedFilters = get().debouncedFilters

        const updatedFilters: Partial<AlbumFilters> = {
          ...currentFilters,
          search: term || undefined
        }
        const updatedDebouncedFilters: Partial<AlbumFilters> = {
          ...currentDebouncedFilters,
          search: term || undefined
        }

        set({
          filters: updatedFilters,
          debouncedFilters: updatedDebouncedFilters
        })
      }, 300)

      const debouncedFiltersUpdate = debounce((filters: AlbumFilters) => {
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
        setFilters: (filters: Partial<AlbumFilters>) => {
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
      name: ALBUMS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${ALBUMS_STORE_NAME}.json`),
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
