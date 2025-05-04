import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"

import { type InferQueryModel } from "./helpers"
import * as schema from "./schema"

const databaseName = "database.db"

const expoDatabase = openDatabaseSync(databaseName, { enableChangeListener: true })
const database = drizzle(expoDatabase, { schema })

export { database, databaseName, schema, type InferQueryModel }
