import { database, schema } from "@database/client"

import { and, asc, count, desc, eq, gte, inArray, sql } from "drizzle-orm"

import {
  type Discover,
  type FavoriteArtists,
  type HiddenGems,
  type JumpBackIn,
  type NewReleases,
  type OnRepeat,
  type RecentlyAdded,
  type RecentlyAddedItem,
  type TopAlbums,
  type UserStats,
  type YourPlaylists
} from "@repo/api"

export const getUserStats = async (): Promise<UserStats> => {
  const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [songStats, artistStats, albumStats, playlistStats] = await Promise.all([
    database
      .select({
        totalSongs: count(schema.songs.id)
      })
      .from(schema.songs)
      .then((result) => result[0]),

    database
      .select({
        totalArtists: count(schema.artists.id)
      })
      .from(schema.artists)
      .then((result) => result[0]),

    database
      .select({
        totalAlbums: count(schema.albums.id)
      })
      .from(schema.albums)
      .then((result) => result[0]),

    database
      .select({
        totalPlaylists: count(schema.playlists.id)
      })
      .from(schema.playlists)
      .then((result) => result[0])
  ])

  const playStats = await database
    .select({
      totalPlayTime: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`,
      totalPlayCount: sql<number>`coalesce(count(*), 0)`,
      averageSessionTime: sql<number>`coalesce(avg(${schema.playHistory.timeListened}), 0)`
    })
    .from(schema.playHistory)
    .then((result) => result[0])

  const [topArtist, topAlbum, topSong, topPlaylist] = await Promise.all([
    database.query.artists.findFirst({
      where: sql`${schema.artists.playCount} > 0`,
      orderBy: desc(schema.artists.playCount)
    }),
    database.query.albums.findFirst({
      where: sql`${schema.albums.playCount} > 0`,
      orderBy: desc(schema.albums.playCount),
      with: {
        artists: { with: { artist: true }, orderBy: asc(schema.albumsToArtists.artistOrder) }
      }
    }),
    database.query.songs.findFirst({
      where: sql`${schema.songs.playCount} > 0`,
      orderBy: desc(schema.songs.playCount),
      with: {
        album: true,
        artists: {
          with: {
            artist: true
          },
          orderBy: asc(schema.songsToArtists.artistOrder)
        },
        playlists: {
          with: {
            playlist: true
          }
        }
      }
    }),
    database.query.playlists.findFirst({
      where: sql`${schema.playlists.playCount} > 0`,
      orderBy: desc(schema.playlists.playCount)
    })
  ])

  const [todayStats, weekStats, monthStats] = await Promise.all([
    database
      .select({
        songsPlayed: sql<number>`count(distinct ${schema.playHistory.songId})`,
        timeListened: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`
      })
      .from(schema.playHistory)
      .where(sql`date(${schema.playHistory.playedAt}) = date('now')`)
      .then((result) => result[0]),

    database
      .select({
        songsPlayed: sql<number>`count(distinct ${schema.playHistory.songId})`,
        timeListened: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`
      })
      .from(schema.playHistory)
      .where(gte(schema.playHistory.playedAt, weekAgo))
      .then((result) => result[0]),

    database
      .select({
        songsPlayed: sql<number>`count(distinct ${schema.playHistory.songId})`,
        timeListened: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`
      })
      .from(schema.playHistory)
      .where(gte(schema.playHistory.playedAt, monthAgo))
      .then((result) => result[0])
  ])

  return {
    totalSongs: Number(songStats?.totalSongs) || 0,
    totalArtists: Number(artistStats?.totalArtists) || 0,
    totalAlbums: Number(albumStats?.totalAlbums) || 0,
    totalPlaylists: Number(playlistStats?.totalPlaylists) || 0,
    totalPlayTime: Number(playStats?.totalPlayTime) || 0,
    totalPlayCount: Number(playStats?.totalPlayCount) || 0,
    averageSessionTime: Number(playStats?.averageSessionTime) || 0,
    topArtist: topArtist || undefined,
    topAlbum: topAlbum || undefined,
    topSong: topSong || undefined,
    topPlaylist: topPlaylist || undefined,
    recentActivity: {
      songsPlayedToday: Number(todayStats?.songsPlayed) || 0,
      songsPlayedThisWeek: Number(weekStats?.songsPlayed) || 0,
      songsPlayedThisMonth: Number(monthStats?.songsPlayed) || 0,
      timeListenedToday: Number(todayStats?.timeListened) || 0,
      timeListenedThisWeek: Number(weekStats?.timeListened) || 0,
      timeListenedThisMonth: Number(monthStats?.timeListened) || 0
    }
  }
}

