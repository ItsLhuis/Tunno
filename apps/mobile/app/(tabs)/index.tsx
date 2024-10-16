import { useState } from "react"

import { AppBar } from "@components/ui"

export default function Songs() {
  const [search, setSearch] = useState<string>("")

  return (
    <>
      <AppBar title="Songs" searchValue={search} onSearchChange={(text) => setSearch(text)} />
    </>
  )
}
