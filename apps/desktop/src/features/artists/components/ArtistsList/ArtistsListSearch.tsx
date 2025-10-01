import { type ReactNode, useCallback } from "react"

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
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value)
    },
    [setSearchTerm]
  )

  return (
    <SearchInput
      containerClassName="p-9 pb-0 pt-6"
      value={searchTerm}
      onChange={handleInputChange}
      className="flex-1"
      renderRight={renderRight}
    />
  )
}

export { ArtistsListSearch }
