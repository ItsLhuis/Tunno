import { useCallback, type ReactNode } from "react"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { SearchInput } from "@components/ui"

type ArtistsListSearchProps = {
  renderRight?: ReactNode
}

const ArtistsListSearch = ({ renderRight }: ArtistsListSearchProps) => {
  const searchTerm = useArtistsStore((state) => state.searchTerm)
  const setSearchTerm = useArtistsStore((state) => state.setSearchTerm)

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
