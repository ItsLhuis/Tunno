import { create } from "zustand"
import { persist } from "zustand/middleware"

import { persistStorage } from "@stores/config/persist"

import { debounce } from "lodash"

import { type OrderableArtistColumns, type ArtistFilters } from "@repo/api"

const ARTISTS_STORE_NAME = "artists"

type ArtistsState = {
  searchTerm: string
  debouncedSearchTerm: string
  hasHydrated: boolean
  filters: ArtistFilters
  debouncedFilters: ArtistFilters
  orderBy: { column: OrderableArtistColumns; direction: "asc" | "desc" } | null
}

type ArtistsActions = {
  setSearchTerm: (term: string) => void
  setHasHydrated: (hasHydrated: boolean) => void
  setFilters: (filters: Partial<ArtistFilters>) => void
  clearFilters: () => void
  setOrderBy: (
    orderBy: { column: OrderableArtistColumns; direction: "asc" | "desc" } | null
  ) => void
}

type ArtistsStore = ArtistsState & ArtistsActions

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
        }
      }
    },
    {
      name: ARTISTS_STORE_NAME,
      version: 1,
      storage: persistStorage(`.${ARTISTS_STORE_NAME}.json`),
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
