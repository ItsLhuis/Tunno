import { useCallback } from "react"

import { database, schema } from "@database/client"

import { and, eq, isNull } from "drizzle-orm"

import { join } from "@tauri-apps/api/path"
import { exists, readTextFile } from "@tauri-apps/plugin-fs"

import { insertAlbum } from "@features/albums/api/mutations"
import { insertSong } from "@features/songs/api/mutations"

import {
  isTransientError,
  isUniqueConstraintError,
  retryWithBackoff,
  processArtist,
  updateAlbumThumbnailIfNeeded,
  compareAndGetSongUpdates,
  type LocalArtistCache
} from "../utils"

import { saveFileWithUniqueNameFromPath } from "@services/storage"

import { type EntityCache } from "../utils"

import type { CLISong, ProcessingTrack, ProcessResult } from "../types"

export function useTrackProcessor() {
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

        const localArtistCache: LocalArtistCache = new Map()
        let thumbnailsUpdated = false

        const songArtistIds: number[] = []

        for (const artistMeta of metadata.artists) {
          const result = await processArtist(
            artistMeta,
            cachePath,
            track.dirName,
            entityCache,
            localArtistCache
          )

          songArtistIds.push(result.artistId)

          if (result.thumbnailUpdated) {
            thumbnailsUpdated = true
          }
        }

        const albumMeta = metadata.album
        let albumId: number | null = null

        const cachedAlbum = entityCache?.getAlbum(albumMeta.name, albumMeta.albumType)

        if (cachedAlbum) {
          albumId = cachedAlbum.id

          for (const [index, artistMeta] of albumMeta.artists.entries()) {
            const result = await processArtist(
              artistMeta,
              cachePath,
              track.dirName,
              entityCache,
              localArtistCache
            )

            if (result.thumbnailUpdated) {
              thumbnailsUpdated = true
            }

            const hasAssociation = cachedAlbum.artistIds.includes(result.artistId)

            if (!hasAssociation) {
              await database
                .insert(schema.albumsToArtists)
                .values({
                  albumId: cachedAlbum.id,
                  artistId: result.artistId,
                  artistOrder: index
                })
                .onConflictDoNothing({
                  target: [schema.albumsToArtists.albumId, schema.albumsToArtists.artistId]
                })

              if (entityCache) {
                entityCache.updateAlbumArtists(cachedAlbum.id, [
                  ...cachedAlbum.artistIds,
                  result.artistId
                ])
              }
            }
          }

          const albumThumbnailUpdated = await updateAlbumThumbnailIfNeeded(
            cachedAlbum.id,
            albumMeta.name,
            albumMeta.albumType,
            albumMeta,
            cachePath,
            track.dirName,
            entityCache
          )

          if (albumThumbnailUpdated) {
            thumbnailsUpdated = true
          }
        } else {
          const existingAlbumResult = await database
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

          const existingAlbum = existingAlbumResult[0]

          if (existingAlbum) {
            albumId = existingAlbum.id

            const albumArtistLinks = await database
              .select({
                artistId: schema.albumsToArtists.artistId,
                artistOrder: schema.albumsToArtists.artistOrder
              })
              .from(schema.albumsToArtists)
              .where(eq(schema.albumsToArtists.albumId, existingAlbum.id))

            const existingArtistIds = albumArtistLinks.map((link) => link.artistId)

            if (entityCache) {
              entityCache.addAlbum(
                albumMeta.name,
                albumMeta.albumType,
                existingAlbum.id,
                existingArtistIds,
                existingAlbum.thumbnail
              )
            }

            for (const [index, artistMeta] of albumMeta.artists.entries()) {
              const result = await processArtist(
                artistMeta,
                cachePath,
                track.dirName,
                entityCache,
                localArtistCache
              )

              if (result.thumbnailUpdated) {
                thumbnailsUpdated = true
              }

              const hasAssociation = existingArtistIds.includes(result.artistId)

              if (!hasAssociation) {
                await database
                  .insert(schema.albumsToArtists)
                  .values({
                    albumId: existingAlbum.id,
                    artistId: result.artistId,
                    artistOrder: index
                  })
                  .onConflictDoNothing({
                    target: [schema.albumsToArtists.albumId, schema.albumsToArtists.artistId]
                  })

                if (entityCache) {
                  entityCache.updateAlbumArtists(existingAlbum.id, [
                    ...existingArtistIds,
                    result.artistId
                  ])
                }
              }
            }

            const albumThumbnailUpdated = await updateAlbumThumbnailIfNeeded(
              existingAlbum.id,
              albumMeta.name,
              albumMeta.albumType,
              albumMeta,
              cachePath,
              track.dirName,
              entityCache
            )

            if (albumThumbnailUpdated) {
              thumbnailsUpdated = true
            }
          } else {
            const albumArtistIds: number[] = []

            for (const artistMeta of albumMeta.artists) {
              const result = await processArtist(
                artistMeta,
                cachePath,
                track.dirName,
                entityCache,
                localArtistCache
              )

              albumArtistIds.push(result.artistId)

              if (result.thumbnailUpdated) {
                thumbnailsUpdated = true
              }
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
                entityCache.addAlbum(
                  albumMeta.name,
                  albumMeta.albumType,
                  newAlbum.id,
                  albumArtistIds,
                  newAlbum.thumbnail
                )
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

                  if (entityCache) {
                    const albumArtistLinks = await database
                      .select({ artistId: schema.albumsToArtists.artistId })
                      .from(schema.albumsToArtists)
                      .where(eq(schema.albumsToArtists.albumId, retryAlbum.id))

                    entityCache.addAlbum(
                      albumMeta.name,
                      albumMeta.albumType,
                      retryAlbum.id,
                      albumArtistLinks.map((link) => link.artistId),
                      retryAlbum.thumbnail
                    )
                  }
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
            const { needsUpdate, updates } = compareAndGetSongUpdates(duplicateCheck, metadata)

            if (needsUpdate) {
              await database
                .update(schema.songs)
                .set(updates)
                .where(eq(schema.songs.id, duplicateCheck.id))
            }

            if (thumbnailsUpdated || needsUpdate) {
              return {
                success: true,
                skipped: false,
                songId: duplicateCheck.id,
                thumbnailsUpdated
              }
            }

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
          songId: createdSong.id,
          thumbnailsUpdated
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
