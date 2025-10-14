import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type PlaylistFilters, type OrderablePlaylistColumns } from "@repo/api"

const PLAYLISTS_STORE_NAME = "playlists"

type PlaylistsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: PlaylistFilters
  debouncedFilters: PlaylistFilters
  orderBy: { column: OrderablePlaylistColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

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

type PlaylistsStore = PlaylistsState & PlaylistsActions

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
            orderBy: { column: "createdAt", direction: "desc" },
            viewMode: "grid"
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
        filters: state.filters,
        orderBy: state.orderBy,
        viewMode: state.viewMode
      }),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.debouncedFilters = state.filters

            state.setHasHydrated(true)
          }
        }
      }
    }
  )
)
