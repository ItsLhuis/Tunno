import axios from "axios"

import chalk from "chalk"

import { cleanTrackName } from "./utils"

const LRCLIB_API_BASE_URL = "https://lrclib.net/api"

import { type Song } from "../shared/types"

type SearchParams = {
  title: string
  artists: string[]
  album?: string
  duration?: number | string
}

export async function getLyrics({
  title,
  artists,
  album,
  duration
}: SearchParams): Promise<Song["lyrics"]> {
  if (!title?.trim() || !artists?.length) {
    return null
  }

  console.log(`[lrclib] Searching for ${chalk.blue(title)} by ${chalk.blue(artists.join(", "))}`)

  const titleVariants = [title, cleanTrackName(title)]
  const albumVariants = [album || "", ""]
  const durationVariants = [duration?.toString() || "", ""]

  function parseSyncedLyrics(syncedLyrics: string): { text: string; startTime: number }[] {
    const lines = syncedLyrics.split(/\r?\n/)
    const result: { text: string; startTime: number }[] = []

    const lrcRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]\s*(.*)/

    for (const line of lines) {
      const match = lrcRegex.exec(line)
      if (match) {
        const min = parseInt(match[1], 10)
        const sec = parseInt(match[2], 10)
        const ms = match[3].length === 2 ? parseInt(match[3], 10) * 10 : parseInt(match[3], 10)

        const startTime = Math.round(min * 60 + sec + ms / 1000)
        const text = match[4]

        result.push({ text, startTime })
      }
    }
    return result
  }

  const makeRequest = async (url: string): Promise<any> => {
    try {
      const response = await axios.get(url)
      return response.data
    } catch {
      return null
    }
  }

  for (const artist of artists) {
    for (const titleVariant of titleVariants) {
      for (const albumVariant of albumVariants) {
        for (const durationVariant of durationVariants) {
          const params = new URLSearchParams({
            artist_name: artist,
            track_name: titleVariant,
            ...(albumVariant && { album_name: albumVariant }),
            ...(durationVariant && { duration: durationVariant })
          })

          const url = `${LRCLIB_API_BASE_URL}/get?${params.toString()}`
          const result = await makeRequest(url)

          if (result?.id && result?.syncedLyrics) {
            console.log("[lrclib]", chalk.green("Lyrics found"))

            const formattedSyncedLyrics = Array.isArray(result.syncedLyrics)
              ? result.syncedLyrics
              : parseSyncedLyrics(result.syncedLyrics)

            return formattedSyncedLyrics
          }
        }
      }
    }
  }

  console.log("[lrclib]", chalk.red("Lyrics not found"))

  return null
}
