import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm"

import {
  type Discover,
  type FavoriteArtists,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type YourPlaylists
} from "@repo/api"

/**
 * Retrieves a list of recently played songs, allowing users to "jump back in" to their listening history.
 *
 * This function queries the play history to find songs played within a specified timeframe,
 * ordered by the most recent plays. It also calculates aggregated statistics like total
 * time listened and average time per session for the retrieved items.
 *
 * @param limit - The maximum number of recent plays to retrieve. Defaults to 8.
 * @param hours - The number of hours back from the current time to consider for recent plays. Defaults to 48.
 * @returns A Promise that resolves to a {@link JumpBackIn} object containing the list of recent plays
 *          and aggregated statistics.
 */
export async function getJumpBackIn(limit: number = 8, hours: number = 48): Promise<JumpBackIn> {
  const hoursAgo = new Date(Date.now() - hours * 60 * 60 * 1000)

  const recentHistory = await database.query.playHistory.findMany({
    limit,
    where: gte(schema.playHistory.playedAt, hoursAgo),
    orderBy: desc(schema.playHistory.playedAt),
    with: {
      song: {
        with: {
          album: true,
          artists: {
            with: { artist: true },
            orderBy: asc(schema.songsToArtists.artistOrder)
          }
        }
      }
    }
  })

  const items = recentHistory.map((history) => ({
    song: history.song,
    playedAt: history.playedAt,
    timeListened: history.timeListened,
    playSource: history.playSource
  }))

  const totalTimeListened = items.reduce((total, item) => total + item.timeListened, 0)
  const averageTimePerSession = items.length > 0 ? totalTimeListened / items.length : 0

  return {
    items,
    totalItems: items.length,
    totalTimeListened,
    averageTimePerSession
  }
}

/**
 * Retrieves a list of songs that are currently "on repeat" for the user, based on recent play counts.
 *
 * This function identifies songs that have been played frequently within a specified number of days.
 * It also calculates aggregated statistics like total recent plays and average plays per song.
 *
 * @param limit - The maximum number of "on repeat" songs to retrieve. Defaults to 8.
 * @param days - The number of days back from the current time to consider for frequent plays. Defaults to 14.
 * @returns A Promise that resolves to an {@link OnRepeat} object containing the list of "on repeat" songs
 *          and aggregated statistics.
 */
export async function getOnRepeat(limit: number = 8, days: number = 14): Promise<OnRepeat> {
  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const topSongIds = await database
    .select({
      songId: schema.playHistory.songId,
      recentPlayCount: sql<number>`count(*)`.as("recentPlayCount"),
      daysActive: sql<number>`count(distinct date(${schema.playHistory.playedAt}))`.as("daysActive")
    })
    .from(schema.playHistory)
    .where(gte(schema.playHistory.playedAt, daysAgo))
    .groupBy(schema.playHistory.songId)
    .having(sql`count(*) >= 3`)
    .orderBy(desc(sql`count(*)`))
    .limit(limit)

  if (topSongIds.length === 0) {
    return {
      songs: [],
      totalSongs: 0,
      totalRecentPlays: 0,
      averagePlaysPerSong: 0
    }
  }

  const songIds = topSongIds.map((songStat) => songStat.songId)
  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, songIds),
    with: {
      album: true,
      artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
    }
  })

  const songMap = new Map(songs.map((song) => [song.id, song]))
  const songsWithStats = topSongIds
    .map((songStat) => {
      const song = songMap.get(songStat.songId)
      if (!song) return null
      return { ...song, recentPlayCount: songStat.recentPlayCount, daysActive: songStat.daysActive }
    })
    .filter((song): song is NonNullable<typeof song> => song !== null)

  const totalRecentPlays = songsWithStats.reduce((total, song) => total + song.recentPlayCount, 0)
  const averagePlaysPerSong =
    songsWithStats.length > 0 ? totalRecentPlays / songsWithStats.length : 0
  const mostPlayedSong = songsWithStats.reduce(
    (max, song) => (song.recentPlayCount > (max?.recentPlayCount || 0) ? song : max),
    songsWithStats[0] || undefined
  )

  return {
    songs: songsWithStats,
    totalSongs: songsWithStats.length,
    totalRecentPlays,
    averagePlaysPerSong,
    mostPlayedSong
  }
}

