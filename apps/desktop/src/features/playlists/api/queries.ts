import { database, schema } from "@database/client"

import { eq } from "drizzle-orm"

import { type Playlist } from "@repo/api"

export const getPlaylistById = async (id: number): Promise<Playlist | null> => {
  const playlist = await database.query.playlists.findFirst({
    where: eq(schema.playlists.id, id)
  })

  return playlist || null
}
