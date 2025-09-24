import { createFileRoute } from "@tanstack/react-router"

import { Language } from "@features/settings/pages"

export const Route = createFileRoute("/settings/language")({
  component: Language
})
