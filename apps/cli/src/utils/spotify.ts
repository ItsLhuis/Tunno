import axios from "axios"

import { getEnvKey } from "./config"

const SPOTIFY_API_BASE_URL = "https://api.spotify.com/v1"
const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/api/token"

type SpotifyArtistDetails = {
  name: string
  genres: string[]
  images: { url: string }[]
}

type SpotifyArtist = {
  name: string
  thumbnail: string | null
  genres: string[]
}

type SpotifyAlbum = {
  name: string
  thumbnail: string
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

  if (!accessToken) {
    return null
  }

  try {
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
  year: string | null | undefined
): Promise<SpotifyTrack | null> {
  const accessToken = await getAccessToken()

  if (!accessToken) {
    return null
  }

  try {
    let query = `track:${trackName}`
    if (artistName) {
      query += ` artist:${artistName}`
    }
    if (year) {
      query += ` year:${year}`
    }
    const response = await axios.get(`${SPOTIFY_API_BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      params: {
        q: query,
        type: "track",
        limit: 1
      }
    })

    const track = response.data.tracks.items[0]
    if (track) {
      const result: SpotifyTrack = {
        title: track.name,
        releaseYear: Number(track.album.release_date.slice(0, 4)),
        album: {
          name: track.album.name || "Unknown",
          thumbnail:
            track.album.images && track.album.images.length > 0
              ? track.album.images[0].url
              : undefined
        },
        artists: []
      }

      for (const artist of track.artists) {
        const artistDetails = await getArtist(artist.id)
        if (artistDetails) {
          result.artists.push({
            name: artistDetails.name,
            thumbnail: artistDetails.images?.[0]?.url || null,
            genres: artistDetails.genres
          })
        }
      }

      return result
    }

    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
