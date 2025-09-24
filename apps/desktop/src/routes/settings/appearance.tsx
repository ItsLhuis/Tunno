import { createFileRoute } from "@tanstack/react-router"

import { Appearance } from "@features/settings/pages"

export const Route = createFileRoute("/settings/appearance")({
  component: Appearance
})
