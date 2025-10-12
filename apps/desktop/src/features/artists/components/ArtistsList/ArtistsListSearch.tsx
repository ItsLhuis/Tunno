import { type ReactNode, useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { cn } from "@lib/utils"

import { SearchInput } from "@components/ui"

type ArtistsListSearchProps = {
  renderRight?: ReactNode
  className?: string
}

const ArtistsListSearch = ({ renderRight, className }: ArtistsListSearchProps) => {
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
      containerClassName={cn("p-9 pb-0 pt-6", className)}
      value={searchTerm}
      onChange={handleInputChange}
      className="flex-1"
      renderRight={renderRight}
    />
  )
}

export { ArtistsListSearch }
