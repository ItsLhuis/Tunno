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

/**
 * Validates a given directory to ensure it contains a valid track for fast upload.
 * A valid directory must have:
 * - A `metadata.json` file.
 * - A valid JSON structure within `metadata.json` that can be parsed into a `Song` object.
 * - A unique song title (checked against `seenTitles`).
 * - An audio file referenced in `metadata.song` that exists in the directory and has a valid extension.
 * - All thumbnail files referenced in the `metadata.json` (for song, artists, and album) must exist.
 *
 * @param dirPath - The absolute path to the directory to validate.
 * @param seenTitles - A Set of song titles already encountered to ensure uniqueness.
 * @returns A `ValidatedDirectory` object if the directory is valid, otherwise `null`.
 */
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

/**
 * Builds a `FastUploadManifest` from a list of validated directories.
 * This manifest serves as a central descriptor for the entire fast upload bundle,
 * containing version information, creation timestamp, CLI details (version and OS),
 * overall statistics, and a list of `FastUploadTrack` objects.
 * Each `FastUploadTrack` includes summarized information (directory name, title, artists, album, thumbnail)
 * derived from the `metadata.json` found in each validated directory.
 *
 * @param validDirs - An array of `ValidatedDirectory` objects, each representing a valid track directory
 *                    from which metadata will be extracted.
 * @returns A `FastUploadManifest` object summarizing the content of the bundle.
 *          Returns an empty `tracks` array in the manifest if no valid directories are provided or processed.
 */
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
      type: "cli",
      version,
      os: os.platform()
    },
    stats: {
      totalTracks: tracks.length
    },
    tracks
  }
}

/**
 * Creates a ZIP archive containing all validated tracks and the generated manifest file.
 * The archive follows a naming convention: `Tunno_FastUpload_YYYY-MM-DD_HHMMSS.zip`,
 * and is placed in the specified `outputPath`.
 * Each `ValidatedDirectory`'s content is added to the ZIP under a `tracks/<dirName>/` path,
 * preserving the original directory structure within the bundle.
 * The `manifest.json` is included at the root of the ZIP archive.
 *
 * @param validDirs - An array of `ValidatedDirectory` objects whose contents will be bundled.
 * @param manifest - The `FastUploadManifest` object to be included as `manifest.json` in the bundle.
 * @param outputPath - The absolute path to the directory where the final ZIP archive will be saved.
 * @param spinner - An `Ora` spinner instance used for providing real-time progress and feedback to the user.
 * @returns A Promise that resolves with `void` upon successful creation and finalization of the ZIP bundle,
 *          or rejects with an `Error` if any issues occur during the archiving process.
 */
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

/**
 * Registers the 'fast-upload' command with the Commander program.
 * This command creates a portable ZIP bundle from locally downloaded tracks,
 * including metadata, audio files, and thumbnails.
 *
 * @param program - The Commander program instance to which the command will be added.
 */
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
