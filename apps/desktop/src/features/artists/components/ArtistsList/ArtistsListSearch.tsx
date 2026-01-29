import { type ChangeEvent, type ReactNode, useCallback } from "react"

import { useArtistsStore } from "../../stores/useArtistsStore"

import { cn } from "@lib/utils"

import { SearchInput } from "@components/ui"

type ArtistsListSearchProps = {
  renderRight?: ReactNode
  className?: string
}

const ArtistsListSearch = ({ renderRight, className }: ArtistsListSearchProps) => {
  const searchTerm = useArtistsStore((state) => state.searchTerm)
  const setSearchTerm = useArtistsStore((state) => state.setSearchTerm)

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
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
