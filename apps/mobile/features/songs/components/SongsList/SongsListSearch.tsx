import { useCallback, type ReactNode } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { SearchInput } from "@components/ui"

type SongsListSearchProps = {
  renderRight?: ReactNode
}

const SongsListSearch = ({ renderRight }: SongsListSearchProps) => {
  const { searchTerm, setSearchTerm } = useSongsStore(
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

export { SongsListSearch }
