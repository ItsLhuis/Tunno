import { createFileRoute } from "@tanstack/react-router"

import { Playlists } from "@app/pages"

export const Route = createFileRoute("/playlists/")({
  component: Playlists
})
