import { database, schema } from "@database/client"

import { and, eq } from "drizzle-orm"

import { isInSidebar } from "./queries"

import { type SidebarEntityType, type SidebarItem } from "@repo/api"

export async function insertToSidebar(
  entityType: SidebarEntityType,
  entityId: number
): Promise<SidebarItem> {
  const [item] = await database.insert(schema.sidebar).values({ entityType, entityId }).returning()

  return item
}

export async function deleteFromSidebar(
  entityType: SidebarEntityType,
  entityId: number
): Promise<SidebarItem | null> {
  const [item] = await database
    .delete(schema.sidebar)
    .where(and(eq(schema.sidebar.entityType, entityType), eq(schema.sidebar.entityId, entityId)))
    .returning()

  return item || null
}

export async function toggleSidebar(
  entityType: SidebarEntityType,
  entityId: number
): Promise<boolean> {
  const exists = await isInSidebar(entityType, entityId)

  if (exists) {
    await deleteFromSidebar(entityType, entityId)
    return false
  }

  await insertToSidebar(entityType, entityId)
  return true
}
