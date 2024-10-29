import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite"

const expo = openDatabaseSync("database.db")
export const database = drizzle(expo)
