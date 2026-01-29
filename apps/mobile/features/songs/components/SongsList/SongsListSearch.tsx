import { useCallback, type ReactNode } from "react"

import { useSongsStore } from "../../stores/useSongsStore"

import { SearchInput } from "@components/ui"

type SongsListSearchProps = {
  renderRight?: ReactNode
}

const SongsListSearch = ({ renderRight }: SongsListSearchProps) => {
  const searchTerm = useSongsStore((state) => state.searchTerm)
  const setSearchTerm = useSongsStore((state) => state.setSearchTerm)

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

export { SongsListSearch }
