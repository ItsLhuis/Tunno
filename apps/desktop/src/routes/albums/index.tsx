import { createFileRoute } from "@tanstack/react-router"

import z from "zod"

import { Albums } from "@app/pages"

export const Route = createFileRoute("/albums/")({
  component: Albums,
  validateSearch: z.object({
    create: z.boolean().optional()
  })
})
