import Database from "@tauri-apps/plugin-sql"
import { drizzle } from "./driver"

import * as schema from "./schema"

import { type InferQueryModel } from "./helpers"

const databaseName = "database.db"

const getSQLiteDatabase = async () => await Database.load(`sqlite:${databaseName}`)

const database = drizzle(databaseName, { schema })

export { database, databaseName, getSQLiteDatabase, schema, type InferQueryModel }
