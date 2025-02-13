import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"

import * as schema from "./schema"

export const databaseName = "wave.db"

const expoDatabase = openDatabaseSync(databaseName, { enableChangeListener: true })
export const database = drizzle(expoDatabase, { schema })