/**
 * Retrieves a list of the user's playlists, with optional filtering for favorites.
 *
 * This function fetches a limited number of playlists, calculates their total tracks and duration,
 * and identifies the number of favorite playlists among them.
 *
 * @param limit - The maximum number of playlists to retrieve. Defaults to 6.
 * @param favoritesOnly - If `true`, only favorite playlists will be returned. Defaults to `false`.
 * @returns A Promise that resolves to a {@link YourPlaylists} object containing the list of playlists
 *          and aggregated statistics.
 */
export async function getYourPlaylists(
  limit: number = 6,
  favoritesOnly: boolean = false
): Promise<YourPlaylists> {
  const playlists = await database.query.playlists.findMany({
    limit,
    where: favoritesOnly ? eq(schema.playlists.isFavorite, true) : undefined,
    orderBy: desc(schema.playlists.playCount)
  })

  const totalTracks = playlists.reduce((total, playlist) => total + playlist.totalTracks, 0)
  const totalDuration = playlists.reduce((total, playlist) => total + playlist.totalDuration, 0)
  const favoritePlaylists = playlists.filter((playlist) => playlist.isFavorite).length

  return {
    playlists,
    totalPlaylists: playlists.length,
    totalTracks,
    totalDuration,
    favoritePlaylists
  }
}

/**
 * Retrieves a list of recently added albums, representing new releases.
 *
 * This function fetches albums that were created within a specified number of days,
 * ordered by their creation date. It also calculates aggregated statistics like
 * total tracks, total duration, and the release date range of the retrieved albums.
 *
 * @param limit - The maximum number of new releases to retrieve. Defaults to 8.
 * @param days - The number of days back from the current time to consider for new releases. Defaults to 30.
 * @returns A Promise that resolves to a {@link NewReleases} object containing the list of new release albums
 *          and aggregated statistics.
 */
export async function getNewReleases(limit: number = 8, days: number = 30): Promise<NewReleases> {
  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const albums = await database.query.albums.findMany({
    limit,
    where: gte(schema.albums.createdAt, daysAgo),
    orderBy: desc(schema.albums.createdAt),
    with: {
      artists: { with: { artist: true }, orderBy: asc(schema.albumsToArtists.artistOrder) }
    }
  })

  const totalTracks = albums.reduce((total, album) => total + album.totalTracks, 0)
  const totalDuration = albums.reduce((total, album) => total + album.totalDuration, 0)

  const releaseDates = albums.map((album) => album.createdAt).filter(Boolean)
  const releaseDateRange =
    releaseDates.length > 0
      ? {
          earliest: new Date(Math.min(...releaseDates.map((date) => date.getTime()))),
          latest: new Date(Math.max(...releaseDates.map((date) => date.getTime())))
        }
      : {
          earliest: new Date(),
          latest: new Date()
        }

  return {
    albums,
    totalAlbums: albums.length,
    totalTracks,
    totalDuration,
    releaseDateRange
  }
}

/**
 * Retrieves a list of "discover" songs, identified by a custom discovery score.
 *
 * This function uses a heuristic to find songs with lower play counts that are
 * associated with popular artists or albums, suggesting they might be "hidden gems".
 * It calculates a discovery score for each song and returns a limited list.
 *
 * @param limit - The maximum number of discover songs to retrieve. Defaults to 12.
 * @returns A Promise that resolves to a {@link Discover} object containing the list of discover songs
 *          and aggregated statistics like average and highest discovery score.
 */
