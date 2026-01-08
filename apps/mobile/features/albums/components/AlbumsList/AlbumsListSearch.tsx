import { useCallback, type ReactNode } from "react"

import { useShallow } from "zustand/shallow"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import { SearchInput } from "@components/ui"

type AlbumsListSearchProps = {
  renderRight?: ReactNode
}

const AlbumsListSearch = ({ renderRight }: AlbumsListSearchProps) => {
  const { searchTerm, setSearchTerm } = useAlbumsStore(
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

export { AlbumsListSearch }
