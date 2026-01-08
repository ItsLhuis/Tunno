import { useCallback, type ReactNode } from "react"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { SearchInput } from "@components/ui"

type ArtistsListSearchProps = {
  renderRight?: ReactNode
}

const ArtistsListSearch = ({ renderRight }: ArtistsListSearchProps) => {
  const { searchTerm, setSearchTerm } = useArtistsStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm
    }))
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setSearchTerm(value)
    },
    [setSearchTerm]
  )

  return (
    <SearchInput value={searchTerm} onChangeText={handleInputChange} renderRight={renderRight} />
  )
}

export { ArtistsListSearch }