export async function getDiscover(limit: number = 12): Promise<Discover> {
  const discoverResults = await database
    .select({
      songId: schema.songs.id,
      discoveryScore: sql<number>`
        CASE
          WHEN ${schema.songs.playCount} = 0 THEN 100
          WHEN ${schema.songs.playCount} <= 2 THEN 80
          WHEN ${schema.songs.playCount} <= 5 THEN 60
          ELSE 40
        END
      `.as("discoveryScore")
    })
    .from(schema.songs)
    .innerJoin(schema.songsToArtists, eq(schema.songs.id, schema.songsToArtists.songId))
    .innerJoin(schema.artists, eq(schema.songsToArtists.artistId, schema.artists.id))
    .leftJoin(schema.albums, eq(schema.songs.albumId, schema.albums.id))
    .where(
      and(
        sql`${schema.songs.playCount} <= 5`,
        sql`${schema.artists.playCount} > 10 OR (${schema.albums.playCount} IS NOT NULL AND ${schema.albums.playCount} > 5)`
      )
    )
    .groupBy(schema.songs.id)
    .orderBy(desc(sql`discoveryScore`))
    .limit(limit)

  if (discoverResults.length === 0) {
    return {
      songs: [],
      totalSongs: 0,
      totalDuration: 0,
      averageDiscoveryScore: 0,
      highestDiscoveryScore: 0
    }
  }

  const songIds = discoverResults.map((discoverResult) => discoverResult.songId)

  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, songIds),
    with: {
      album: true,
      artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
    }
  })

  const songMap = new Map(songs.map((song) => [song.id, song]))
  const songsWithScores = discoverResults
    .map((discoverResult) => {
      const song = songMap.get(discoverResult.songId)
      if (!song) return null
      return { ...song, discoveryScore: discoverResult.discoveryScore }
    })
    .filter((song): song is NonNullable<typeof song> => song !== null)

  const totalDuration = songsWithScores.reduce((total, song) => total + (song.duration || 0), 0)
  const averageDiscoveryScore =
    songsWithScores.length > 0
      ? songsWithScores.reduce((total, song) => total + song.discoveryScore, 0) /
        songsWithScores.length
      : 0
  const highestDiscoveryScore =
    songsWithScores.length > 0 ? Math.max(...songsWithScores.map((song) => song.discoveryScore)) : 0

  return {
    songs: songsWithScores,
    totalSongs: songsWithScores.length,
    totalDuration,
    averageDiscoveryScore,
    highestDiscoveryScore
  }
}

/**
 * Retrieves a list of artists based on their play count and favorite status,
 * intended for a "Favorite Artists" section.
 *
 * This function queries artists with play counts, orders them by play count,
 * and fetches a limited number. It also calculates aggregated statistics
 * like total recent plays and total play time for these artists.
 *
 * @param limit - The maximum number of favorite artists to retrieve. Defaults to 12.
 * @returns A Promise that resolves to a {@link FavoriteArtists} object containing the list of artists
 *          and aggregated statistics.
 */
export async function getFavoriteArtists(limit: number = 12): Promise<FavoriteArtists> {
  const artistsWithStats = await database
    .select({
      id: schema.artists.id,
      uuid: schema.artists.uuid,
      name: schema.artists.name,
      thumbnail: schema.artists.thumbnail,
      playCount: schema.artists.playCount,
      lastPlayedAt: schema.artists.lastPlayedAt,
      isFavorite: schema.artists.isFavorite,
      totalTracks: schema.artists.totalTracks,
      totalDuration: schema.artists.totalDuration,
      createdAt: schema.artists.createdAt,
      updatedAt: schema.artists.updatedAt,
      recentPlayCount: sql<number>`count(${schema.playHistory.id})`.as("recentPlayCount"),
      totalPlayTime: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`.as(
        "totalPlayTime"
      )
    })
    .from(schema.artists)
    .leftJoin(schema.songsToArtists, eq(schema.artists.id, schema.songsToArtists.artistId))
    .leftJoin(schema.playHistory, eq(schema.songsToArtists.songId, schema.playHistory.songId))
    .where(sql`${schema.artists.playCount} > 0`)
    .groupBy(schema.artists.id)
    .orderBy(desc(schema.artists.playCount))
    .limit(limit)

  if (artistsWithStats.length === 0) {
    return {
      artists: [],
      totalArtists: 0,
      totalRecentPlays: 0,
      totalPlayTime: 0
    }
  }

  const artists = artistsWithStats.map(({ recentPlayCount, totalPlayTime, ...artist }) => ({
    ...artist,
    stats: {
      artistId: artist.id,
      totalPlayTime: Number(totalPlayTime) || 0,
      lastCalculatedAt: new Date()
    }
  }))

  const totalRecentPlays = artistsWithStats.reduce(
    (total, artist) => total + (Number(artist.recentPlayCount) || 0),
    0
  )
  const totalPlayTime = artistsWithStats.reduce(
    (total, artist) => total + (Number(artist.totalPlayTime) || 0),
    0
  )
  const topArtist = artists[0]

  return {
    artists,
    totalArtists: artists.length,
    totalRecentPlays,
    totalPlayTime,
    topArtist
  }
}
