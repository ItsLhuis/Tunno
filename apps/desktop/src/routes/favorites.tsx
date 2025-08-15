import { createFileRoute } from "@tanstack/react-router"

import { Favorites } from "@app/pages"

export const Route = createFileRoute("/favorites")({
  component: Favorites
})
