import fs from "fs"
import path from "path"

import ytdl from "@distube/ytdl-core"
import chalk from "chalk"

import sanitize from "sanitize-filename"

import { getDownloadPath } from "./config"

import { downloadThumbnail } from "./utils"

export const download = async (videoId: string): Promise<void> => {
  const downloadPath = await getDownloadPath()

  const url = `https://www.youtube.com/watch?v=${videoId}`

  const info = await ytdl.getBasicInfo(url)

  const videoTitle = sanitize(info.videoDetails.title, { replacement: "-" })
  const videoThumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url
  const authorThumbnail =
    info.videoDetails.author?.thumbnails?.[info.videoDetails.author.thumbnails.length - 1]?.url

  const videoDir = path.join(downloadPath, videoTitle)
  const songDir = path.join(videoDir, "song")
  const authorDir = path.join(videoDir, "author")

  fs.mkdirSync(songDir, { recursive: true })
  fs.mkdirSync(authorDir, { recursive: true })

  const songFilePath = path.join(songDir, `${videoTitle}.mp3`)
  const authorThumbnailPath = path.join(authorDir, "thumbnail.jpg")
  const videoThumbnailPath = path.join(songDir, "thumbnail.jpg")
  const songMetadataPath = path.join(songDir, "metadata.json")
  const authorMetadataPath = path.join(authorDir, "metadata.json")

  await downloadThumbnail(videoThumbnail, videoThumbnailPath, 800)
  if (authorThumbnail) await downloadThumbnail(authorThumbnail, authorThumbnailPath, 150)

  const { author, ...songDetails } = info.videoDetails

  const songMetadata = {
    ...songDetails
  }
  fs.writeFileSync(songMetadataPath, JSON.stringify(songMetadata, null, 2))

  const authorMetadata = {
    ...author,
    name: info.videoDetails.author?.name || "Unknown"
  }
  fs.writeFileSync(authorMetadataPath, JSON.stringify(authorMetadata, null, 2))

  const videoStream = ytdl(url, { filter: "audioonly", quality: "highestaudio" })

  let downloadedBytes = 0
  let totalBytes = 0

  console.log("")
  videoStream.on("progress", (chunkLength, downloaded, total) => {
    downloadedBytes = downloaded
    totalBytes = total

    const progress = (downloadedBytes / totalBytes) * 100
    const progressBar = `${chalk.green(
      "[" + "=".repeat(progress / 5) + " ".repeat(20 - progress / 5) + "]"
    )}`
    process.stdout.write(
      `\r${"Progress:"} ${progressBar} ${chalk.yellow(progress.toFixed(2) + "%")}`
    )
  })

  videoStream.on("end", () => {
    console.log("")
    console.log("\nDownload completed:", chalk.green(videoDir))
    console.log("")
  })

  videoStream.on("error", (error) => {
    console.error(chalk.red("Error during download:"), error)
  })

  const file = fs.createWriteStream(songFilePath)
  videoStream.pipe(file)
}
