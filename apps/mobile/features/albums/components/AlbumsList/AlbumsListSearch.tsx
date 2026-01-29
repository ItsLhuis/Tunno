import { useCallback, type ReactNode } from "react"

import { useAlbumsStore } from "../../stores/useAlbumsStore"

import { SearchInput } from "@components/ui"

type AlbumsListSearchProps = {
  renderRight?: ReactNode
}

const AlbumsListSearch = ({ renderRight }: AlbumsListSearchProps) => {
  const searchTerm = useAlbumsStore((state) => state.searchTerm)
  const setSearchTerm = useAlbumsStore((state) => state.setSearchTerm)

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
