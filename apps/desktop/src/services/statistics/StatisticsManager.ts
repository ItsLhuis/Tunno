import { eq, inArray, sql } from "drizzle-orm"

import { database } from "@database/client"
import { schema } from "@repo/database"

import { usePlayerStore } from "@features/player/stores/usePlayerStore"

const {
  playHistory,
  songs,
  albums,
  artists,
  playlists,
  songsToArtists,
  songStats,
  artistStats,
  albumStats,
  playlistStats
} = schema

import { type PlaySource } from "@features/player/types/playSource"

import { type PlaySession } from "./types"

/**
 * Manages the tracking and persistence of audio playback statistics.
 *
 * This class handles the lifecycle of a play session, recording details
 * such as when a song starts playing, pauses, and ends. It updates play counts
 * and total listening times for songs, albums, artists, and playlists in the database.
 *
 * PERFORMANCE OPTIMIZATIONS:
 * - All related database writes are wrapped in transactions to minimize disk syncs
 * - Song metadata (album, artists) is cached in the session to eliminate redundant queries
 * - Artist updates use batch operations with WHERE IN instead of loops
 * - Timestamps use SQLite's unixepoch() directly for consistency and efficiency
 */
export class StatisticsManager {
  private currentSession: PlaySession | null = null

  /**
   * Initiates a new play session for a given song.
   *
   * If a session for the same song is already paused, it will resume that session.
   * If a different song is currently playing, the existing session will be ended first.
   * A new play history entry is created in the database, and song metadata (album, artists)
   * is fetched and cached in the session to avoid redundant queries.
   *
   * @param songId - The ID of the song that is starting to play.
   * @param playSource - The source or context from which the song is being played (e.g., "album", "playlist").
   * @param sourceContextId - (Optional) The ID of the context (e.g., album ID, playlist ID) if applicable.
   */
  async startPlay(songId: number, playSource: PlaySource, sourceContextId?: number): Promise<void> {
    if (!songId || typeof songId !== "number") {
      console.warn("StatisticsManager: Invalid songId provided")
      return
    }

    if (
      this.currentSession &&
      this.currentSession.songId === songId &&
      this.currentSession.isPaused
    ) {
      this.resumePlay()
      return
    }

    if (this.currentSession && this.currentSession.songId !== songId) {
      await this.endPlay()
    }

    if (!this.currentSession || this.currentSession.songId !== songId) {
      try {
        // Fetch song metadata once and cache it in the session
        const songData = await this.getSongData(songId)
        if (!songData) {
          console.warn("StatisticsManager: Song data not found for songId:", songId)
          return
        }

        const [result] = await database
          .insert(playHistory)
          .values({
            songId,
            playSource,
            timeListened: 0
          })
          .returning({ id: playHistory.id })

        if (!result) {
          throw new Error("StatisticsManager: Failed to create play history entry")
        }

        this.currentSession = {
          songId,
          playSource,
          sourceContextId,
          startTime: Date.now(),
          playHistoryId: result.id,
          totalTimeListened: 0,
          isPaused: false,
          playCountRecorded: false,
          // Cache song metadata to avoid redundant queries
          cachedAlbumId: songData.albumId,
          cachedArtistIds: songData.artistIds
        }

        this.schedulePlayCountRecording()
      } catch (error) {
        console.error("StatisticsManager: Error starting play session:", error)
      }
    }
  }

  /**
   * Resumes a paused play session.
   *
   * This method updates the session's start time and resets the `isPaused` flag.
   * If the play count has not yet been recorded for this session, it either
   * records it immediately (if enough time has elapsed) or reschedules the recording.
   */
  private resumePlay(): void {
    if (this.currentSession && this.currentSession.isPaused) {
      const alreadyListened = this.currentSession.totalTimeListened
      this.currentSession.startTime = Date.now() - alreadyListened * 1000
      this.currentSession.isPaused = false

      if (!this.currentSession.playCountRecorded) {
        if (alreadyListened >= 3) {
          this.recordPlayCounts()
        } else {
          this.schedulePlayCountRecording()
        }
      }
    }
  }

