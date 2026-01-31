import { database, schema } from "@database/client"

import { and, asc, desc, eq, gte, inArray, sql } from "drizzle-orm"

import {
  type Discover,
  type FavoriteArtists,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type QuickAccess,
  type QuickAccessItem,
  type RecentlyAdded,
  type RecentlyAddedItem,
  type TopAlbums,
  type YourPlaylists
} from "@repo/api"

/**
 * Retrieves data for the "Quick access" section, showing recently played
 * playlists, albums, and artists for quick navigation.
 */
export async function getQuickAccess(limit: number = 12): Promise<QuickAccess> {
  const itemsPerType = Math.ceil(limit / 3)

  const [playlists, albums, artists] = await Promise.all([
    database.query.playlists.findMany({
      limit: itemsPerType,
      where: sql`${schema.playlists.lastPlayedAt} IS NOT NULL`,
      orderBy: desc(schema.playlists.lastPlayedAt)
    }),
    database.query.albums.findMany({
      limit: itemsPerType,
      where: sql`${schema.albums.lastPlayedAt} IS NOT NULL`,
      orderBy: desc(schema.albums.lastPlayedAt)
    }),
    database.query.artists.findMany({
      limit: itemsPerType,
      where: sql`${schema.artists.lastPlayedAt} IS NOT NULL`,
      orderBy: desc(schema.artists.lastPlayedAt)
    })
  ])

  const allItems: Array<QuickAccessItem & { lastPlayedAt: Date | null }> = [
    ...playlists.map((playlist) => ({
      type: "playlist" as const,
      data: playlist,
      lastPlayedAt: playlist.lastPlayedAt
    })),
    ...albums.map((album) => ({
      type: "album" as const,
      data: album,
      lastPlayedAt: album.lastPlayedAt
    })),
    ...artists.map((artist) => ({
      type: "artist" as const,
      data: artist,
      lastPlayedAt: artist.lastPlayedAt
    }))
  ]

  const items: QuickAccessItem[] = allItems
    .sort((a, b) => (b.lastPlayedAt?.getTime() ?? 0) - (a.lastPlayedAt?.getTime() ?? 0))
    .slice(0, limit)
    .map(({ lastPlayedAt: _lastPlayedAt, ...item }) => item)

  return {
    items,
    totalItems: items.length
  }
}

/**
 * Retrieves data for the "Jump back in" section, showing recently played songs.
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
 * Retrieves data for the "New releases" section, showing recently added albums.
 */
export async function getNewReleases(limit: number = 8, days: number = 30): Promise<NewReleases> {
  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const albums = await database.query.albums.findMany({
    limit,
    where: gte(schema.albums.createdAt, daysAgo),
    orderBy: desc(schema.albums.createdAt)
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
 * Retrieves data for the "On repeat" section, highlighting frequently played songs.
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

  const songIds = topSongIds.map((s) => s.songId)
  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, songIds),
    with: {
      album: true,
      artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
    }
  })

  const songMap = new Map(songs.map((song) => [song.id, song]))
  const songsWithStats = topSongIds
    .map((stat) => {
      const song = songMap.get(stat.songId)
      if (!song) return null
      return { ...song, recentPlayCount: stat.recentPlayCount, daysActive: stat.daysActive }
    })
    .filter((song): song is NonNullable<typeof song> => song !== null)

  const totalRecentPlays = songsWithStats.reduce((total, song) => total + song.recentPlayCount, 0)
  const averagePlaysPerSong =
    songsWithStats.length > 0 ? totalRecentPlays / songsWithStats.length : 0
  const mostPlayedSong = songsWithStats[0]

  return {
    songs: songsWithStats,
    totalSongs: songsWithStats.length,
    totalRecentPlays,
    averagePlaysPerSong,
    mostPlayedSong
  }
}

/**
 * Retrieves data for the "Discover" section, showing new music recommendations.
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

  const songIds = discoverResults.map((r) => r.songId)
  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, songIds),
    with: {
      album: true,
      artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
    }
  })

  const songMap = new Map(songs.map((song) => [song.id, song]))
  const songsWithScores = discoverResults
    .map((r) => {
      const song = songMap.get(r.songId)
      if (!song) return null
      return { ...song, discoveryScore: r.discoveryScore }
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
 * Retrieves data for the "Favorite artists" section, showing most played artists.
 */
