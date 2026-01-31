import fs from "fs"

import axios from "axios"

import sharp from "sharp"
sharp.cache(false)

import { spawn, exec } from "child_process"

import { promisify } from "util"

import natural, { JaroWinklerDistance } from "natural"

const TfIdf = natural.TfIdf

/**
 * Downloads an image from a given URL, resizes it, converts it to JPEG, and saves it to a specified file path.
 *
 * @param url - The URL of the image to download.
 * @param filePath - The local file path where the thumbnail will be saved.
 * @param size - The desired width and height for the square thumbnail.
 * @returns A Promise that resolves once the thumbnail is downloaded and saved.
 */
export const downloadThumbnail = async (
  url: string,
  filePath: string,
  size: number
): Promise<void> => {
  const response = await axios.get(url, { responseType: "arraybuffer" })
  const imageBuffer = Buffer.from(response.data)

  const image = await sharp(imageBuffer)
    .resize(size, size, {
      fit: "cover"
    })
    .jpeg({ quality: 90 })
    .toBuffer()

  await fs.promises.writeFile(filePath, image)
}

/**
 * Executes a shell command with arguments and inherits standard I/O.
 *
 * @param command - The command to execute (e.g., 'yt-dlp').
 * @param args - An array of arguments to pass to the command.
 * @returns A Promise that resolves if the command exits with code 0, and rejects otherwise.
 */
export const runCommand = (command: string, args: string[]): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const process = spawn(command, args, { stdio: "inherit", shell: true })

    process.on("close", (code) => {
      if (code === 0) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

/**
 * A promisified version of `child_process.exec`.
 * Executes a command in a shell and buffers the output.
 */
export const execPromise = promisify(exec)

/**
 * Creates a delay for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to wait.
 * @returns A Promise that resolves after the specified delay.
 */
export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const ILLEGAL_CHARS_RE = /[\/\?<>\\:\*\|"]/g
const CONTROL_CHARS_RE = /[\x00-\x1f\x80-\x9f]/g
const RESERVED_NAMES_RE = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i
const TRAILING_RE = /[\. ]+$/

/**
 * Sanitizes a string to be safe for use as a filename.
 * Removes illegal characters, control characters, reserved names, and trailing dots/spaces.
 * Truncates the filename if it exceeds a specified maximum length.
 *
 * @param input - The input string to sanitize.
 * @param maxLength - The maximum allowed length for the filename (default: 200).
 * @returns The sanitized filename, or "Unknown" if the input is invalid or results in an empty string.
 */
export const sanitizeFilename = (input: string, maxLength: number = 200): string => {
  if (typeof input !== "string") return "Unknown"

  let sanitized = input
    .replace(ILLEGAL_CHARS_RE, "")
    .replace(CONTROL_CHARS_RE, "")
    .replace(TRAILING_RE, "")
    .replace(/\s+/g, " ")
    .trim()

  if (RESERVED_NAMES_RE.test(sanitized)) {
    sanitized = `_${sanitized}`
  }

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength).replace(TRAILING_RE, "")
  }

  return sanitized || "Unknown"
}

/**
 * Cleans an artist name by removing common extraneous words (e.g., "Vevo", "Official"),
 * special characters, and ensures consistent spacing and capitalization.
 *
 * @param artistName - The artist name to clean.
 * @returns The cleaned artist name.
 */
export const cleanArtistName = (artistName: string): string => {
  return artistName
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .replace(/[\(\)\[\]\{\}]/g, "")
    .replace(/"[^"]+"/g, "")
    .replace(
      /\b(vevo|topic|official|music|channel|records|tv|radio|entertainment|videos|production|productions|inc|ft|feat)\b/gi,
      ""
    )
    .replace(/[^\p{L}\s\d]/gu, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
}

/**
 * Cleans a track name by removing common extraneous words (e.g., "Official Video", "Lyrics"),
 * special characters, and ensures consistent spacing.
 *
 * @param trackName - The track name to clean.
 * @returns The cleaned track name.
 */
export const cleanTrackName = (trackName: string): string => {
  return trackName
    .toLowerCase()
    .replace(/[\(\)\[\]\{\}]/g, "")
    .replace(/"[^"]+"/g, "")
    .replace(
      /\b(vevo|topic|official|music|channel|records|tv|radio|entertainment|production|productions|inc|ft\.?|feat\.?|videos|video|vídeo|oficial|official video|official audio|version|versão|audio|prod\.?|explicit|lyric|lyrics|letra|visualizer|edit|demo|cover|remaster(ed)?|dj|session|performance|karaoke|soundtrack|score|original|extended|special|deluxe|bonus|take|clipe|videoclipe|studio)\b/gi,
      ""
    )
    .replace(/[^\p{L}\s\d]/gu, "")
    .replace(/\s+/g, " ")
    .replace(/(?<=\s)x(?=\s)/gi, " ")
    .trim()
}

/**
 * Splits a track name into an array of tokens (words) based on whitespace.
 *
 * @param trackName - The track name to tokenize.
 * @returns An array of strings, where each string is a token from the track name.
 */
const tokenizeTrackName = (trackName: string): string[] => {
  return trackName.split(/\s+/)
}

/**
 * Calculates the TF-IDF (Term Frequency-Inverse Document Frequency) similarity between two track names.
 * This function measures how relevant words are in each track name relative to a corpus of both.
 *
 * @param track1 - The first track name string.
 * @param track2 - The second track name string.
 * @returns A numeric similarity score between 0 and 1.
 */
const calculateTfIdfSimilarity = (track1: string, track2: string): number => {
  if (!track1 || !track2) return 0

  const tfidf = new TfIdf()

  tfidf.addDocument(track1)
  tfidf.addDocument(track2)

  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  const terms = tfidf.listTerms(0)
  if (!terms || terms.length === 0) return 0

  const tokens1 = track1.toLowerCase().split(/\s+/)
  const tokens2 = track2.toLowerCase().split(/\s+/)
  const commonWords = tokens1.filter((word) => tokens2.includes(word)).length

  if (commonWords === 0) return 0

  terms.forEach((term) => {
    const tfidfTrack1 = tfidf.tfidf(term.term, 0)
    const tfidfTrack2 = tfidf.tfidf(term.term, 1)

    dotProduct += tfidfTrack1 * tfidfTrack2
    magnitude1 += Math.pow(tfidfTrack1, 2)
    magnitude2 += Math.pow(tfidfTrack2, 2)
  })

  if (magnitude1 === 0 || magnitude2 === 0) return 0

  const similarity = dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2))

  if (isNaN(similarity) || !isFinite(similarity)) return 0

  return similarity
}

