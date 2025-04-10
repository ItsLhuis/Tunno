import { schema } from "@database/client"

const { songs } = schema

export type Song = typeof songs.$inferSelect

export type CreateSong = typeof songs.$inferInsert
export type UpdateSong = typeof songs.$inferInsert
