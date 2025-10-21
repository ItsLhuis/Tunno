import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type AlbumFilters, type OrderableAlbumColumns } from "@repo/api"

const ALBUMS_STORE_NAME = "albums"

type AlbumsState = {
  searchTerm: string
  debouncedSearchTerm: string
  filters: AlbumFilters
  debouncedFilters: AlbumFilters
  orderBy: { column: OrderableAlbumColumns; direction: "asc" | "desc" } | null
  viewMode: "grid" | "list"
  hasHydrated: boolean
}

type AlbumsActions = {
  setSearchTerm: (term: string) => void
  setFilters: (filters: Partial<AlbumFilters>) => void
  clearFilters: () => void
  setOrderBy: (orderBy: { column: OrderableAlbumColumns; direction: "asc" | "desc" } | null) => void
  setViewMode: (viewMode: "grid" | "list") => void
  setHasHydrated: (hasHydrated: boolean) => void
}

type AlbumsStore = AlbumsState & AlbumsActions

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
        filters: { ...state.filters, search: undefined },
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
