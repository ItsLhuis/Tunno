import { database, schema } from "@database/client"

import { and, asc, eq } from "drizzle-orm"

import { type SidebarEntityType, type SidebarItemWithDetails } from "@repo/api"

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
