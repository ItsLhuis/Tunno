import { useCallback } from "react"

import { database, schema } from "@database/client"

import { and, eq, isNull } from "drizzle-orm"

import { join } from "@tauri-apps/api/path"
import { exists, readTextFile } from "@tauri-apps/plugin-fs"

import { insertAlbum } from "@features/albums/api/mutations"
import { insertArtist } from "@features/artists/api/mutations"
import { insertSong } from "@features/songs/api/mutations"

import { isTransientError, isUniqueConstraintError, retryWithBackoff } from "../utils"

import { saveFileWithUniqueNameFromPath } from "@services/storage"

import { type EntityCache } from "../utils"

import type { CLISong, ProcessingTrack, ProcessResult } from "../types"

export const useTrackProcessor = () => {
  const processTrack = useCallback(
    async (
      track: ProcessingTrack,
      cachePath: string,
      entityCache?: EntityCache
    ): Promise<ProcessResult> => {
      try {
        const metadataPath = await join(cachePath, "tracks", track.dirName, "metadata.json")
        const metadataJson = await readTextFile(metadataPath)
        const metadata: CLISong = JSON.parse(metadataJson)

        if (!metadata.title || !metadata.artists || !metadata.album || !metadata.song) {
          throw new Error("Invalid metadata structure - missing required fields")
        }

        const songArtistIds: number[] = []

        for (const artistMeta of metadata.artists) {
          let artistId: number | null = null

          if (entityCache) {
            const cachedId = entityCache.getArtist(artistMeta.name)
            if (cachedId) {
              artistId = cachedId
              songArtistIds.push(artistId)
              continue
            }
          }

          const existingArtistResult = await database
            .select()
            .from(schema.artists)
            .where(eq(schema.artists.name, artistMeta.name))
            .limit(1)

          const existingArtist = existingArtistResult[0]

          if (existingArtist) {
            artistId = existingArtist.id

            if (entityCache) {
              entityCache.addArtist(artistMeta.name, artistId)
            }
          } else {
            try {
              let artistThumbnailPath: string | null = null

              if (artistMeta.thumbnail) {
                const thumbnailSourcePath = await join(
                  cachePath,
                  "tracks",
                  track.dirName,
                  artistMeta.thumbnail
                )

                if (await exists(thumbnailSourcePath)) {
                  artistThumbnailPath = thumbnailSourcePath
                }
              }

              const newArtist = await retryWithBackoff(
                async () =>
                  insertArtist(
                    {
                      name: artistMeta.name,
                      isFavorite: false
                    },
                    artistThumbnailPath
                  ),
                {
                  maxAttempts: 5,
                  initialDelay: 500,
                  shouldRetry: (error) => {
                    return isTransientError(error) && !isUniqueConstraintError(error)
                  }
                }
              )

              artistId = newArtist.id

              if (entityCache) {
                entityCache.addArtist(artistMeta.name, artistId)
              }
            } catch (error) {
              if (isUniqueConstraintError(error)) {
                const retryArtistResult = await database
                  .select()
                  .from(schema.artists)
                  .where(eq(schema.artists.name, artistMeta.name))
                  .limit(1)

                const retryArtist = retryArtistResult[0]

                if (retryArtist) {
                  artistId = retryArtist.id

                  if (entityCache) {
                    entityCache.addArtist(artistMeta.name, artistId)
                  }
                } else {
                  throw new Error(
                    `Artist creation failed with unique constraint but re-query returned nothing for ${artistMeta.name}`
                  )
                }
              } else {
                throw error
              }
            }
          }

          if (artistId) {
            songArtistIds.push(artistId)
          }
        }

        const albumMeta = metadata.album
        let albumId: number | null = null

        let cachedAlbum: ReturnType<EntityCache["getAlbum"]> | undefined
        if (entityCache) {
          cachedAlbum = entityCache.getAlbum(albumMeta.name, albumMeta.albumType)
        }

        const existingAlbumResult = cachedAlbum
          ? [{ id: cachedAlbum.id, name: cachedAlbum.name, albumType: cachedAlbum.albumType }]
          : await database
              .select()
              .from(schema.albums)
              .where(
                and(
                  eq(schema.albums.name, albumMeta.name),
                  eq(
                    schema.albums.albumType,
                    albumMeta.albumType as "single" | "album" | "compilation"
                  )
                )
              )
              .limit(1)

        let existingAlbum:
          | ((typeof existingAlbumResult)[0] & {
              artists: Array<{ artistId: number; artist: { id: number; name: string } }>
            })
          | undefined

        if (existingAlbumResult[0]) {
          const albumArtistLinks = await database
            .select({
              artistId: schema.albumsToArtists.artistId,
              artistOrder: schema.albumsToArtists.artistOrder
            })
            .from(schema.albumsToArtists)
            .where(eq(schema.albumsToArtists.albumId, existingAlbumResult[0].id))

          const artistIds = albumArtistLinks.map((link) => link.artistId)
          const artists =
            artistIds.length > 0
              ? await database
                  .select()
                  .from(schema.artists)
                  .where(eq(schema.artists.id, artistIds[0]))
              : []

          existingAlbum = {
            ...existingAlbumResult[0],
            artists: albumArtistLinks.map((link, index) => ({
              artistId: link.artistId,
              artist: artists[index] || { id: link.artistId, name: "" }
            }))
          }
        }

        if (existingAlbum) {
          albumId = existingAlbum.id

          for (const [index, artistMeta] of albumMeta.artists.entries()) {
            const existingArtistResult = await database
              .select()
              .from(schema.artists)
              .where(eq(schema.artists.name, artistMeta.name))
              .limit(1)

            const existingArtist = existingArtistResult[0]

            let artistId: number

            if (existingArtist) {
              artistId = existingArtist.id
            } else {
              try {
                let artistThumbnailPath: string | null = null

                if (artistMeta.thumbnail) {
                  const thumbnailSourcePath = await join(
                    cachePath,
                    "tracks",
                    track.dirName,
                    artistMeta.thumbnail
                  )

                  if (await exists(thumbnailSourcePath)) {
                    artistThumbnailPath = thumbnailSourcePath
                  }
                }

                const newArtist = await insertArtist(
                  {
                    name: artistMeta.name,
                    isFavorite: false
                  },
                  artistThumbnailPath
                )
                artistId = newArtist.id
              } catch (error) {
                if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
                  const retryArtistResult = await database
                    .select()
                    .from(schema.artists)
                    .where(eq(schema.artists.name, artistMeta.name))
                    .limit(1)

                  const retryArtist = retryArtistResult[0]
                  if (!retryArtist) {
                    throw new Error(`Failed to create/find album artist ${artistMeta.name}`)
                  }
                  artistId = retryArtist.id
                } else {
                  throw error
                }
              }
            }

            const hasAssociation = existingAlbum.artists.some((link) => link.artistId === artistId)

            if (!hasAssociation) {
              await database.insert(schema.albumsToArtists).values({
                albumId: existingAlbum.id,
                artistId,
                artistOrder: index
              })
            }
          }
        } else {
          const albumArtistIds: number[] = []

          for (const artistMeta of albumMeta.artists) {
            const existingArtistResult = await database
              .select()
              .from(schema.artists)
              .where(eq(schema.artists.name, artistMeta.name))
              .limit(1)

            const existingArtist = existingArtistResult[0]

            let artistId: number

            if (existingArtist) {
              artistId = existingArtist.id
            } else {
              try {
                let artistThumbnailPath: string | null = null

                if (artistMeta.thumbnail) {
                  const thumbnailSourcePath = await join(
                    cachePath,
                    "tracks",
                    track.dirName,
                    artistMeta.thumbnail
                  )

                  if (await exists(thumbnailSourcePath)) {
                    artistThumbnailPath = thumbnailSourcePath
                  }
                }

                const newArtist = await insertArtist(
                  {
                    name: artistMeta.name,
                    isFavorite: false
                  },
                  artistThumbnailPath
                )

                artistId = newArtist.id
              } catch (error) {
                if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
                  const retryArtistResult = await database
                    .select()
                    .from(schema.artists)
                    .where(eq(schema.artists.name, artistMeta.name))
                    .limit(1)

                  const retryArtist = retryArtistResult[0]

                  if (!retryArtist) {
                    throw new Error(`Failed to create/find album artist ${artistMeta.name}`)
                  }

                  artistId = retryArtist.id
                } else {
                  throw error
                }
              }
            }

            albumArtistIds.push(artistId)
          }

          try {
            let albumThumbnailPath: string | null = null

            if (albumMeta.thumbnail) {
              const thumbnailSourcePath = await join(
                cachePath,
                "tracks",
                track.dirName,
                albumMeta.thumbnail
              )

              if (await exists(thumbnailSourcePath)) {
                albumThumbnailPath = thumbnailSourcePath
              }
            }

            const newAlbum = await retryWithBackoff(
              async () =>
                insertAlbum(
                  {
                    name: albumMeta.name,
                    albumType: albumMeta.albumType as "single" | "album" | "compilation",
                    releaseYear: albumMeta.releaseYear || null,
                    isFavorite: false
                  },
                  albumThumbnailPath,
                  albumArtistIds
                ),
              {
                maxAttempts: 5,
                initialDelay: 500,
                shouldRetry: (error) => {
                  return isTransientError(error) && !isUniqueConstraintError(error)
                }
              }
            )
            albumId = newAlbum.id

            if (entityCache) {
              entityCache.addAlbum(albumMeta.name, albumMeta.albumType, albumId, albumArtistIds)
            }
          } catch (error) {
            if (error instanceof Error && error.message.includes("UNIQUE constraint failed")) {
              const retryAlbumResult = await database
                .select()
                .from(schema.albums)
                .where(
                  and(
                    eq(schema.albums.name, albumMeta.name),
                    eq(
                      schema.albums.albumType,
                      albumMeta.albumType as "single" | "album" | "compilation"
                    )
                  )
                )
                .limit(1)

              const retryAlbum = retryAlbumResult[0]

              if (retryAlbum) {
                albumId = retryAlbum.id
              } else {
                throw new Error(
                  `Album creation failed with unique constraint but re-query returned nothing`
                )
              }
            } else {
              throw error
            }
          }
        }

        if (albumId) {
          const albumArtistLinks = await database
            .select({ artistId: schema.albumsToArtists.artistId })
            .from(schema.albumsToArtists)
            .where(eq(schema.albumsToArtists.albumId, albumId))

          if (!albumArtistLinks || !Array.isArray(albumArtistLinks)) {
            throw new Error("Failed to fetch album artist links")
          }

          const albumArtistIds = albumArtistLinks.map((link) => link.artistId)

          const hasSharedArtist = songArtistIds.some((id) => albumArtistIds.includes(id))

          if (!hasSharedArtist) {
            albumId = null
          }
        }

        const primaryArtistId = songArtistIds[0]

        const duplicateCheckResult = await database
          .select()
          .from(schema.songs)
          .where(
            and(
              eq(schema.songs.name, metadata.title),
              albumId !== null ? eq(schema.songs.albumId, albumId) : isNull(schema.songs.albumId)
            )
          )
          .limit(1)

        const duplicateCheck = duplicateCheckResult[0]

        if (duplicateCheck) {
          const primaryArtistLink = await database
            .select()
            .from(schema.songsToArtists)
            .where(
              and(
                eq(schema.songsToArtists.songId, duplicateCheck.id),
                eq(schema.songsToArtists.artistOrder, 0)
              )
            )
            .limit(1)

          if (primaryArtistLink[0]?.artistId === primaryArtistId) {
            return {
              success: false,
              skipped: true,
              reason: "Song already exists"
            }
          }
        }

        const audioFileName = metadata.song
        const audioSourcePath = await join(cachePath, "tracks", track.dirName, audioFileName)

        if (!(await exists(audioSourcePath))) {
          throw new Error(`Missing audio file: ${audioFileName}`)
        }

        await saveFileWithUniqueNameFromPath("songs", audioSourcePath)

        let thumbnailFinalPath: string | null = null

        if (metadata.thumbnail) {
          const thumbnailSourcePath = await join(
            cachePath,
            "tracks",
            track.dirName,
            metadata.thumbnail
          )

          if (await exists(thumbnailSourcePath)) {
            thumbnailFinalPath = thumbnailSourcePath
          }
        }

        const createdSong = await retryWithBackoff(
          async () =>
            insertSong(
              {
                name: metadata.title,
                duration: metadata.duration,
                releaseYear: albumMeta.releaseYear || null,
                albumId: albumId,
                lyrics: metadata.lyrics ?? [],
                isFavorite: false
              },
              songArtistIds,
              audioSourcePath,
              thumbnailFinalPath
            ),
          {
            maxAttempts: 5,
            initialDelay: 500,
            shouldRetry: (error) => isTransientError(error)
          }
        )

        return {
          success: true,
          skipped: false,
          songId: createdSong.id
        }
      } catch (error) {
        return {
          success: false,
          skipped: false,
          error: error instanceof Error ? error : new Error(String(error))
        }
      }
    },
    []
  )

  return { processTrack }
}
