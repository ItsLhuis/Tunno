import { createFileRoute } from "@tanstack/react-router"

import { Sync } from "@features/settings/pages"

export const Route = createFileRoute("/settings/sync")({
  component: Sync
})
