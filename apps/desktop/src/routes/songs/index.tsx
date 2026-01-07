import { createFileRoute } from "@tanstack/react-router"

import z from "zod"

import { Songs } from "@app/pages"

export const Route = createFileRoute("/songs/")({
  component: Songs,
  validateSearch: z.object({
    create: z.boolean().optional()
  })
})
