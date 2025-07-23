import { type ReactNode } from "react"

import { i18n } from "@repo/i18n"

import { createInsertSongSchema } from "@repo/schemas"

const formSchema = createInsertSongSchema(i18n.t)

export type AlbumFormType = {
  trigger: ReactNode
}

const AlbumForm = ({ trigger }: AlbumFormType) => {
  return <p>AlbumForm</p>
}

export { AlbumForm }
