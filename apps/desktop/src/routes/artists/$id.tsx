import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@components/ui"

import { Artist } from "@app/pages"

export const Route = createFileRoute("/artists/$id")({
  component: Artist,
  notFoundComponent: () => <NotFound />
})
