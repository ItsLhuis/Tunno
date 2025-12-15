import { type ChangeEvent, type ReactNode, useCallback } from "react"

import { useShallow } from "zustand/shallow"

import { useSongsStore } from "../../stores/useSongsStore"

import { cn } from "@lib/utils"

import { SearchInput } from "@components/ui"

type SongsListSearchProps = {
  renderRight?: ReactNode
  className?: string
}

const SongsListSearch = ({ renderRight, className }: SongsListSearchProps) => {
  const { searchTerm, setSearchTerm } = useSongsStore(
    useShallow((state) => ({
      searchTerm: state.searchTerm,
      setSearchTerm: state.setSearchTerm
    }))
  )

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

export { SongsListSearch }
