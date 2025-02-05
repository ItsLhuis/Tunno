import axios from "axios"

import { getEnvKey } from "./config"

import { JaroWinklerDistance } from "natural"

import { calculateTrackSimilarity, cleanTrackName, sigmoidSimilarity } from "./utils"

import { RateLimiter } from "../classes/rateLimiter"

import inquirer from "inquirer"
import chalk from "chalk"

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

async function buildTrackResult(track: any): Promise<SpotifyTrack | null> {
  if (!track) return null

  const result: SpotifyTrack = {
    title: track.name,
    releaseYear: Number(track.album.release_date.slice(0, 4)),
    album: {
      name: track.album.name || "Unknown",
      thumbnail:
        track.album.images && track.album.images.length > 0 ? track.album.images[0].url : undefined,
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
}

export async function getTrack(
  name: string,
  duration: number,
  artistName: string | null | undefined,
  year: string | null | undefined,
  options: { onlySearchTrackTitle?: boolean } = {}
): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) return null

  const cleanedTrackName = cleanTrackName(name)

  try {
    await rateLimiter.rateLimitRequest()

    let query = cleanedTrackName
    if (!options.onlySearchTrackTitle) {
      query = `track:${cleanedTrackName}`
      if (artistName) query += ` artist:${artistName}`
      if (year) query += ` year:${year}`
    }

    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: query,
        type: "track",
        limit: options.onlySearchTrackTitle ? 10 : 1
      }
    })

    if (!options.onlySearchTrackTitle) {
      const track = response.data.tracks.items[0]

      if (track) return await buildTrackResult(track)

      return null
    } else {
      const tracks = response.data.tracks.items
      if (tracks.length === 0) return null

      let wasTrackFound = true

      let track = tracks.find(
        (item: any) => item.name.toLowerCase() === cleanedTrackName.toLowerCase()
      )

      let bestTrackMatch = tracks[0]
      let highestTrackScore = 0

      if (!track && tracks.length > 0) {
        for (let i = 0; i < tracks.length; i++) {
          const track = tracks[i]

          const trackDurationSeconds = Math.round(track.duration_ms / 1000)

          const similarity = calculateTrackSimilarity(cleanedTrackName, track.name)

          const timeScore = sigmoidSimilarity(trackDurationSeconds, duration)

          const combinedScore = similarity * 0.7 + timeScore * 0.3

          if (combinedScore > highestTrackScore) {
            highestTrackScore = combinedScore
            bestTrackMatch = track
          }
        }

        if (highestTrackScore >= 0.6) {
          track = bestTrackMatch
        } else {
          wasTrackFound = false
        }
      }

      if (artistName && track && track.artists) {
        const trackArtistNames = track.artists.map((artist: any) => artist.name.toLowerCase())
        const similarity = trackArtistNames.some(
          (name: string) => JaroWinklerDistance(artistName.toLowerCase(), name) > 0.7
        )

        if (!similarity) wasTrackFound = false
      } else {
        wasTrackFound = false
      }

      let trackReleaseYear: number | null = null

      if (track && track.album && track.album.release_date) {
        trackReleaseYear = Number(track.album.release_date.slice(0, 4))
      }

      if (year && trackReleaseYear !== null) {
        const parsedYear = Number(year)
        const yearDifference = Math.abs(parsedYear - trackReleaseYear)

        if (yearDifference > 1) wasTrackFound = false
      } else {
        wasTrackFound = false
      }

      if (!wasTrackFound) {
        console.log("[spotify]", chalk.red("Track not found on Spotify"))

        if (highestTrackScore <= 0.5) return null

        const { isCorrect } = await inquirer.prompt([
          {
            type: "confirm",
            name: "isCorrect",
            message: `[spotify] The best match found is ${chalk.blue(
              bestTrackMatch.name
            )} by ${chalk.blue(
              bestTrackMatch.artists.map((artist: any) => artist.name).join(", ")
            )}. ${chalk.yellow("Does this match what you were looking for?")}`,
            default: true
          }
        ])

        if (isCorrect) return await buildTrackResult(bestTrackMatch)

        return null
      }

      return null
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
