import { createFileRoute } from "@tanstack/react-router"

import z from "zod"

import { Playlists } from "@app/pages"

export const Route = createFileRoute("/playlists/")({
  component: Playlists,
  validateSearch: z.object({
    create: z.boolean().optional()
  })
})