export async function getFavoriteArtists(limit: number = 12): Promise<FavoriteArtists> {
  const artists = await database.query.artists.findMany({
    limit,
    where: sql`${schema.artists.playCount} > 0`,
    orderBy: desc(schema.artists.playCount)
  })

  if (artists.length === 0) {
    return {
      artists: [],
      totalArtists: 0,
      totalPlayCount: 0
    }
  }

  const totalPlayCount = artists.reduce((total, artist) => total + artist.playCount, 0)
  const topArtist = artists[0]

  return {
    artists,
    totalArtists: artists.length,
    totalPlayCount,
    topArtist
  }
}

/**
 * Retrieves data for the "Your playlists" section, showing user's playlists.
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
 * Retrieves data for the "Top albums" section, showing most played albums.
 */
export async function getTopAlbums(limit: number = 12): Promise<TopAlbums> {
  const albums = await database.query.albums.findMany({
    limit,
    where: sql`${schema.albums.playCount} > 0`,
    orderBy: desc(schema.albums.playCount)
  })

  if (albums.length === 0) {
    return {
      albums: [],
      totalAlbums: 0,
      totalTracks: 0,
      totalDuration: 0,
      totalPlayCount: 0
    }
  }

  const totalTracks = albums.reduce((total, album) => total + album.totalTracks, 0)
  const totalDuration = albums.reduce((total, album) => total + album.totalDuration, 0)
  const totalPlayCount = albums.reduce((total, album) => total + album.playCount, 0)

  return {
    albums,
    totalAlbums: albums.length,
    totalTracks,
    totalDuration,
    totalPlayCount
  }
}

/**
 * Retrieves data for the "Recently added" section, showing newly added
 * songs, albums, artists, and playlists.
 */
export async function getRecentlyAdded(
  limit: number = 12,
  days: number = 30
): Promise<RecentlyAdded> {
  const itemsPerType = Math.ceil(limit / 4)
  const daysAgo = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const [songs, albums, artists, playlists] = await Promise.all([
    database.query.songs.findMany({
      limit: itemsPerType,
      where: gte(schema.songs.createdAt, daysAgo),
      orderBy: desc(schema.songs.createdAt),
      with: {
        album: true,
        artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
      }
    }),
    database.query.albums.findMany({
      limit: itemsPerType,
      where: gte(schema.albums.createdAt, daysAgo),
      orderBy: desc(schema.albums.createdAt)
    }),
    database.query.artists.findMany({
      limit: itemsPerType,
      where: gte(schema.artists.createdAt, daysAgo),
      orderBy: desc(schema.artists.createdAt)
    }),
    database.query.playlists.findMany({
      limit: itemsPerType,
      where: gte(schema.playlists.createdAt, daysAgo),
      orderBy: desc(schema.playlists.createdAt)
    })
  ])

  const allItems: Array<RecentlyAddedItem & { createdAt: Date }> = [
    ...songs.map((song) => ({
      type: "song" as const,
      data: song,
      createdAt: song.createdAt
    })),
    ...albums.map((album) => ({
      type: "album" as const,
      data: album,
      createdAt: album.createdAt
    })),
    ...artists.map((artist) => ({
      type: "artist" as const,
      data: artist,
      createdAt: artist.createdAt
    })),
    ...playlists.map((playlist) => ({
      type: "playlist" as const,
      data: playlist,
      createdAt: playlist.createdAt
    }))
  ]

  const sortedItems = allItems
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)

  const items: RecentlyAddedItem[] = sortedItems.map(({ createdAt: _createdAt, ...item }) => item)

  const dates = sortedItems.map((item) => item.createdAt)
  const addedDateRange =
    dates.length > 0
      ? {
          earliest: new Date(Math.min(...dates.map((d) => d.getTime()))),
          latest: new Date(Math.max(...dates.map((d) => d.getTime())))
        }
      : {
          earliest: new Date(),
          latest: new Date()
        }

  return {
    items,
    totalItems: items.length,
    addedDateRange
  }
}
