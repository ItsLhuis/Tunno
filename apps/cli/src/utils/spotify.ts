import axios from "axios"

import { getEnvKey } from "./config"

import { JaroWinklerDistance } from "natural"

import { calculateTrackSimilarity, proportionalSimilarity } from "./utils"

import { RateLimiter } from "../classes/rateLimiter"

import chalk from "chalk"
import inquirer from "inquirer"

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
  genres: string[] | null
}

type SpotifyAlbum = {
  name: string
  thumbnail: string
}

type SpotifyTrack = {
  title: string
  releaseYear: number
  isSingle: boolean
  album: SpotifyAlbum
  artists: SpotifyArtist[]
}

async function getAccessToken(): Promise<string | null> {
  const clientId = await getEnvKey("SPOTIFY_CLIENT_ID")
  const clientSecret = await getEnvKey("SPOTIFY_CLIENT_SECRET")

  if (!clientId || !clientSecret) {
    console.error("[spotify]", chalk.red("Spotify Client ID and Client Secret are required"))
    process.exit(0)
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
    isSingle: track.album.album_type === "single",
    album: {
      name: track.album.name || "Unknown",
      thumbnail:
        track.album.images && track.album.images.length > 0 ? track.album.images[0].url : undefined
    },
    artists: []
  }

  for (const artist of track.artists) {
    const artistDetails = await getArtist(artist.id)
    if (artistDetails) {
      result.artists.push({
        name: artistDetails.name,
        thumbnail: artistDetails.images?.[0]?.url || null,
        genres: artistDetails.genres.length > 0 ? artistDetails.genres : null
      })
    }
  }

  return result
}

export async function getTrack(
  name: string,
  duration: number,
  artistName: string,
  year: string | null | undefined,
  options: { onlySearchTrackTitle?: boolean } = {}
): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) return null

  try {
    await rateLimiter.rateLimitRequest()

    let query = name
    if (!options.onlySearchTrackTitle) {
      query = `track:${name}`
      query += ` artist:${artistName}`
      if (year) query += ` year:${year}`
    }

    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: query,
        type: "track",
        limit: options.onlySearchTrackTitle ? 10 : 5
      }
    })

    const tracks = response.data.tracks.items
    if (tracks.length === 0) {
      console.log("[spotify]", chalk.red("Track not found"))
      return null
    }

    if (!options.onlySearchTrackTitle) {
      let track = tracks.find((track: any) => track.name.toLowerCase() === name.toLowerCase())

      if (track) {
        console.log("[spotify]", chalk.green("Track found"))
        return await buildTrackResult(track)
      }

      let trackSimilarity = 0
      for (const currentTrack of tracks) {
        trackSimilarity = calculateTrackSimilarity(name, currentTrack.name)

        if (trackSimilarity > 0.9) {
          console.log("[spotify]", chalk.green("Track found"))
          return await buildTrackResult(currentTrack)
        }
      }

      console.log("[spotify]", chalk.red("Track not found"))
      return null
    } else {
      let wasTrackFound = true

      let track = tracks.find((item: any) => item.name.toLowerCase() === name)

      let bestTrackMatch = tracks[0]
      let highestTrackScore = 0

      if (!track && tracks.length > 0) {
        for (const track of tracks) {
          if (track.artists) {
            track.artists.forEach((artist: any) => {
              name = name.replace(new RegExp(artist.name, "i"), "").trim()
            })
          }

          const trackSimilarity = calculateTrackSimilarity(name, track.name)

          const timeScore = proportionalSimilarity(Math.round(track.duration_ms / 1000), duration)

          const finalScore = trackSimilarity * 0.7 + timeScore * 0.3

          if (finalScore > highestTrackScore) {
            highestTrackScore = finalScore
            bestTrackMatch = track
          }
        }

        if (highestTrackScore >= 0.6) {
          track = bestTrackMatch
        } else {
          wasTrackFound = false
        }
      }

      if (highestTrackScore < 0.9) {
        if (track && track.artists) {
          const trackArtistNames = track.artists.map((artist: any) => artist.name.toLowerCase())
          const artistSimilarity = trackArtistNames.some(
            (name: string) => JaroWinklerDistance(artistName.toLowerCase(), name) > 0.7
          )

          if (!artistSimilarity) wasTrackFound = false
        } else {
          wasTrackFound = false
        }

        let trackReleaseYear: number | null = null

        if (year && track && track.album && track.album.release_date) {
          trackReleaseYear = Number(track.album.release_date.slice(0, 4))

          if (year && trackReleaseYear) {
            const yearDifference = Math.abs(Number(year) - trackReleaseYear)

            if (yearDifference > 1) wasTrackFound = false
          }
        }
      }

      if (wasTrackFound) {
        console.log("[spotify]", chalk.green("Track found"))
        return await buildTrackResult(track)
      }

      if (highestTrackScore <= 0.6) {
        console.log("[spotify]", chalk.red("Track not found"))
        return null
      }

      const { isCorrect } = await inquirer.prompt([
        {
          type: "confirm",
          name: "isCorrect",
          message: `[spotify] ${chalk.red("Track not found.")} The best match found is ${chalk.blue(
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
  } catch (error) {
    return null
  }
}
