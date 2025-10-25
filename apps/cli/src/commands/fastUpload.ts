import fs from "fs"
import os from "os"
import path from "path"

import { Command } from "commander"

import archiver from "archiver"

import chalk from "chalk"
import ora, { type Ora } from "ora"

import { getDownloadPath } from "../utils/config"
import { delay } from "../utils/utils"

import { version } from "../../package.json"

import { VALID_AUDIO_EXTENSIONS } from "../shared/constants"

import { type FastUploadManifest, type FastUploadTrack, type Song } from "../shared/types"

type ValidatedDirectory = {
  dirName: string
  dirPath: string
  metadataPath: string
  audioFile: string
  thumbnails: string[]
}

const isValidDirectory = (dirPath: string, seenTitles: Set<string>): ValidatedDirectory | null => {
  try {
    const entries = fs.readdirSync(dirPath)

    const hasMetadata = entries.includes("metadata.json")
    if (!hasMetadata) return null

    const metadataPath = path.join(dirPath, "metadata.json")
    let metadata: Song
    try {
      const metadataContent = fs.readFileSync(metadataPath, "utf-8")
      metadata = JSON.parse(metadataContent)
    } catch {
      return null
    }

    if (seenTitles.has(metadata.title)) {
      return null
    }

    if (!metadata.song || !entries.includes(metadata.song)) {
      return null
    }

    const audioExt = path.extname(metadata.song).slice(1).toLowerCase()
    if (!VALID_AUDIO_EXTENSIONS.has(audioExt)) {
      return null
    }

    const referencedThumbnails = new Set<string>()

    if (metadata.thumbnail) {
      referencedThumbnails.add(metadata.thumbnail)
    }

    for (const artist of metadata.artists) {
      if (artist.thumbnail) {
        referencedThumbnails.add(artist.thumbnail)
      }
    }

    if (metadata.album.thumbnail) {
      referencedThumbnails.add(metadata.album.thumbnail)
    }

    if (metadata.album.artists) {
      for (const artist of metadata.album.artists) {
        if (artist.thumbnail) {
          referencedThumbnails.add(artist.thumbnail)
        }
      }
    }

    for (const thumb of referencedThumbnails) {
      if (!entries.includes(thumb)) {
        return null
      }
    }

    const thumbnails = Array.from(referencedThumbnails)

    seenTitles.add(metadata.title)

    return {
      dirName: path.basename(dirPath),
      dirPath,
      metadataPath,
      audioFile: metadata.song,
      thumbnails
    }
  } catch {
    return null
  }
}

const buildManifest = (validDirs: ValidatedDirectory[]): FastUploadManifest => {
  const tracks: FastUploadTrack[] = []

  for (const dir of validDirs) {
    try {
      const metadataContent = fs.readFileSync(dir.metadataPath, "utf-8")
      const metadata: Song = JSON.parse(metadataContent)

      tracks.push({
        dirName: dir.dirName,
        title: metadata.title,
        artists: metadata.artists.map((a) => a.name),
        album: metadata.album.name,
        thumbnail: metadata.thumbnail || null
      })
    } catch {
      continue
    }
  }

  return {
    version: 1,
    createdAt: new Date().toISOString(),
    source: {
      cliVersion: version,
      os: os.platform()
    },
    stats: {
      totalTracks: tracks.length
    },
    tracks
  }
}

const createZipBundle = async (
  validDirs: ValidatedDirectory[],
  manifest: FastUploadManifest,
  outputPath: string,
  spinner: Ora
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const now = new Date()
    const timestamp = now.toISOString().replace(/[-:]/g, "").replace("T", "_").split(".")[0]
    const zipFileName = `Tunno_FastUpload_${timestamp}.zip`
    const zipPath = path.join(outputPath, zipFileName)

    const output = fs.createWriteStream(zipPath)
    const archive = archiver("zip", { zlib: { level: 9 } })

    output.on("close", () => {
      spinner.succeed(`Bundle created successfully: ${chalk.green(zipPath)}`)
      resolve()
    })

    archive.on("error", (err) => {
      spinner.fail(chalk.red("Failed to create bundle"))
      reject(err)
    })

    archive.pipe(output)

    archive.append(JSON.stringify(manifest, null, 2), { name: "manifest.json" })

    for (const dir of validDirs) {
      archive.directory(dir.dirPath, `tracks/${dir.dirName}`)
    }

    archive.finalize()
  })
}

export default function fastUpload(program: Command) {
  program
    .command("fast-upload")
    .description("Create a portable bundle from downloaded tracks")
    .option("-o, --output <path>", "Output directory for the bundle")
    .action(async (options) => {
      const spinner = ora()

      try {
        spinner.start("Scanning directories")

        const downloadPath = await getDownloadPath()
        const outputPath = options.output || downloadPath

        if (!fs.existsSync(outputPath)) {
          fs.mkdirSync(outputPath, { recursive: true })
        }

        const entries = fs.readdirSync(downloadPath)
        const validDirs: ValidatedDirectory[] = []
        const seenTitles = new Set<string>()

        for (const entry of entries) {
          const entryPath = path.join(downloadPath, entry)
          const stat = fs.statSync(entryPath)

          if (stat.isDirectory()) {
            const validated = isValidDirectory(entryPath, seenTitles)
            if (validated) {
              validDirs.push(validated)
            }
          }
        }

        await delay(300)

        if (validDirs.length === 0) {
          spinner.fail(chalk.red("No valid tracks found in download directory"))
          console.log(
            "\nEach track directory must:\n" +
              "  - Have a valid metadata.json\n" +
              "  - Audio file referenced in metadata must exist\n" +
              "  - All thumbnails referenced in metadata must exist\n" +
              "  - Have a unique song title (duplicates are ignored)"
          )
          return
        }

        spinner.text = "Building manifest"

        await delay(300)

        const manifest = buildManifest(validDirs)

        if (manifest.tracks.length === 0) {
          spinner.fail(chalk.red("No tracks could be processed"))
          return
        }

        await delay(300)

        spinner.text = "Creating bundle"

        await delay(300)

        await createZipBundle(validDirs, manifest, outputPath, spinner)
      } catch (error) {
        spinner.fail(chalk.red("Bundle creation failed"))
        if (error instanceof Error) {
          console.error(chalk.red(error.message))
        }
      }
    })
}
