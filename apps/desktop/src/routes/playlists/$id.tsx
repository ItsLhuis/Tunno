import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@components/ui"

import { Playlist } from "@app/pages"

export const Route = createFileRoute("/playlists/$id")({
  component: Playlist,
  notFoundComponent: () => <NotFound />
})
