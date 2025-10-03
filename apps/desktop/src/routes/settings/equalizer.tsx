import { createFileRoute } from "@tanstack/react-router"

import { Equalizer } from "@features/settings/pages"

export const Route = createFileRoute("/settings/equalizer")({
  component: Equalizer
})
