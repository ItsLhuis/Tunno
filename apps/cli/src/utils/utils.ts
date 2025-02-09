import fs from "fs"

import axios from "axios"

import sharp from "sharp"
sharp.cache(false)

import { spawn, exec } from "child_process"

import { promisify } from "util"

import { JaroWinklerDistance } from "natural"
import natural from "natural"

const TfIdf = natural.TfIdf

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

export const execPromise = promisify(exec)

export const cleanArtistName = (artistName: string): string => {
  return artistName
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
    .replace(/\s*x\s*/gi, "")
    .trim()
}

const tokenizeTrackName = (trackName: string): string[] => {
  return trackName.split(/\s+/)
}

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

export const calculateTrackSimilarity = (track1: string, track2: string): number => {
  const tokens1 = tokenizeTrackName(track1)
  const track2Lower = track2.toLowerCase()

  const jaroScore = JaroWinklerDistance(track1, track2Lower)

  const commonWords = new Set(tokens1.filter((word) => track2Lower.includes(word))).size
  const wordMatchScore = commonWords / Math.max(tokens1.length, track2Lower.split(/\s+/).length)

  const tfidfScore = calculateTfIdfSimilarity(track1, track2)

  return jaroScore * 0.5 + wordMatchScore * 0.2 + tfidfScore * 0.3
}

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
