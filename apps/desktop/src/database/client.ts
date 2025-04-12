import { drizzle } from "./driver"

import * as schema from "./schema"

import { type InferQueryModel } from "./helpers"

const databaseName = "database.db"

const database = drizzle(databaseName, { schema })

export { database, databaseName, schema, type InferQueryModel }
