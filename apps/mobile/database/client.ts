import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"

import { schema, type InferQueryModel } from "@repo/database"

const databaseName = "database.db"

const expoDatabase = openDatabaseSync(databaseName, { enableChangeListener: true })
expoDatabase.execSync("PRAGMA foreign_keys = ON;")
expoDatabase.execSync("PRAGMA journal_mode = WAL")
expoDatabase.execSync("PRAGMA synchronous = NORMAL")
expoDatabase.execSync("PRAGMA temp_store = MEMORY")

const database = drizzle(expoDatabase, { schema })

export { database, databaseName, expoDatabase, schema, type InferQueryModel }
