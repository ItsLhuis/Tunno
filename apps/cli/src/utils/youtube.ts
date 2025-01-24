import fs from "fs"
import path from "path"

import { v4 as uuid } from "uuid"

import chalk from "chalk"

import sanitize from "sanitize-filename"

import { getDownloadPath } from "./config"

import { downloadThumbnail, runCommand, execPromise } from "./utils"

import { getTrack } from "./spotify"

import { type Song } from "../shared/types"

type YoutubeSong = {
  title: string
  thumbnail: string
  duration: number
  uploader: string
  release_date?: string | null | undefined
  upload_date: string
}

export const download = async (
  videoId: string,
  options?: {
    title?: string
    artist?: string
    releaseYear?: string
    basicDownload?: boolean
  }
): Promise<void> => {
  try {
    const downloadPath = await getDownloadPath()

    const url = `https://music.youtube.com/watch?v=${videoId}`

    console.log(`[youtube] Extracting video info from: ${url}`)
    const { stdout: videoJson } = await execPromise(`yt-dlp --dump-json ${url}`)

    const videoInfo: YoutubeSong = JSON.parse(videoJson)

    let videoDir = options?.basicDownload
      ? downloadPath
      : path.join(downloadPath, sanitize(videoInfo.title, { replacement: "" }))

    if (!options?.basicDownload) {
      const searchTitle = options?.title || videoInfo.title
      const searchArtist = options?.artist || videoInfo.uploader
      const searchYear =
        options?.releaseYear || (videoInfo.release_date ? videoInfo.release_date.slice(0, 4) : null)

      console.log(
        `[spotify] Extracting metadata for ${chalk.blue(searchTitle)} by ${chalk.blue(
          searchArtist
        )}`
      )
      const track = await getTrack(searchTitle, searchArtist, searchYear)

      if (!track) {
        console.log(chalk.red("Track not found on Spotify"))
        console.log(
          chalk.yellow("Suggestion:"),
          "You can either download just the track and manually update the metadata later, or provide additional fields related to the Spotify search to improve metadata accuracy. Mismatching the YouTube video ID with unrelated metadata fields may result in incorrect metadata"
        )
        return
      }

      videoDir = path.join(downloadPath, sanitize(track.title, { replacement: "" }))
      fs.mkdirSync(videoDir, { recursive: true })

      const videoMetadata: Song = {
        title: track.title,
        thumbnail: "",
        duration: videoInfo.duration,
        artists: [],
        album: track.album,
        releaseYear: track.releaseYear
      }

      const trackThumbnailUUID = uuid() + ".jpg"
      await downloadThumbnail(videoInfo.thumbnail, path.join(videoDir, trackThumbnailUUID), 640)
      videoMetadata.thumbnail = trackThumbnailUUID

      const albumThumbnailUUID = uuid() + ".jpg"
      await downloadThumbnail(track.album.thumbnail, path.join(videoDir, albumThumbnailUUID), 640)
      videoMetadata.album.thumbnail = albumThumbnailUUID

      for (const artist of track.artists) {
        if (artist.thumbnail) {
          const artistThumbnailUUID = uuid() + ".jpg"
          await downloadThumbnail(artist.thumbnail, path.join(videoDir, artistThumbnailUUID), 640)

          videoMetadata.artists.push({
            name: artist.name,
            thumbnail: artistThumbnailUUID,
            genres: artist.genres
          })
        } else {
          videoMetadata.artists.push({
            name: artist.name,
            thumbnail: null,
            genres: artist.genres
          })
        }
      }

      fs.writeFileSync(path.join(videoDir, "metadata.json"), JSON.stringify(videoMetadata, null, 2))
    }

    const songFileName = options?.basicDownload
      ? sanitize(videoInfo.title, { replacement: "" })
      : "song"

    const songFilePath = path.join(videoDir, `${songFileName}`)

    await runCommand("yt-dlp", [
      "--extract-audio",
      "--audio-format",
      "opus",
      "--audio-quality",
      "0",
      "--format",
      "bestaudio",
      "--output",
      `"${songFilePath}"`,
      url
    ])

    console.log(
      "Download completed:",
      chalk.green(options?.basicDownload ? `${songFilePath}.opus` : videoDir)
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[youtube] Failed to download from youtube. ${chalk.red(error.message)}`)
    } else {
      console.error("[youtube] Unknown error occurred")
    }
  }
}