  /**
   * Schedules the recording of play counts for the current session.
   *
   * This method sets a timeout to call `recordPlayCounts` after a certain duration
   * (e.g., 3 seconds of continuous playback) to ensure a song is counted as "played".
   * If a timer is already active, it is cleared before a new one is set.
   */
  private schedulePlayCountRecording(): void {
    if (!this.currentSession || this.currentSession.playCountRecorded) return

    if (this.currentSession.playCountTimer) {
      clearTimeout(this.currentSession.playCountTimer)
    }

    const elapsed = (Date.now() - this.currentSession.startTime) / 1000
    const remainingTime = Math.max(0, 3000 - elapsed * 1000)

    this.currentSession.playCountTimer = setTimeout(() => {
      this.recordPlayCounts()
    }, remainingTime)
  }

  /**
   * Updates the `totalTimeListened` for the current active play session.
   *
   * This method calculates the elapsed time since the session started (or resumed)
   * and stores it in `currentSession.totalTimeListened`.
   */
  updatePlayTime(): void {
    if (!this.currentSession || this.currentSession.isPaused) return

    const sessionDuration = (Date.now() - this.currentSession.startTime) / 1000
    this.currentSession.totalTimeListened = Math.round(sessionDuration)
  }

  /**
   * Records play counts for the current song and its associated entities (album, artists, playlists).
   *
   * This method is called once a song has been listened to for a minimum duration.
   * It increments play counters and updates `lastPlayedAt` timestamps in the database
   * for the song itself, its album, and associated artists/playlists based on the play source.
   *
   * OPTIMIZATION: All updates are wrapped in a single transaction to minimize disk syncs.
   */
  private async recordPlayCounts(): Promise<void> {
    if (!this.currentSession || this.currentSession.playCountRecorded) return

    try {
      this.currentSession.playCountRecorded = true

      if (this.currentSession.playCountTimer) {
        clearTimeout(this.currentSession.playCountTimer)
        this.currentSession.playCountTimer = undefined
      }

      // Use cached metadata instead of querying again
      const albumId = this.currentSession.cachedAlbumId ?? null
      const artistIds = this.currentSession.cachedArtistIds ?? []

      if (artistIds.length === 0) {
        console.warn("StatisticsManager: No artist data in session cache")
        return
      }

      await this.updatePlayCounts(
        this.currentSession.songId,
        albumId,
        artistIds,
        this.currentSession.playSource,
        this.currentSession.sourceContextId
      )
    } catch (error) {
      console.error("StatisticsManager: Error recording play counts:", error)
    }
  }

  /**
   * Pauses the current play session.
   *
   * This method updates the total time listened for the session, sets the `isPaused` flag to `true`,
   * and clears any pending play count recording timers.
   */
  pausePlay(): void {
    if (this.currentSession && !this.currentSession.isPaused) {
      this.updatePlayTime()
      this.currentSession.isPaused = true

      if (this.currentSession.playCountTimer) {
        clearTimeout(this.currentSession.playCountTimer)
        this.currentSession.playCountTimer = undefined
      }
    }
  }

  /**
   * Retrieves essential data for a song, including its album ID and associated artist IDs.
   *
   * @param songId - The ID of the song to retrieve data for.
   * @returns A Promise that resolves to an object containing the `albumId` and `artistIds`
   *          of the song, or `null` if the song is not found or an error occurs.
   */
  private async getSongData(
    songId: number
  ): Promise<{ albumId: number | null; artistIds: number[] } | null> {
    try {
      const songData = await database
        .select({
          songId: songs.id,
          albumId: songs.albumId,
          artistIds: songsToArtists.artistId
        })
        .from(songs)
        .leftJoin(songsToArtists, eq(songs.id, songsToArtists.songId))
        .where(eq(songs.id, songId))

      if (songData.length === 0) return null

      const song = songData[0]
      const artistIds = songData.map((s) => s.artistIds).filter(Boolean) as number[]

      return {
        albumId: song.albumId,
        artistIds
      }
    } catch (error) {
      console.error("StatisticsManager: Error getting song data:", error)
      return null
    }
  }

