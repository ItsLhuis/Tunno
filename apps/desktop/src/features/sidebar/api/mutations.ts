import { database, schema } from "@database/client"

import { and, eq } from "drizzle-orm"

import { isInSidebar } from "./queries"

import { type SidebarEntityType, type SidebarItem } from "@repo/api"

/**
 * Inserts a new item into the sidebar.
 *
 * This function adds a new entity (like a playlist or artist) to the sidebar,
 * making it visible for quick access.
 *
 * @param entityType - The type of the entity to add (e.g., "playlist", "album", "artist").
 * @param entityId - The unique identifier of the entity to add.
 * @returns A Promise that resolves to the newly created `SidebarItem` object.
 */
export async function insertToSidebar(
  entityType: SidebarEntityType,
  entityId: number
): Promise<SidebarItem> {
  const [item] = await database.insert(schema.sidebar).values({ entityType, entityId }).returning()

  return item
}

/**
 * Deletes an item from the sidebar.
 *
 * This function removes an entity from the sidebar based on its type and ID.
 *
 * @param entityType - The type of the entity to remove.
 * @param entityId - The unique identifier of the entity to remove.
 * @returns A Promise that resolves to the deleted `SidebarItem` object, or `null` if the item was not found.
 */
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

/**
 * Toggles an item's presence in the sidebar.
 *
 * If the item already exists in the sidebar, it is removed. If it does not exist, it is added.
 *
 * @param entityType - The type of the entity to toggle.
 * @param entityId - The unique identifier of the entity to toggle.
 * @returns A Promise that resolves to `true` if the item was added, and `false` if it was removed.
 */
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
