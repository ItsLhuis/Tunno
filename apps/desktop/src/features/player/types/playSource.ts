import { schema } from "@repo/database"

export type PlaySource = (typeof schema.playHistory.$inferInsert)["playSource"]
