import { drizzle } from "./driver"

import { schema, type InferQueryModel } from "@repo/database"

const databaseName = "database.db"

const database = drizzle(databaseName, { schema })

export { database, databaseName, schema, type InferQueryModel }