/**
 * Calculates a comprehensive similarity score between two track names using a combination of:
 * - Jaro-Winkler Distance for string similarity.
 * - Word match score for common words.
 * - TF-IDF similarity for semantic relevance of terms.
 *
 * @param track1 - The first track name string.
 * @param track2 - The second track name string.
 * @returns A weighted numeric similarity score between 0 and 1.
 */
export const calculateTrackSimilarity = (track1: string, track2: string): number => {
  const tokens1 = tokenizeTrackName(track1)
  const track2Lower = track2.toLowerCase()

  const jaroScore = JaroWinklerDistance(track1, track2Lower)

  const commonWords = new Set(tokens1.filter((word) => track2Lower.includes(word))).size
  const wordMatchScore = commonWords / Math.max(tokens1.length, track2Lower.split(/\s+/).length)

  const tfidfScore = calculateTfIdfSimilarity(track1, track2)

  return jaroScore * 0.5 + wordMatchScore * 0.2 + tfidfScore * 0.3
}

/**
 * Calculates a proportional similarity score based on the difference between two durations.
 * The similarity decreases exponentially as the absolute difference increases, up to a `maxDifference`.
 *
 * @param spotifyDuration - The duration from Spotify (in seconds).
 * @param youtubeDuration - The duration from YouTube (in seconds).
 * @param maxDifference - The maximum difference beyond which similarity becomes very low (default: 1000 seconds).
 * @returns A similarity score between 0 and 1, where 1 means identical durations.
 */
export const proportionalSimilarity = (
  spotifyDuration: number,
  youtubeDuration: number,
  maxDifference: number = 1000
): number => {
  const timeDifference = Math.abs(spotifyDuration - youtubeDuration)

  const normalizedDifference = Math.min(timeDifference / maxDifference, 1)

  const similarity = Math.exp(-normalizedDifference)

  return similarity
}
