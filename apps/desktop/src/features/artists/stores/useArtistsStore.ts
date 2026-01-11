import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type ArtistFilters, type OrderableArtistColumns } from "@repo/api"

const ARTISTS_STORE_NAME = "artists"

/**
 * Represents the state structure of the {@link useArtistsStore}.
 */
type ArtistsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: ArtistFilters
  debouncedFilters: ArtistFilters
  orderBy: { column: OrderableArtistColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

/**
 * Defines the available actions (methods) that can be dispatched on the {@link useArtistsStore}.
 */
type ArtistsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<ArtistFilters>) => void
  clearFilters: () => void
  setOrderBy: (
    orderBy: { column: OrderableArtistColumns; direction: "asc" | "desc" } | null
  ) => void
  setViewMode: (viewMode: "grid" | "list") => void
  setHasHydrated: (hasHydrated: boolean) => void
}

/**
 * Combines the state and actions interfaces for the {@link useArtistsStore}.
 */
type ArtistsStore = ArtistsState & ArtistsActions

/**
 * Zustand store for managing artist-related UI state and preferences.
 *
 * This store handles:
 * - `searchTerm`: The current search query for artists.
 * - `filters`: Active filters applied to the artist list.
 * - `orderBy`: Sorting preferences for artists.
 * - `viewMode`: Display mode for artists (grid or list).
 * - Persistence of filters, sorting, and view mode across app sessions.
 *
 * It uses debouncing for search and filter updates to optimize performance and reduce re-renders.
 *
 * @returns A Zustand store instance with artist state and actions.
 */
export const useArtistsStore = create<ArtistsStore>()(
  persist(
    (set, get) => {
      const debouncedSearchUpdate = debounce((term: string) => {
        set({ debouncedSearchTerm: term })
        const currentFilters = get().filters
        const currentDebouncedFilters = get().debouncedFilters

        const updatedFilters: Partial<ArtistFilters> = {
          ...currentFilters,
          search: term || undefined
        }
        const updatedDebouncedFilters: Partial<ArtistFilters> = {
          ...currentDebouncedFilters,
          search: term || undefined
        }

        set({
          filters: updatedFilters,
          debouncedFilters: updatedDebouncedFilters
        })
      }, 300)

      const debouncedFiltersUpdate = debounce((filters: ArtistFilters) => {
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
        setFilters: (filters: Partial<ArtistFilters>) => {
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
      name: ARTISTS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${ARTISTS_STORE_NAME}.json`),
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
