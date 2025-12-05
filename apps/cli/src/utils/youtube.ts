import fs from "fs"
import path from "path"

import { v4 as uuid } from "uuid"

import chalk from "chalk"

import sanitize from "sanitize-filename"

import { getDownloadPath } from "./config"

import {
  cleanArtistName,
  cleanTrackName,
  downloadThumbnail,
  execPromise,
  runCommand
} from "./utils"

import { getTrack, getTrackById } from "./spotify"

import { getLyrics } from "./lrclib"

import { type Song } from "../shared/types"

const EXTENSIONS_WITHOUT_THUMBNAIL_SUPPORT = new Set(["wav", "opus", "aac", "ogg"])

type YoutubeSong = {
  title: string
  thumbnail: string
  duration: number
  artists?: string[]
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
    extension?: string
    addMetadata?: boolean
    spotifyId?: string
  }
): Promise<void> => {
  try {
    const downloadPath = await getDownloadPath()

    const url = `https://youtube.com/watch?v=${videoId}`

    console.log(`[youtube] Extracting video info from: ${url}`)
    const { stdout: videoJson } = await execPromise(`yt-dlp --dump-json ${url}`)

    const videoInfo: YoutubeSong = JSON.parse(videoJson)

    let videoDir = options?.basicDownload
      ? downloadPath
      : path.join(downloadPath, sanitize(videoInfo.title, { replacement: "" }))

    const songUUID = uuid()

    const songFileName = options?.basicDownload
      ? sanitize(videoInfo.title, { replacement: "" })
      : songUUID

    if (!options?.basicDownload) {
      let track

      if (options?.spotifyId) {
        console.log(`[spotify] Searching for track with ID ${chalk.blue(options.spotifyId)}`)
        track = await getTrackById(options.spotifyId)
      } else {
        const searchTitle = options?.title || videoInfo.title
        const searchArtist = options?.artist || videoInfo.uploader
        const searchYear =
          options?.releaseYear ||
          (videoInfo.release_date ? videoInfo.release_date.slice(0, 4) : null)

        let cleanedTrackName = options?.title ? searchTitle : cleanTrackName(searchTitle)
        const cleanedArtistName = options?.artist ? searchArtist : cleanArtistName(searchArtist)

        if (!options?.title) {
          cleanedTrackName = cleanedTrackName
            .replace(new RegExp(cleanedArtistName, "gi"), "")
            .replace(/\s+/g, " ")
            .trim()
        }

        const videoDuration = Number(videoInfo.duration)

        console.log(
          `[spotify] Searching for ${chalk.blue(searchTitle)} by ${chalk.blue(searchArtist)}`
        )
        track = await getTrack(cleanedTrackName, videoDuration, cleanedArtistName, searchYear)

        if (!track) {
          if (videoInfo.artists && Array.isArray(videoInfo.artists)) {
            console.log("[spotify]", chalk.yellow("Trying other artists"))

            for (let i = 0; i < videoInfo.artists.length; i++) {
              const currentArtist = videoInfo.artists[i]

              if (currentArtist === searchArtist) {
                continue
              }

              console.log(
                `[spotify] Trying to search for ${chalk.blue(searchTitle)} by ${chalk.blue(
                  currentArtist
                )}`
              )
              track = await getTrack(
                cleanedTrackName,
                videoDuration,
                cleanArtistName(currentArtist),
                searchYear
              )

              if (track) break
            }
          }
        }

        if (!track) {
          console.log(
            `[spotify] Trying to search using only the track title. ${chalk.yellow(
              "This approach refines the search process to enhance accuracy"
            )}`
          )
          track = await getTrack(cleanedTrackName, videoDuration, cleanedArtistName, searchYear, {
            onlySearchTrackTitle: true
          })
        }
      }

      if (!track) {
        if (options?.spotifyId) {
          console.log("[spotify]", chalk.red("Failed to find track with the provided Spotify ID."))
        } else {
          console.log(
            "[spotify]",
            chalk.yellow("Suggestion:"),
            "You can either download just the track and manually update the metadata later, or provide additional fields related to the Spotify search to improve metadata accuracy. Mismatching the YouTube video ID with unrelated metadata fields may result in incorrect metadata"
          )
        }
        return
      }

      const lyrics = await getLyrics({
        title: track.title,
        artists: track.artists.map((a) => a.name),
        album: track.album?.name,
        duration: videoInfo.duration
      })

      videoDir = path.join(downloadPath, sanitize(track.title, { replacement: "" }))
      if (fs.existsSync(videoDir)) fs.rmSync(videoDir, { recursive: true, force: true })
      fs.mkdirSync(videoDir, { recursive: true })

      const videoMetadata: Song = {
        song: songUUID + "." + (options?.extension || (options?.basicDownload ? "m4a" : "opus")),
        title: track.title,
        thumbnail: "",
        duration: videoInfo.duration,
        artists: [],
        album: track.album,
        lyrics: lyrics ?? null
      }

      const trackThumbnailUUID = uuid() + ".jpg"
      await downloadThumbnail(track.album.thumbnail, path.join(videoDir, trackThumbnailUUID), 640)
      videoMetadata.thumbnail = trackThumbnailUUID

      const albumThumbnailUUID = uuid() + ".jpg"
      await downloadThumbnail(track.album.thumbnail, path.join(videoDir, albumThumbnailUUID), 640)
      videoMetadata.album.thumbnail = albumThumbnailUUID

      const artistThumbnailMap: Record<string, string> = {}

      for (const artist of track.artists) {
        if (artist.thumbnail) {
          const artistThumbnailUUID = uuid() + ".jpg"
          await downloadThumbnail(artist.thumbnail, path.join(videoDir, artistThumbnailUUID), 640)

          artistThumbnailMap[artist.name] = artistThumbnailUUID

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

      for (const albumArtist of track.album.artists) {
        const found = artistThumbnailMap[albumArtist.name]

        if (found) {
          albumArtist.thumbnail = found
        } else if (albumArtist.thumbnail) {
          const albumArtistThumbnailUUID = uuid() + ".jpg"
          await downloadThumbnail(
            albumArtist.thumbnail,
            path.join(videoDir, albumArtistThumbnailUUID),
            640
          )

          albumArtist.thumbnail = albumArtistThumbnailUUID
        } else {
          albumArtist.thumbnail = null
        }
      }

      fs.writeFileSync(path.join(videoDir, "metadata.json"), JSON.stringify(videoMetadata, null, 2))
    }

    const songFilePath = path.join(videoDir, `${songFileName}`)

    const shouldAddMetadata =
      options?.addMetadata !== undefined ? options.addMetadata : options?.basicDownload || false

    const audioFormat = options?.extension || (options?.basicDownload ? "m4a" : "opus")

    const supportsThumbnail = !EXTENSIONS_WITHOUT_THUMBNAIL_SUPPORT.has(audioFormat)

    if (shouldAddMetadata && !supportsThumbnail) {
      console.log(
        `[youtube] ${chalk.yellow("Warning:")} The ${chalk.blue(audioFormat)} format does not support embedded thumbnails`
      )
    }

    await runCommand("yt-dlp", [
      "--extract-audio",
      "--no-playlist",
      "--no-warnings",
      "--ignore-errors",
      "--prefer-free-formats",
      "--no-check-certificate",
      "--extractor-retries",
      "3",
      "--fragment-retries",
      "3",
      "--retries",
      "3",
      "--concurrent-fragments",
      "4",
      "--buffer-size",
      "16K",
      "--format",
      "bestaudio",
      ...(shouldAddMetadata ? ["--add-metadata"] : []),
      ...(audioFormat === "opus"
        ? ["--audio-format", "opus"]
        : [
            "--audio-format",
            audioFormat,
            "--audio-quality",
            "0",
            ...(shouldAddMetadata && supportsThumbnail ? ["--embed-thumbnail"] : [])
          ]),
      "--output",
      `"${songFilePath}"`,
      url
    ])

    console.log(
      "Download completed:",
      chalk.green(options?.basicDownload ? `${songFilePath}.${audioFormat}` : videoDir)
    )
  } catch (error) {
    if (error instanceof Error) {
      console.error(`[youtube] Failed to download from youtube. ${chalk.red(error.message)}`)
    } else {
      console.error("[youtube] Unknown error occurred")
    }
  }
}
