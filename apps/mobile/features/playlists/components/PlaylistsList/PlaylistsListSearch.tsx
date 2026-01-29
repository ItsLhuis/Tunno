import { useCallback, type ReactNode } from "react"

import { usePlaylistsStore } from "../../stores/usePlaylistsStore"

import { SearchInput } from "@components/ui"

type PlaylistsListSearchProps = {
  renderRight?: ReactNode
}

const PlaylistsListSearch = ({ renderRight }: PlaylistsListSearchProps) => {
  const searchTerm = usePlaylistsStore((state) => state.searchTerm)
  const setSearchTerm = usePlaylistsStore((state) => state.setSearchTerm)

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
