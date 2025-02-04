import { Command } from "commander"

import chalk from "chalk"

import { download } from "../utils/youtube"

import { execPromise } from "../utils/utils"

const VALID_EXTENSIONS = new Set(["opus", "m4a", "mp3", "flac", "wav"])

export default function youtube(program: Command) {
  program
    .command("youtube")
    .description("Download audio from a YouTube video")
    .option("--id <videoId>", "YouTube video ID")
    .option("--playlist-id <playlistId>", "YouTube playlist ID")
    .option("--title <title>", "Override track title for Spotify search")
    .option("--artist <artist>", "Override artist for Spotify search")
    .option("--year <year>", "Override release year for Spotify search")
    .option("--basic", "Download only audio without metadata")
    .option(
      "--ext <ext>",
      `Specify the output audio file extension (${[...VALID_EXTENSIONS].join(", ")})`
    )
    .action(async (options) => {
      const { id: videoId, playlistId, title, artist, year, basic, ext } = options

      if (!videoId && !playlistId) {
        console.error("error: either '--id' or '--playlist-id' must be provided")
        return
      }

      if (ext && !VALID_EXTENSIONS.has(ext)) {
        console.error(
          "[youtube]",
          `${chalk.red(`Invalid ${ext} extension`)}. Using ${chalk.blue("opus")} extension`
        )
      }

      if (playlistId) {
        const url = `https://music.youtube.com/playlist?list=${playlistId}`

        try {
          console.log(`[youtube] Extracting playlist info from: ${url}`)
          const { stdout: playlistJson } = await execPromise(
            `yt-dlp --flat-playlist --dump-json ${url}`
          )

          console.log()

          const playlistItems = playlistJson.split("\n").filter(Boolean)

          for (let i = 0; i < playlistItems.length; i++) {
            const itemJson = playlistItems[i]
            const item = JSON.parse(itemJson)

            console.log(
              `[youtube] Processing track ${chalk.blue(i + 1)} of ${chalk.blue(
                playlistItems.length
              )}`
            )
            await download(item.id, {
              basicDownload: basic,
              extension: ext
            })

            if (i < playlistItems.length - 1) {
              console.log()
            }
          }

          return
        } catch (error) {
          if (error instanceof Error) {
            console.error(`[youtube] Failed to extract playlist. ${chalk.red(error.message)}`)
          } else {
            console.error("[youtube] Unknown error occurred")
          }

          return
        }
      }

      await download(videoId, {
        title,
        artist,
        releaseYear: year,
        basicDownload: basic,
        extension: ext
      })
    })
}
