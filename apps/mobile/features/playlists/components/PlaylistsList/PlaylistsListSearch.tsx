import { useCallback, type ReactNode } from "react"

import { useShallow } from "zustand/shallow"

import { usePlaylistsStore } from "../../stores/usePlaylistsStore"

import { SearchInput } from "@components/ui"

type PlaylistsListSearchProps = {
  renderRight?: ReactNode
}

const PlaylistsListSearch = ({ renderRight }: PlaylistsListSearchProps) => {
  const { searchTerm, setSearchTerm } = usePlaylistsStore(
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

export { PlaylistsListSearch }