  /**
   * Ends the current play session and persists the total time listened to the database.
   *
   * This method updates the `timeListened` for the current `playHistory` entry.
   * It also updates general time-based statistics for the song, album, artists, and playlists.
   * The `currentSession` is reset to `null` after completion.
   */
  async endPlay(): Promise<void> {
    if (!this.currentSession) return

    this.updatePlayTime()

    const session = this.currentSession
    let timeListened = this.currentSession.totalTimeListened

    const { currentTrack } = usePlayerStore.getState()
    if (currentTrack && timeListened >= currentTrack.duration - 1) {
      timeListened = currentTrack.duration
    }

    if (session.playCountTimer) {
      clearTimeout(session.playCountTimer)
    }

    if (session.playHistoryId) {
      try {
        await database
          .update(playHistory)
          .set({ timeListened })
          .where(eq(playHistory.id, session.playHistoryId))
      } catch (error) {
        console.error("StatisticsManager: Error updating play history:", error)
      }
    }

    await this.updateTimeStats(
      session.songId,
      timeListened,
      session.playSource,
      session.sourceContextId,
      session.cachedAlbumId,
      session.cachedArtistIds
    )

    this.currentSession = null
  }

  /**
   * Increments the play count and updates the `lastPlayedAt` timestamp for a song
   * and its associated entities (album, artists, playlists).
   *
   * OPTIMIZATION: All updates are executed within a single transaction, and artist
   * updates use a batch operation with WHERE IN instead of looping.
   *
   * @param songId - The ID of the song.
   * @param albumId - The ID of the album the song belongs to, or `null`.
   * @param artistIds - An array of IDs of artists associated with the song.
   * @param playSource - The source from which the song was played.
   * @param sourceContextId - (Optional) The ID of the source context (e.g., specific artist or playlist ID).
   */
  private async updatePlayCounts(
    songId: number,
    albumId: number | null,
    artistIds: number[],
    playSource: PlaySource,
    sourceContextId?: number
  ): Promise<void> {
    try {
      await database.transaction(async (tx) => {
        // Update song
        await tx
          .update(songs)
          .set({
            playCount: sql`play_count + 1`,
            lastPlayedAt: sql`(unixepoch())`
          })
          .where(eq(songs.id, songId))

        // Update album if exists
        if (albumId) {
          await tx
            .update(albums)
            .set({
              playCount: sql`play_count + 1`,
              lastPlayedAt: sql`(unixepoch())`
            })
            .where(eq(albums.id, albumId))
        }

        // Update artists - batch operation instead of loop
        if (playSource === "artist" && sourceContextId) {
          await tx
            .update(artists)
            .set({
              playCount: sql`play_count + 1`,
              lastPlayedAt: sql`(unixepoch())`
            })
            .where(eq(artists.id, sourceContextId))
        } else if (artistIds.length > 0) {
          await tx
            .update(artists)
            .set({
              playCount: sql`play_count + 1`,
              lastPlayedAt: sql`(unixepoch())`
            })
            .where(inArray(artists.id, artistIds))
        }

        // Update playlist if applicable
        if (playSource === "playlist" && sourceContextId) {
          await tx
            .update(playlists)
            .set({
              playCount: sql`play_count + 1`,
              lastPlayedAt: sql`(unixepoch())`
            })
            .where(eq(playlists.id, sourceContextId))
        }
      })
    } catch (error) {
      console.error("StatisticsManager: Error updating play counts:", error)
    }
  }

