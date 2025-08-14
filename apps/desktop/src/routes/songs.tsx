import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/songs")({
  component: Songs
})

import { SongsList } from "@features/songs/components/SongsList/SongsList"

function Songs() {
  return <SongsList />
}
