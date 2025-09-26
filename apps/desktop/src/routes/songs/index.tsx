import { createFileRoute } from "@tanstack/react-router"

import { Songs } from "@app/pages"

export const Route = createFileRoute("/songs/")({
  component: Songs
})
