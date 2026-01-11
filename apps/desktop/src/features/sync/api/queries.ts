import { asc } from "drizzle-orm"

import { database, schema } from "@database/client"

import { type Album } from "@repo/api"

/**
 * Defines the specific data structure for a song when it is prepared for export.
 *
 * This type includes not just the song's direct properties but also detailed, nested
 * information about its associated album and artists, ensuring that all necessary
 * metadata is available for the synchronization or export process.
 */
export type SongForExport = {
  /**
   * The unique identifier of the song.
   */
  id: number
  /**
   * The name or title of the song.
   */
  name: string
  /**
   * The filename of the song's thumbnail image, if available.
   */
  thumbnail: string | null
  /**
   * The filename of the song's audio file.
   */
  file: string
  /**
   * The duration of the song in seconds.
   */
  duration: number
  /**
   * The release year of the song, if available.
   */
  releaseYear: number | null
  /**
   * The lyrics of the song, structured as an array of objects with text and start time, if available.
   */
  lyrics: { text: string; startTime: number }[] | null
  /**
   * The album information associated with the song, if available.
   */
  album: {
    /**
     * The unique identifier of the album.
     */
    id: number
    /**
     * The name of the album.
     */
    name: string
    /**
     * The filename of the album's thumbnail image, if available.
     */
    thumbnail: string | null
    /**
     * The release year of the album, if available.
     */
    releaseYear: number | null
    /**
     * The type of the album (e.g., "album", "single", "compilation").
     */
    albumType: Album["albumType"]
    /**
     * The artists associated with the album, including their details.
     */
    artists: {
      /**
       * The detailed artist object.
       */
      artist: {
        /**
         * The unique identifier of the artist.
         */
        id: number
        /**
         * The name of the artist.
         */
        name: string
        /**
         * The filename of the artist's thumbnail image, if available.
         */
        thumbnail: string | null
      }
    }[]
  } | null
  /**
   * The artists associated with the song, including their details.
   */
  artists: {
    /**
     * The detailed artist object.
     */
    artist: {
      /**
       * The unique identifier of the artist.
       */
      id: number
      /**
       * The name of the artist.
       */
      name: string
      /**
       * The filename of the artist's thumbnail image, if available.
       */
      thumbnail: string | null
    }
  }[]
}

/**
 * Retrieves all songs from the database with their full relational data,
 * formatted specifically for export or synchronization.
 *
 * This function fetches every song and joins it with its album and artist data,
 * ordering the artists correctly. It constructs a comprehensive object for each song
 * that is suitable for serialization and use in external systems or backups.
 *
 * @returns A Promise that resolves to an array of `SongForExport` objects.
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
