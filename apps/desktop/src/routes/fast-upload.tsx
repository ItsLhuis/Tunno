import { createFileRoute } from "@tanstack/react-router"

import { FastUpload } from "@app/pages"

export const Route = createFileRoute("/fast-upload")({
  component: FastUpload
})
