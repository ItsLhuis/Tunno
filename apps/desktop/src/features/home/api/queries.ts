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