export const getJumpBackIn = async (limit: number = 8, hours: number = 48): Promise<JumpBackIn> => {
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

export const getOnRepeat = async (limit: number = 8, days: number = 14): Promise<OnRepeat> => {
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

export const getYourPlaylists = async (
  limit: number = 6,
  favoritesOnly: boolean = false
): Promise<YourPlaylists> => {
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

export const getNewReleases = async (
  limit: number = 8,
  days: number = 30
): Promise<NewReleases> => {
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

export const getFavoriteArtists = async (limit: number = 12): Promise<FavoriteArtists> => {
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

export const getTopAlbums = async (limit: number = 10): Promise<TopAlbums> => {
  const albums = await database.query.albums.findMany({
    limit,
    where: sql`${schema.albums.playCount} > 0`,
    orderBy: desc(schema.albums.playCount),
    with: { artists: { with: { artist: true }, orderBy: asc(schema.albumsToArtists.artistOrder) } }
  })

  if (albums.length === 0) {
    return {
      albums: [],
      totalAlbums: 0,
      totalRecentPlays: 0,
      totalPlayTime: 0
    }
  }

  const albumIds = albums.map((album) => album.id)

  const recentStats = await database
    .select({
      albumId: schema.songs.albumId,
      recentPlayCount: sql<number>`count(*)`.as("recentPlayCount"),
      totalPlayTime: sql<number>`coalesce(sum(${schema.playHistory.timeListened}), 0)`.as(
        "totalPlayTime"
      )
    })
    .from(schema.playHistory)
    .innerJoin(schema.songs, eq(schema.playHistory.songId, schema.songs.id))
    .where(inArray(schema.songs.albumId, albumIds))
    .groupBy(schema.songs.albumId)

  const totalRecentPlays = recentStats.reduce(
    (total, albumStat) => total + albumStat.recentPlayCount,
    0
  )
  const totalPlayTime = recentStats.reduce((total, albumStat) => total + albumStat.totalPlayTime, 0)
  const topAlbum = albums[0]

  return {
    albums,
    totalAlbums: albums.length,
    totalRecentPlays,
    totalPlayTime,
    topAlbum
  }
}

export const getRecentlyAdded = async (limit: number = 12): Promise<RecentlyAdded> => {
  const [songs, albums, playlists, artists] = await Promise.all([
    database.query.songs.findMany({
      limit: limit * 2,
      orderBy: desc(schema.songs.createdAt),
      with: {
        album: true,
        artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
      }
    }),
    database.query.albums.findMany({
      limit: limit * 2,
      orderBy: desc(schema.albums.createdAt),
      with: {
        artists: { with: { artist: true }, orderBy: asc(schema.albumsToArtists.artistOrder) }
      }
    }),
    database.query.playlists.findMany({
      limit: limit * 2,
      orderBy: desc(schema.playlists.createdAt)
    }),
    database.query.artists.findMany({
      limit: limit * 2,
      orderBy: desc(schema.artists.createdAt)
    })
  ])

  const allItems: Array<{
    type: "song" | "album" | "playlist" | "artist"
    data: any
    createdAt: Date
  }> = [
    ...songs.map((song) => ({ type: "song" as const, data: song, createdAt: song.createdAt })),
    ...albums.map((album) => ({ type: "album" as const, data: album, createdAt: album.createdAt })),
    ...playlists.map((playlist) => ({
      type: "playlist" as const,
      data: playlist,
      createdAt: playlist.createdAt
    })),
    ...artists.map((artist) => ({
      type: "artist" as const,
      data: artist,
      createdAt: artist.createdAt
    }))
  ]

  const sortedItems = allItems
    .filter((item) => item.createdAt)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit)

  const items: RecentlyAddedItem[] = sortedItems.map((item) => ({
    type: item.type,
    data: item.data
  }))

  const totalDuration = sortedItems
    .filter((item) => item.type === "song")
    .reduce((total, item) => total + (item.data.duration || 0), 0)

  const addedDates = sortedItems.map((item) => item.createdAt).filter(Boolean)
  const addedDateRange =
    addedDates.length > 0
      ? {
          earliest: new Date(Math.min(...addedDates.map((date) => date.getTime()))),
          latest: new Date(Math.max(...addedDates.map((date) => date.getTime())))
        }
      : {
          earliest: new Date(),
          latest: new Date()
        }

  const totalSongs = sortedItems.filter((item) => item.type === "song").length
  const totalAlbums = sortedItems.filter((item) => item.type === "album").length
  const totalPlaylists = sortedItems.filter((item) => item.type === "playlist").length
  const totalArtists = sortedItems.filter((item) => item.type === "artist").length

  return {
    items,
    totalItems: items.length,
    totalSongs,
    totalAlbums,
    totalPlaylists,
    totalArtists,
    totalDuration,
    addedDateRange
  }
}

export const getHiddenGems = async (
  limit: number = 12,
  options?: { minYearsOld?: number; maxPlayCount?: number }
): Promise<HiddenGems> => {
  const currentYear = new Date().getFullYear()
  const minYearsOld = options?.minYearsOld ?? 5
  const maxPlayCount = options?.maxPlayCount ?? 3

  const hiddenResults = await database
    .select({
      songId: schema.songs.id,
      nostalgiaScore: sql<number>`
        (CASE WHEN ${schema.songs.releaseYear} IS NULL THEN 0 ELSE ${currentYear} - ${schema.songs.releaseYear} END)
        + (CASE WHEN ${schema.artists.isFavorite} = 1 THEN 10 ELSE 0 END)
        + (CASE WHEN ${schema.songs.playCount} = 0 THEN 8
               WHEN ${schema.songs.playCount} <= 1 THEN 6
               WHEN ${schema.songs.playCount} <= 3 THEN 4
               ELSE 0 END)
      `.as("nostalgiaScore")
    })
    .from(schema.songs)
    .innerJoin(schema.songsToArtists, eq(schema.songs.id, schema.songsToArtists.songId))
    .innerJoin(schema.artists, eq(schema.songsToArtists.artistId, schema.artists.id))
    .leftJoin(schema.albums, eq(schema.songs.albumId, schema.albums.id))
    .where(
      and(
        sql`${schema.songs.playCount} <= ${maxPlayCount}`,
        sql`${schema.songs.releaseYear} IS NULL OR ${schema.songs.releaseYear} <= ${currentYear - minYearsOld}`
      )
    )
    .groupBy(schema.songs.id)
    .orderBy(desc(sql`nostalgiaScore`))
    .limit(limit)

  if (hiddenResults.length === 0) {
    return {
      songs: [],
      totalSongs: 0,
      totalDuration: 0,
      averageNostalgiaScore: 0,
      highestNostalgiaScore: 0
    }
  }

  const songIds = hiddenResults.map((hiddenResult) => hiddenResult.songId)

  const songs = await database.query.songs.findMany({
    where: inArray(schema.songs.id, songIds),
    with: {
      album: true,
      artists: { with: { artist: true }, orderBy: asc(schema.songsToArtists.artistOrder) }
    }
  })

  const songMap = new Map(songs.map((song) => [song.id, song]))
  const songsWithScores = hiddenResults
    .map((hiddenResult) => {
      const song = songMap.get(hiddenResult.songId)
      if (!song) return null
      return { ...song, nostalgiaScore: hiddenResult.nostalgiaScore }
    })
    .filter((song): song is NonNullable<typeof song> => song !== null)

  const totalDuration = songsWithScores.reduce((total, song) => total + (song.duration || 0), 0)
  const averageNostalgiaScore =
    songsWithScores.length > 0
      ? songsWithScores.reduce((total, song) => total + song.nostalgiaScore, 0) /
        songsWithScores.length
      : 0
  const highestNostalgiaScore =
    songsWithScores.length > 0 ? Math.max(...songsWithScores.map((song) => song.nostalgiaScore)) : 0

  return {
    songs: songsWithScores,
    totalSongs: songsWithScores.length,
    totalDuration,
    averageNostalgiaScore,
    highestNostalgiaScore
  }
}

export const getDiscover = async (limit: number = 12): Promise<Discover> => {
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
        sql`${schema.artists.playCount} > 10 OR ${schema.albums.playCount} > 5`
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
