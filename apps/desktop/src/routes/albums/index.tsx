import { createFileRoute } from "@tanstack/react-router"

import { Albums } from "@app/pages"

export const Route = createFileRoute("/albums/")({
  component: Albums
})
