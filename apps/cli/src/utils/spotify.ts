import axios from "axios"

import { getEnvKey } from "./config"

import { JaroWinklerDistance } from "natural"

import { calculateTrackSimilarity } from "./utils"

import { RateLimiter } from "../classes/rateLimiter"

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"

const rateLimiter = new RateLimiter({
  limit: 160,
  interval: 60000,
  message: "[spotify] Limit of requests reached. Waiting..."
})

type SpotifyArtistDetails = {
  name: string
  genres: string[]
  images: { url: string }[]
}

type SpotifyArtist = {
  name: string
  thumbnail: string | null
}

type SpotifyAlbum = {
  name: string
  thumbnail: string
  isSingle: boolean
}

type SpotifyTrack = {
  title: string
  releaseYear: number
  album: SpotifyAlbum
  artists: SpotifyArtist[]
}

async function getAccessToken(): Promise<string | null> {
  const clientId = await getEnvKey("SPOTIFY_CLIENT_ID")
  const clientSecret = await getEnvKey("SPOTIFY_CLIENT_SECRET")

  if (!clientId || !clientSecret) {
    console.error("Spotify client ID and client secret are required")
    return null
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64")

  try {
    const response = await axios.post(SPOTIFY_AUTH_URL, null, {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      params: {
        grant_type: "client_credentials"
      }
    })

    return response.data.access_token
  } catch (error) {
    console.error(error)
    return null
  }
}

async function getArtist(artistId: string): Promise<SpotifyArtistDetails | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) return null

  try {
    await rateLimiter.rateLimitRequest()

    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/artists/${artistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    return {
      name: response.data.name,
      genres: response.data.genres,
      images: response.data.images
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getTrack(
  trackName: string,
  artistName: string | null | undefined,
  year: string | null | undefined,
  options: { onlySearchTrackTitle?: boolean } = {}
): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) return null

  try {
    await rateLimiter.rateLimitRequest()

    let query = ""
    if (options.onlySearchTrackTitle) {
      query = trackName
    } else {
      query = `track:${trackName}`
      if (artistName) {
        query += ` artist:${artistName}`
      }
      if (year) {
        query += ` year:${year}`
      }
    }
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: query,
        type: "track",
        limit: 5
      }
    })

    const tracks = response.data.tracks.items
    if (tracks.length === 0) return null

    let track = tracks.find((item: any) => item.name.toLowerCase() === trackName.toLowerCase())

    if (!track && tracks.length > 0) {
      let bestMatch = tracks[0]
      let highestSimilarity = 0

      for (let i = 1; i < tracks.length; i++) {
        const similarity = calculateTrackSimilarity(trackName, tracks[i].name)
        if (similarity > highestSimilarity) {
          highestSimilarity = similarity
          bestMatch = tracks[i]
        }
      }

      track = bestMatch
    }

    if (options.onlySearchTrackTitle && artistName) {
      const trackArtistNames = track.artists.map((artist: any) =>
        artist.name.toLowerCase()
      )
      const similarity = trackArtistNames.some(
        (name: string) => JaroWinklerDistance(artistName.toLowerCase(), name) > 0.8
      )

      if (!similarity) return null
    }

    const result: SpotifyTrack = {
      title: track.name,
      releaseYear: Number(track.album.release_date.slice(0, 4)),
      album: {
        name: track.album.name || "Unknown",
        thumbnail:
          track.album.images && track.album.images.length > 0
            ? track.album.images[0].url
            : undefined,
        isSingle: track.album.album_type === "single"
      },
      artists: []
    }

    for (const artist of track.artists) {
      const artistDetails = await getArtist(artist.id)
      if (artistDetails) {
        result.artists.push({
          name: artistDetails.name,
          thumbnail: artistDetails.images?.[0]?.url || null
        })
      }
    }

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
