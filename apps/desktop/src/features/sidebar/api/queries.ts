import { database, schema } from "@database/client"

import { and, asc, eq } from "drizzle-orm"

import { type SidebarEntityType, type SidebarItemWithDetails } from "@repo/api"

/**
 * Retrieves all items pinned to the sidebar, enriched with their details.
 *
 * This function fetches the base sidebar items and then, for each item,
 * queries the corresponding table (albums, artists, or playlists) to retrieve
 * its name and thumbnail. This provides a complete object for rendering in the UI.
 *
 * @returns A Promise that resolves to an array of `SidebarItemWithDetails`,
 *          where each item includes details from its original entity.
 */
export async function getSidebarItems(): Promise<SidebarItemWithDetails[]> {
  const items = await database.query.sidebar.findMany({
    orderBy: [asc(schema.sidebar.createdAt)]
  })

  const itemsWithDetails: SidebarItemWithDetails[] = []

  for (const item of items) {
    let name: string | null = null
    let thumbnail: string | null = null

    if (item.entityType === "album") {
      const album = await database.query.albums.findFirst({
        where: eq(schema.albums.id, item.entityId),
        columns: { name: true, thumbnail: true }
      })

      name = album?.name ?? null
      thumbnail = album?.thumbnail ?? null
    } else if (item.entityType === "artist") {
      const artist = await database.query.artists.findFirst({
        where: eq(schema.artists.id, item.entityId),
        columns: { name: true, thumbnail: true }
      })

      name = artist?.name ?? null
      thumbnail = artist?.thumbnail ?? null
    } else if (item.entityType === "playlist") {
      const playlist = await database.query.playlists.findFirst({
        where: eq(schema.playlists.id, item.entityId),
        columns: { name: true, thumbnail: true }
      })

      name = playlist?.name ?? null
      thumbnail = playlist?.thumbnail ?? null
    }

    if (name) {
      itemsWithDetails.push({
        id: item.id,
        entityType: item.entityType,
        entityId: item.entityId,
        position: item.position,
        createdAt: item.createdAt,
        name,
        thumbnail
      })
    }
  }

  return itemsWithDetails
}

/**
 * Checks if a specific entity is currently in the sidebar.
 *
 * @param entityType - The type of the entity (e.g., "playlist", "album").
 * @param entityId - The unique identifier of the entity.
 * @returns A Promise that resolves to `true` if the item is in the sidebar, `false` otherwise.
 */
export async function isInSidebar(
  entityType: SidebarEntityType,
  entityId: number
): Promise<boolean> {
  return (
    (
      await database
        .select({ id: schema.sidebar.id })
        .from(schema.sidebar)
        .where(
          and(eq(schema.sidebar.entityType, entityType), eq(schema.sidebar.entityId, entityId))
        )
        .limit(1)
    ).length > 0
  )
}
