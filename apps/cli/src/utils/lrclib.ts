import axios from "axios"
import chalk from "chalk"

import { cleanTrackName } from "./utils"

import { type Lyrics } from "../shared/types"

const LRCLIB_API_BASE_URL = "https://lrclib.net/api"

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
}: SearchParams): Promise<Lyrics | undefined> {
  if (!title?.trim() || !artists?.length) {
    return undefined
  }

  console.log(`[lrclib] Searching for ${chalk.blue(title)} by ${chalk.blue(artists.join(", "))}`)

  const titleVariants = [title, cleanTrackName(title)]
  const albumVariants = [album || "", ""]
  const durationVariants = [duration?.toString() || "", ""]

  const makeRequest = async (url: string): Promise<any> => {
    try {
      const response = await axios.get(url)

      console.log(url)

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
          const result = (await makeRequest(url)) as Lyrics

          if (result?.id) {
            console.log("[lrclib]", chalk.green("Lyrics found"))
            return result
          }
        }
      }
    }
  }

  console.log("[lrclib]", chalk.red("Lyrics not found"))

  return undefined
}
