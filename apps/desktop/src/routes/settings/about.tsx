import { createFileRoute } from "@tanstack/react-router"

import { About } from "@features/settings/pages"

export const Route = createFileRoute("/settings/about")({
  component: About
})
