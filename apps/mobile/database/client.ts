import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"

import * as schema from "./schema"
export { schema }

import { type InferQueryModel } from "./helpers"
export { InferQueryModel }

export const databaseName = "database.db"

const expoDatabase = openDatabaseSync(databaseName, { enableChangeListener: true })
export const database = drizzle(expoDatabase, { schema })
