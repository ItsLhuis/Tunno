import { createFileRoute } from "@tanstack/react-router"

import { Artists } from "@app/pages"

export const Route = createFileRoute("/artists/")({
  component: Artists
})
