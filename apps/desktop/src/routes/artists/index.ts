import { createFileRoute } from "@tanstack/react-router"

import z from "zod"

import { Artists } from "@app/pages"

export const Route = createFileRoute("/artists/")({
  component: Artists,
  validateSearch: z.object({
    create: z.boolean().optional()
  })
})
