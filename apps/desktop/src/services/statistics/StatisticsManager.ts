import { eq, sql } from "drizzle-orm"

import { database } from "@database/client"
import { schema } from "@repo/database"

import { usePlayerStore } from "@features/songs/stores/usePlayerStore"

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
          isPaused: false,
          playCountRecorded: false
        }

        this.schedulePlayCountRecording()
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

      if (!this.currentSession.playCountRecorded) {
        if (alreadyListened >= 3) {
          this.recordPlayCounts()
        } else {
          this.schedulePlayCountRecording()
        }
      }
    }
  }

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

  updatePlayTime(): void {
    if (!this.currentSession || this.currentSession.isPaused) return

    const sessionDuration = (Date.now() - this.currentSession.startTime) / 1000
    this.currentSession.totalTimeListened = Math.round(sessionDuration)
  }

  private async recordPlayCounts(): Promise<void> {
    if (!this.currentSession || this.currentSession.playCountRecorded) return

    try {
      this.currentSession.playCountRecorded = true

      if (this.currentSession.playCountTimer) {
        clearTimeout(this.currentSession.playCountTimer)
        this.currentSession.playCountTimer = undefined
      }

      const songData = await this.getSongData(this.currentSession.songId)
      if (!songData) return

      await this.updatePlayCounts(
        this.currentSession.songId,
        songData.albumId,
        songData.artistIds,
        this.currentSession.playSource,
        this.currentSession.sourceContextId
      )
    } catch (error) {
      console.error("StatisticsManager: Error recording play counts:", error)
    }
  }

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
      session.sourceContextId
    )

    this.currentSession = null
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
    timeListened: number,
    playSource: PlaySource,
    sourceContextId?: number
  ): Promise<void> {
    try {
      const songData = await this.getSongData(songId)
      if (!songData) return

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

      if (songData.albumId) {
        await database
          .insert(albumStats)
          .values({
            albumId: songData.albumId,
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
        for (const artistId of songData.artistIds) {
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
    } catch (error) {
      console.error("StatisticsManager: Error updating time statistics:", error)
    }
  }

  async forceEnd(): Promise<void> {
    if (this.currentSession) {
      await this.endPlay()
    }
  }
}

export const Statistics = new StatisticsManager()
