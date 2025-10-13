import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@components/ui"

import { Album } from "@app/pages"

export const Route = createFileRoute("/albums/$id")({
  component: Album,
  notFoundComponent: () => <NotFound />
})
