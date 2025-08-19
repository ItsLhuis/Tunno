import { create } from "zustand"

import { debounce } from "lodash"

type SongsState = {
  searchTerm: string
  debouncedSearchTerm: string
}

type SongsActions = {
  setSearchTerm: (term: string) => void
}

type SongsStore = SongsState & SongsActions

export const useSongsStore = create<SongsStore>((set) => {
  const debouncedUpdate = debounce((term: string) => {
    set({ debouncedSearchTerm: term })
  }, 300)

  return {
    searchTerm: "",
    debouncedSearchTerm: "",
    setSearchTerm: (term: string) => {
      set({ searchTerm: term })
      debouncedUpdate(term)
    }
  }
})