  /**
   * Updates the total play time statistics for a song and its associated entities (album, artists, playlists).
   *
   * OPTIMIZATION: All upserts are executed within a single transaction, artist stats use
   * batch inserts, and timestamps use SQLite's unixepoch() for consistency.
   *
   * @param songId - The ID of the song.
   * @param timeListened - The duration in seconds that the song was listened to in the current session.
   * @param playSource - The source from which the song was played.
   * @param sourceContextId - (Optional) The ID of the source context (e.g., specific artist or playlist ID).
   * @param cachedAlbumId - The cached album ID from the session.
   * @param cachedArtistIds - The cached artist IDs from the session.
   */
  private async updateTimeStats(
    songId: number,
    timeListened: number,
    playSource: PlaySource,
    sourceContextId?: number,
    cachedAlbumId?: number | null,
    cachedArtistIds?: number[]
  ): Promise<void> {
    try {
      await database.transaction(async (tx) => {
        // Update song stats
        await tx
          .insert(songStats)
          .values({
            songId,
            totalPlayTime: timeListened,
            lastCalculatedAt: sql`(unixepoch())`
          })
          .onConflictDoUpdate({
            target: songStats.songId,
            set: {
              totalPlayTime: sql`${songStats.totalPlayTime} + ${timeListened}`,
              lastCalculatedAt: sql`(unixepoch())`
            }
          })

        // Update album stats if exists
        if (cachedAlbumId) {
          await tx
            .insert(albumStats)
            .values({
              albumId: cachedAlbumId,
              totalPlayTime: timeListened,
              lastCalculatedAt: sql`(unixepoch())`
            })
            .onConflictDoUpdate({
              target: albumStats.albumId,
              set: {
                totalPlayTime: sql`${albumStats.totalPlayTime} + ${timeListened}`,
                lastCalculatedAt: sql`(unixepoch())`
              }
            })
        }

        // Update artist stats - batch insert with conflict resolution
        if (playSource === "artist" && sourceContextId) {
          await tx
            .insert(artistStats)
            .values({
              artistId: sourceContextId,
              totalPlayTime: timeListened,
              lastCalculatedAt: sql`(unixepoch())`
            })
            .onConflictDoUpdate({
              target: artistStats.artistId,
              set: {
                totalPlayTime: sql`${artistStats.totalPlayTime} + ${timeListened}`,
                lastCalculatedAt: sql`(unixepoch())`
              }
            })
        } else if (cachedArtistIds && cachedArtistIds.length > 0) {
          // Batch insert for multiple artists
          const artistStatsValues = cachedArtistIds.map((artistId) => ({
            artistId,
            totalPlayTime: timeListened,
            lastCalculatedAt: sql`(unixepoch())`
          }))

          for (const artistValue of artistStatsValues) {
            await tx
              .insert(artistStats)
              .values(artistValue)
              .onConflictDoUpdate({
                target: artistStats.artistId,
                set: {
                  totalPlayTime: sql`${artistStats.totalPlayTime} + ${timeListened}`,
                  lastCalculatedAt: sql`(unixepoch())`
                }
              })
          }
        }

        // Update playlist stats if applicable
        if (playSource === "playlist" && sourceContextId) {
          await tx
            .insert(playlistStats)
            .values({
              playlistId: sourceContextId,
              totalPlayTime: timeListened,
              lastCalculatedAt: sql`(unixepoch())`
            })
            .onConflictDoUpdate({
              target: playlistStats.playlistId,
              set: {
                totalPlayTime: sql`${playlistStats.totalPlayTime} + ${timeListened}`,
                lastCalculatedAt: sql`(unixepoch())`
              }
            })
        }
      })
    } catch (error) {
      console.error("StatisticsManager: Error updating time statistics:", error)
    }
  }

  /**
   * Forces the current play session to end immediately, persisting any accumulated play time.
   *
   * This is typically used for cleanup, such as when the player is destroyed or an error occurs,
   * to ensure that statistics are recorded even if the session wasn't gracefully ended.
   */
  async forceEnd(): Promise<void> {
    if (this.currentSession) {
      await this.endPlay()
    }
  }
}

/**
 * Global singleton instance of the {@link StatisticsManager}.
 *
 * Use this instance to interact with the application's playback statistics tracking.
 */
export const Statistics = new StatisticsManager()
