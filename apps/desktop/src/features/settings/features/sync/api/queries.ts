import { asc } from "drizzle-orm"

import { database, schema } from "@database/client"

import { type Album } from "@repo/api"

/**
 * Defines the data structure for a song prepared for export, including
 * nested album and artist metadata for synchronization.
 */
export type SongForExport = {
  id: number
  name: string
  thumbnail: string | null
  file: string
  duration: number
  releaseYear: number | null
  lyrics: { text: string; startTime: number }[] | null
  album: {
    id: number
    name: string
    thumbnail: string | null
    releaseYear: number | null
    albumType: Album["albumType"]
    artists: {
      artist: {
        id: number
        name: string
        thumbnail: string | null
      }
    }[]
  } | null
  artists: {
    artist: {
      id: number
      name: string
      thumbnail: string | null
    }
  }[]
}

/**
 * Retrieves all songs from the database with their full relational data,
 * formatted specifically for export or synchronization.
 *
 * @returns A Promise that resolves to an array of {@link SongForExport} objects.
 */
export async function getAllSongsForExport(): Promise<SongForExport[]> {
  const songs = await database.query.songs.findMany({
    columns: {
      id: true,
      name: true,
      thumbnail: true,
      file: true,
      duration: true,
      releaseYear: true,
      lyrics: true
    },
    with: {
      album: {
        columns: {
          id: true,
          name: true,
          thumbnail: true,
          releaseYear: true,
          albumType: true
        },
        with: {
          artists: {
            with: {
              artist: {
                columns: {
                  id: true,
                  name: true,
                  thumbnail: true
                }
              }
            },
            orderBy: asc(schema.albumsToArtists.artistOrder)
          }
        }
      },
      artists: {
        with: {
          artist: {
            columns: {
              id: true,
              name: true,
              thumbnail: true
            }
          }
        },
        orderBy: asc(schema.songsToArtists.artistOrder)
      }
    }
  })

  return songs
}
