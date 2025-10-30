import { createFileRoute } from "@tanstack/react-router"

import { NotFound } from "@components/ui"

import { Lyrics } from "@app/pages"

export const Route = createFileRoute("/lyrics")({
  component: Lyrics,
  notFoundComponent: () => <NotFound />
})
