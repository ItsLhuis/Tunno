import { eq, sql } from "drizzle-orm"

import { database } from "@database/client"
import { schema } from "@repo/database"

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

import { type PlaySource } from "@features/songs/types/playSource"

import { type PlaySession } from "./types"

export class StatisticsManager {
  private currentSession: PlaySession | null = null

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
          isPaused: false
        }
      } catch (error) {
        console.error("StatisticsManager: Error starting play session:", error)
      }
    }
  }

  private resumePlay(): void {
    if (this.currentSession && this.currentSession.isPaused) {
      const alreadyListened = this.currentSession.totalTimeListened
      this.currentSession.startTime = Date.now() - alreadyListened * 1000
      this.currentSession.isPaused = false
    }
  }

  updatePlayTime(): void {
    if (!this.currentSession || this.currentSession.isPaused) return

    const sessionDuration = (Date.now() - this.currentSession.startTime) / 1000
    this.currentSession.totalTimeListened = Math.floor(sessionDuration)
  }

  pausePlay(): void {
    if (this.currentSession && !this.currentSession.isPaused) {
      this.updatePlayTime()
      this.currentSession.isPaused = true
    }
  }

  async endPlay(): Promise<void> {
    if (!this.currentSession) return

    this.updatePlayTime()

    const session = this.currentSession
    const timeListened = this.currentSession.totalTimeListened

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

    await this.updateAllStats(
      session.songId,
      timeListened,
      session.playSource,
      session.sourceContextId
    )

    this.currentSession = null
  }

  private async updateAllStats(
    songId: number,
    timeListened: number,
    playSource: PlaySource,
    sourceContextId?: number
  ): Promise<void> {
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

      if (songData.length === 0) return

      const song = songData[0]
      const artistIds = songData.map((s) => s.artistIds).filter(Boolean) as number[]

      await this.updatePlayCounts(songId, song.albumId, artistIds, playSource, sourceContextId)

      await this.updateTimeStats(
        songId,
        song.albumId,
        artistIds,
        timeListened,
        playSource,
        sourceContextId
      )
    } catch (error) {
      console.error("StatisticsManager: Error updating statistics:", error)
    }
  }

  private async updatePlayCounts(
    songId: number,
    albumId: number | null,
    artistIds: number[],
    playSource: PlaySource,
    sourceContextId?: number
  ): Promise<void> {
    await database
      .update(songs)
      .set({
        playCount: sql`play_count + 1`,
        lastPlayedAt: sql`(unixepoch())`
      })
      .where(eq(songs.id, songId))

    if (albumId) {
      await database
        .update(albums)
        .set({
          playCount: sql`play_count + 1`,
          lastPlayedAt: sql`(unixepoch())`
        })
        .where(eq(albums.id, albumId))
    }

    if (playSource === "artist" && sourceContextId) {
      await database
        .update(artists)
        .set({
          playCount: sql`play_count + 1`,
          lastPlayedAt: sql`(unixepoch())`
        })
        .where(eq(artists.id, sourceContextId))
    } else {
      for (const artistId of artistIds) {
        await database
          .update(artists)
          .set({
            playCount: sql`play_count + 1`,
            lastPlayedAt: sql`(unixepoch())`
          })
          .where(eq(artists.id, artistId))
      }
    }

    if (playSource === "playlist" && sourceContextId) {
      await database
        .update(playlists)
        .set({
          playCount: sql`play_count + 1`,
          lastPlayedAt: sql`(unixepoch())`
        })
        .where(eq(playlists.id, sourceContextId))
    }
  }

  private async updateTimeStats(
    songId: number,
    albumId: number | null,
    artistIds: number[],
    timeListened: number,
    playSource: PlaySource,
    sourceContextId?: number
  ): Promise<void> {
    await database
      .insert(songStats)
      .values({
        songId,
        totalPlayTime: timeListened,
        lastCalculatedAt: new Date()
      })
      .onConflictDoUpdate({
        target: songStats.songId,
        set: {
          totalPlayTime: sql`${songStats.totalPlayTime} + ${timeListened}`,
          lastCalculatedAt: new Date()
        }
      })

    if (albumId) {
      await database
        .insert(albumStats)
        .values({
          albumId,
          totalPlayTime: timeListened,
          lastCalculatedAt: new Date()
        })
        .onConflictDoUpdate({
          target: albumStats.albumId,
          set: {
            totalPlayTime: sql`${albumStats.totalPlayTime} + ${timeListened}`,
            lastCalculatedAt: new Date()
          }
        })
    }

    if (playSource === "artist" && sourceContextId) {
      await database
        .insert(artistStats)
        .values({
          artistId: sourceContextId,
          totalPlayTime: timeListened,
          lastCalculatedAt: new Date()
        })
        .onConflictDoUpdate({
          target: artistStats.artistId,
          set: {
            totalPlayTime: sql`${artistStats.totalPlayTime} + ${timeListened}`,
            lastCalculatedAt: new Date()
          }
        })
    } else {
      for (const artistId of artistIds) {
        await database
          .insert(artistStats)
          .values({
            artistId,
            totalPlayTime: timeListened,
            lastCalculatedAt: new Date()
          })
          .onConflictDoUpdate({
            target: artistStats.artistId,
            set: {
              totalPlayTime: sql`${artistStats.totalPlayTime} + ${timeListened}`,
              lastCalculatedAt: new Date()
            }
          })
      }
    }

    if (playSource === "playlist" && sourceContextId) {
      await database
        .insert(playlistStats)
        .values({
          playlistId: sourceContextId,
          totalPlayTime: timeListened,
          lastCalculatedAt: new Date()
        })
        .onConflictDoUpdate({
          target: playlistStats.playlistId,
          set: {
            totalPlayTime: sql`${playlistStats.totalPlayTime} + ${timeListened}`,
            lastCalculatedAt: new Date()
          }
        })
    }
  }

  async forceEnd(): Promise<void> {
    if (this.currentSession) {
      await this.endPlay()
    }
  }
}

export const Statistics = new StatisticsManager()
