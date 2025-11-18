import { SpotifyApi, type Track as SpotifySDKTrack } from "@spotify/web-api-ts-sdk"

import { getEnvKey } from "./config"

import { JaroWinklerDistance } from "natural"

import { calculateTrackSimilarity, proportionalSimilarity } from "./utils"

import { RateLimiter } from "../classes/rateLimiter"

import chalk from "chalk"
import inquirer from "inquirer"

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
  releaseYear: number
  albumType: string
  artists: SpotifyArtist[]
}

type SpotifyTrack = {
  title: string
  albumType: string
  album: SpotifyAlbum
  artists: SpotifyArtist[]
}

let sdk: SpotifyApi | null = null

async function getSdk() {
  if (!sdk) {
    const clientId = await getEnvKey("SPOTIFY_CLIENT_ID")
    const clientSecret = await getEnvKey("SPOTIFY_CLIENT_SECRET")
    if (!clientId || !clientSecret) {
      throw new Error("Missing Spotify client credentials")
    }
    sdk = SpotifyApi.withClientCredentials(clientId, clientSecret)
  }
  return sdk
}

async function getArtist(artistId: string): Promise<SpotifyArtistDetails | null> {
  const sdk = await getSdk()
  try {
    await rateLimiter.rateLimitRequest()
    const artist = await sdk.artists.get(artistId)
    return {
      name: artist.name,
      genres: artist.genres,
      images: artist.images
    }
  } catch (error) {
    console.error(error)
    return null
  }
}

async function buildTrackResult(track: SpotifySDKTrack): Promise<SpotifyTrack | null> {
  if (!track) return null

  const trackArtists: SpotifyArtist[] = []
  for (const artist of track.artists) {
    const artistDetails = await getArtist(artist.id)
    if (artistDetails) {
      trackArtists.push({
        name: artistDetails.name,
        thumbnail: artistDetails.images?.[0]?.url || null,
        genres: artistDetails.genres.length > 0 ? artistDetails.genres : null
      })
    }
  }

  const albumArtists: SpotifyArtist[] = []
  for (const albumArtist of track.album.artists) {
    const found = trackArtists.find((a) => a.name === albumArtist.name)
    if (found) {
      albumArtists.push(found)
    } else {
      const artistDetails = await getArtist(albumArtist.id)
      if (artistDetails) {
        albumArtists.push({
          name: artistDetails.name,
          thumbnail: artistDetails.images?.[0]?.url || null,
          genres: artistDetails.genres.length > 0 ? artistDetails.genres : null
        })
      }
    }
  }

  const album: SpotifyAlbum = {
    name: track.album.name || "Unknown",
    thumbnail: track.album.images && track.album.images.length > 0 ? track.album.images[0].url : "",
    releaseYear: Number(track.album.release_date?.slice(0, 4) ?? 0),
    albumType: track.album.album_type,
    artists: albumArtists
  }

  const result: SpotifyTrack = {
    title: track.name,
    albumType: track.album.album_type,
    album,
    artists: trackArtists
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
  const sdk = await getSdk()
  try {
    await rateLimiter.rateLimitRequest()

    let query = name
    if (!options.onlySearchTrackTitle) {
      query = `track:${name}`
      query += ` artist:${artistName}`
      if (year) query += ` year:${year}`
    }

    const result = await sdk.search(
      query,
      ["track"],
      undefined,
      options.onlySearchTrackTitle ? 10 : 5,
      0
    )

    const tracks = result.tracks.items
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

      if (wasTrackFound && track) {
        console.log("[spotify]", chalk.green("Track found"))
        return await buildTrackResult(track)
      }

      if (highestTrackScore <= 0.6) {
        console.log("[spotify]", chalk.red("Track not found"))
        return null
      }

      let isCorrect = false

      const timeoutId = setTimeout(() => {
        console.log(
          `\n[spotify] No response received after 60 seconds. ${chalk.yellow("Skipping track...")}`
        )
        process.stdin.emit("data", "\n")
      }, 60000)

      try {
        const answer = await inquirer.prompt<{ isCorrect: boolean }>([
          {
            type: "confirm",
            name: "isCorrect",
            message: `[spotify] ${chalk.red("Track not found.")} The best match found is ${chalk.blue(
              bestTrackMatch.name
            )} by ${chalk.blue(
              bestTrackMatch.artists.map((artist: any) => artist.name).join(", ")
            )}. ${chalk.yellow("Does this match what you were looking for?")}`,
            default: false
          }
        ])

        isCorrect = answer.isCorrect
      } catch (error) {
        isCorrect = false
      } finally {
        clearTimeout(timeoutId)
      }

      if (isCorrect) return await buildTrackResult(bestTrackMatch)

      return null
    }
  } catch (error) {
    return null
  }
}
