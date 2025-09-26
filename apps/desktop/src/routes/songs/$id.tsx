import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@components/ui"

import { Song } from "@app/pages"

export const Route = createFileRoute("/songs/$id")({
  component: Song,
  notFoundComponent: () => <NotFound />
})
