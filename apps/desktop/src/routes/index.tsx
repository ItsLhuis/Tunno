import { createFileRoute } from "@tanstack/react-router"

import { Home } from "@app/pages"

export const Route = createFileRoute("/")({
  component: Home
})
