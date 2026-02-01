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

/**
 * Represents detailed information about a Spotify artist.
 */
type SpotifyArtistDetails = {
  name: string
  genres: string[]
  images: { url: string }[]
}

/**
 * Represents a simplified Spotify artist object for track and album contexts.
 */
type SpotifyArtist = {
  name: string
  thumbnail: string | null
  genres: string[] | null
}

/**
 * Represents a Spotify album object.
 */
type SpotifyAlbum = {
  name: string
  thumbnail: string
  releaseYear: number
  albumType: string
  artists: SpotifyArtist[]
}

/**
 * Represents a simplified Spotify track object, tailored for application use.
 */
type SpotifyTrack = {
  title: string
  albumType: string
  album: SpotifyAlbum
  artists: SpotifyArtist[]
}

let sdk: SpotifyApi | null = null

/**
 * Initializes and returns a Spotify SDK instance using client credentials.
 * Retrieves client ID and secret from environment variables managed by `getEnvKey`.
 * Throws an error if credentials are not found.
 *
 * @returns A Promise that resolves to a `SpotifyApi` instance.
 * @throws {Error} If Spotify client credentials are missing.
 */
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

/**
 * Retrieves detailed information for a Spotify artist.
 * Applies a rate limit to prevent exceeding Spotify API call limits.
 *
 * @param artistId - The Spotify ID of the artist.
 * @returns A Promise that resolves to `SpotifyArtistDetails` or `null` if an error occurs.
 */
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

/**
 * Builds a standardized `SpotifyTrack` object from a raw `SpotifySDKTrack` object
 * received directly from the Spotify API. This function transforms the raw data
 * by enriching artist information (fetching genres and thumbnails) and structuring
 * the track, album, and artist data into a format consistent with the application's `SpotifyTrack` type.
 * It handles cases where artist details might be missing or where artists are duplicated
 * between track and album contexts to avoid redundant API calls.
 *
 * @param track - The raw `SpotifySDKTrack` object obtained from the Spotify Web API.
 * @returns A Promise that resolves to a `SpotifyTrack` object if the input is valid and
 *          processing is successful, otherwise resolves to `null`.
 */
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

/**
 * Retrieves a Spotify track by its ID.
 * Applies a rate limit to prevent exceeding Spotify API call limits.
 *
 * @param trackId - The Spotify ID of the track.
 * @returns A Promise that resolves to a `SpotifyTrack` object or `null` if the track is not found or an error occurs.
 */
export async function getTrackById(trackId: string): Promise<SpotifyTrack | null> {
  const sdk = await getSdk()

  try {
    await rateLimiter.rateLimitRequest()

    const track = await sdk.tracks.get(trackId)

    if (track) {
      console.log("[spotify]", chalk.green("Track found by ID"))
      return await buildTrackResult(track)
    }

    return null
  } catch {
    console.log("[spotify]", chalk.red("Could not find track by ID"))
    return null
  }
}

/**
 * Searches for a Spotify track using various strategies: direct query, fuzzy matching,
 * and optional user confirmation. This function is designed to find the most relevant
 * track even with imperfect input, leveraging Spotify's search capabilities and
 * local similarity calculations.
 *
 * The search process can be influenced by `options.onlySearchTrackTitle`, which,
 * when true, performs a broader search and relies more heavily on similarity and
 * user interaction to confirm the best match. Without this option, it attempts
 * a more precise search using track name, artist, and year.
 *
 * A rate limit is applied to all Spotify API calls to prevent exceeding service limits.
 *
 * @param name - The primary name of the track to search for.
 * @param duration - The expected duration of the track in seconds, used for similarity comparison.
 * @param artistName - The name of the primary artist, used for filtering and similarity comparison.
 * @param year - (Optional) The release year of the track, used for more precise matching.
 * @param options - (Optional) An object containing additional search configurations.
 *                  - `onlySearchTrackTitle`: If `true`, the search prioritizes track title
 *                    matching and may prompt the user for confirmation if multiple ambiguous
 *                    results are found. If `false` or omitted, a more exact search is attempted.
 * @returns A Promise that resolves to a `SpotifyTrack` object if a suitable match is found
 *          (potentially with user confirmation), otherwise resolves to `null`.
 */
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
      const track = tracks.find((track) => track.name.toLowerCase() === name.toLowerCase())
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

      let track = tracks.find((item) => item.name.toLowerCase() === name)
      let bestTrackMatch = tracks[0]

      let highestTrackScore = 0

      if (!track && tracks.length > 0) {
        for (const track of tracks) {
          if (track.artists) {
            track.artists.forEach((artist) => {
              name = name.replace(new RegExp(artist.name, "i"), "").trim()
            })
          }
          const trackSimilarity = calculateTrackSimilarity(name, track.name)
          const timeScore = proportionalSimilarity(Math.round(track.duration_ms / 1000), duration)

          // Calculate a weighted final score: 70% from track title similarity, 30% from duration similarity.
          const finalScore = trackSimilarity * 0.7 + timeScore * 0.3

          if (finalScore > highestTrackScore) {
            highestTrackScore = finalScore
            bestTrackMatch = track
          }
        }

        if (highestTrackScore >= 0.6) {
          // If the best match has a reasonably high score
          track = bestTrackMatch
        } else {
          wasTrackFound = false
        }
      }
      // If the highest track score is still below a high confidence threshold (0.9),
      // perform additional checks for artist and year similarity.
      if (highestTrackScore < 0.9) {
        if (track && track.artists) {
          const trackArtistNames = track.artists.map((artist) => artist.name.toLowerCase())
          // Check if any of the track artists are similar to the provided artist name using Jaro-Winkler distance.
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
            // Allow for a maximum difference of 1 year between the queried year and the track's release year.
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

      // Set a timeout for user interaction. If no response within 60 seconds,
      // automatically skip the track by simulating a newline input.
      const timeoutId = setTimeout(() => {
        console.log(
          `\n[spotify] No response received after 60 seconds. ${chalk.yellow("Skipping track...")}`
        )
        process.stdin.emit("data", "\n") // Simulate pressing Enter
      }, 60000)
      try {
        const answer = await inquirer.prompt<{ isCorrect: boolean }>([
          {
            type: "confirm",
            name: "isCorrect",
            message: `[spotify] ${chalk.red("Track not found.")} The best match found is ${chalk.blue(
              bestTrackMatch.name
            )} by ${chalk.blue(
              bestTrackMatch.artists.map((artist) => artist.name).join(", ")
            )}. ${chalk.yellow("Does this match what you were looking for?")}`,
            default: false
          }
        ])

        isCorrect = answer.isCorrect
      } catch {
        isCorrect = false
      } finally {
        clearTimeout(timeoutId)
      }

      if (isCorrect) return await buildTrackResult(bestTrackMatch)

      return null
    }
  } catch {
    return null
  }
}
